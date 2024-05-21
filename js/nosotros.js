let original = document.querySelector("#Integrantes");
let contenedor = document.querySelector("#Contenedor");

let botonAgregar = document.querySelector("#Agregar");
let botonQuitar = document.querySelector("#Quitar");

let referencia = Integrantes.cloneNode(true);

// Integrantes.remove();
original.remove();

//https://username.github.io/reponame/file.json

function AgregarArticulo() {
    fetch("https://bazang-code.github.io/CaC_Web_TP1/nosotros.json")
    .then(response => response.json())
    .then(data => {

         // Procesamiento de la info que llega de la API

        console.log("Datos recibidos:", data); // Agrego esto para ver los datos completos
        console.log(data.integrantes[0].nombre + " " + data.integrantes[0].apellido);

        let nuevaPersona = referencia.cloneNode(true);

        nuevaPersona.querySelector("img").src = integrantes.foto_perfil;
        nuevaPersona.querySelector("img").alt = "Foto Integrante";
        nuevaPersona.querySelector(".nombre").innerHTML = integrantes.nombre + " " + integrantes.apellido;
        nuevaPersona.querySelector(".edad").innerHTML = integrantes.edad + " años";
        nuevaPersona.querySelector(".residencia").innerHTML = integrantes.residencia;
        
        contenedor.appendChild(nuevaPersona);
    })
    .catch(error => console.log("Ocurrió un error! " + error));
}

function QuitarArticulo() {
    if(contenedor.childElementCount > 0){
        contenedor.removeChild(contenedor.lastChild);
    }
}

// Eventos
botonAgregar.addEventListener("click", function(){
    AgregarArticulo();
});

botonQuitar.addEventListener("click", function(){
    QuitarArticulo();
});
