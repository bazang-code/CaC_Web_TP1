let original = document.querySelector("#Integrantes");
let contenedor = document.querySelector("#Contenedor");

let botonAgregar = document.querySelector("#Agregar");
let botonQuitar = document.querySelector("#Quitar");

let referencia = original.cloneNode(true);

// Elimino el nodo original
original.remove();

// Variable para rastrear el índice del integrante actual
let indiceActual = 0;
let integrantesData = [];

//Ejemplo para el fetch: https://username.github.io/reponame/file.json

/////////////////////////// Cargo los datos del JSON ///////////////////////////
fetch("https://bazang-code.github.io/CaC_Web_TP1/nosotros.json")
    .then(response => response.json())
    .then(data => {
        // Guardar los datos recibidos
        integrantesData = data;

        console.log("Largo de data:", data.integrantes.length); // Veo el largo de mi archivo JSON
        console.log("Datos recibidos:", integrantesData); // Agrego esto para ver los datos completos
    })
    .catch(error => console.log("Ocurrió un error! " + error));
///////////////////////////////////////////////////////////////////////////////

function AgregarArticulo() {
   if (indiceActual < integrantesData.integrantes.length) {

        let nuevaPersona = referencia.cloneNode(true);

        nuevaPersona.querySelector("img").src = integrantesData[indiceActual].foto_perfil;
        nuevaPersona.querySelector("img").alt = "Foto Integrante";
        nuevaPersona.querySelector(".nombre").innerHTML = integrantesData[indiceActual].nombre + " " + integrantesData[indiceActual].apellido;
        nuevaPersona.querySelector(".edad").innerHTML = integrantesData[indiceActual].edad + " años";
        nuevaPersona.querySelector(".residencia").innerHTML = integrantesData[indiceActual].residencia;
        
        contenedor.appendChild(nuevaPersona);

        // incremento el indice
        indiceActual++;
   } else {
    console.log("No hay mas integrantes.");
   }
}


function QuitarArticulo() {
    if(contenedor.childElementCount > 0){
        contenedor.removeChild(contenedor.lastChild);
        // decremento del indice
        indiceActual--;
    }
}

// Eventos
botonAgregar.addEventListener("click", function(){
    AgregarArticulo();
});

botonQuitar.addEventListener("click", function(){
    QuitarArticulo();
});
