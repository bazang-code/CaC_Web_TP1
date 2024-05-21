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

        console.log("Datos recibidos:", data); // Agrego esto para ver los datos completos

        // Asegúrate de que data tiene la estructura esperada
        if (data.integrantes && Array.isArray(data.integrantes) && data.integrantes.length > 0) {
            // Iterar sobre cada persona en el array `integrantes`
            data.integrantes.forEach(persona => {
                console.log("Procesando persona:", persona); // Añade esto para ver cada persona
                
                let nuevaPersona = referencia.cloneNode(true);
                nuevaPersona.querySelector("img").src = persona.foto_perfil;
                nuevaPersona.querySelector("img").alt = "Foto Integrante";
                nuevaPersona.querySelector(".nombre").innerHTML = persona.nombre + " " + persona.apellido;
                nuevaPersona.querySelector(".edad").innerHTML = persona.edad + " años";
                nuevaPersona.querySelector(".residencia").innerHTML = persona.residencia;
                
                contenedor.appendChild(nuevaPersona);
            });
        } else {
            console.error("La estructura del JSON no es la esperada o el array `integrantes` está vacío.");
        }
    })
    .catch(error => console.log("Ocurrió un error! " + error));
}

//         // Procesamiento de la info que llega de la API
    
//         console.log(data.results[0].nombre + " " + data.results[0].apellido);
    
//         // console.log(data.results[0].foto_perfil);
    
//         let nuevaPersona = referencia.cloneNode(true);
    
//         // nuevaPersona.querySelector("img").src = data.results[0].foto_perfil;
//         // nuevaPersona.querySelector("img").alt = "Foto Integrante";
//         nuevaPersona.querySelector("p").innerHTML = data.results[0].nombre + " " + data.results[0].apellido;
    
//         contenedor.appendChild(nuevaPersona);
//         })
//     .catch(error => console.log("Ocurrió un error! " + error));
// }

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
