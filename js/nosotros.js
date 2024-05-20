
// URL del archivo JSON en GitHub
const url = 'https://raw.githubusercontent.com/bazang-code/CaC_Web_TP1/main/nosotros.json';

// Función para obtener y procesar el archivo JSON
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // Parsear la respuesta JSON
  })
  .then(data => {
    // Verifica la estructura del archivo JSON antes de acceder a sus propiedades
    if (Array.isArray(data) && data.length > 0) {
      console.log(data[0]); // Acceder al primer elemento del array
    } else {
      throw new Error('Unexpected JSON structure');
    }
  })
  .catch(error => {
    console.error('Ocurrió un error!', error);
  });

/*

let original = document.querySelector("#Integrantes");
let contenedor = document.querySelector("#Contenedor");

let botonAgregar = document.querySelector("#Agregar");
let botonQuitar = document.querySelector("#Quitar");

let referencia = Integrantes.cloneNode(true);

Integrantes.remove();

function AgregarArticulo() {
    fetch("https://raw.githubusercontent.com/bazang-code/CaC_Web_TP1/main/nosotros.json")
    .then(response => response.json())
    .then(data => {
        // Procesamiento de la info que llega de la API
    
        console.log(data.results[0].nombre + " " + data.results[0].apellido);
    
        console.log(data.results[0].foto_perfil);
    
        let nuevaPersona = referencia.cloneNode(true);
    
        nuevaPersona.querySelector("img").src = data.results[0].foto_perfil;
        nuevaPersona.querySelector("img").alt = "Foto Integrante";
        nuevaPersona.querySelector("p").innerHTML = data.results[0].nombre + " " + data.results[0].apellido;
    
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

