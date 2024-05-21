document.addEventListener("DOMContentLoaded", function() {
    let original = document.querySelector("#Integrantes");
    let contenedor = document.querySelector("#Contenedor");

    let botonAgregar = document.querySelector("#Agregar");
    let botonQuitar = document.querySelector("#Quitar");

    let referencia = original.cloneNode(true);
    original.remove(); // Eliminar el nodo original de la vista

    // Variable para rastrear el índice del integrante actual
    let currentIndex = 0;
    let integrantesData = [];

    // Cargar los datos del JSON al cargar la página
    fetch("https://bazang-code.github.io/CaC_Web_TP1/nosotros.json")
        .then(response => response.json())
        .then(data => {
            // Guardar los datos recibidos
            integrantesData = data.integrantes;
            console.log("Datos recibidos:", integrantesData); // Ver los datos completos
        })
        .catch(error => console.log("Ocurrió un error! " + error));

    function AgregarArticulo() {
        // Verificar que haya más integrantes por agregar
        if (currentIndex < integrantesData.length) {
            let integrante = integrantesData[currentIndex];

            console.log("Nombre:", integrante.nombre);
            console.log("Apellido:", integrante.apellido);
            console.log("Foto Perfil:", integrante.foto_perfil);

            let nuevaPersona = referencia.cloneNode(true);
            nuevaPersona.querySelector("img").src = integrante.foto_perfil;
            nuevaPersona.querySelector("img").alt = "Foto Integrante";
            nuevaPersona.querySelector(".nombre").innerHTML = integrante.nombre + " " + integrante.apellido;
            nuevaPersona.querySelector(".edad").innerHTML = integrante.edad + " años";
            nuevaPersona.querySelector(".residencia").innerHTML = integrante.residencia;

            contenedor.appendChild(nuevaPersona);

            // Incrementar el índice del integrante actual
            currentIndex++;
        } else {
            console.log("No hay más integrantes para agregar.");
        }
    }

    function QuitarArticulo() {
        if (contenedor.childElementCount > 0) {
            contenedor.removeChild(contenedor.lastChild);
            // Decrementar el índice del integrante actual para poder agregarlo de nuevo si es necesario
            if (currentIndex > 0) {
                currentIndex--;
            }
        }
    }

    // Eventos
    botonAgregar.addEventListener("click", function() {
        AgregarArticulo();
    });

    botonQuitar.addEventListener("click", function() {
        QuitarArticulo();
    });
});
