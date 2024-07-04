document.addEventListener("DOMContentLoaded", function () {
    const btnSTR = document.getElementById("STR");
    // const btnSTD = document.getElementById("STD");
    const btnSST = document.getElementById("SST");
    const formSTR = document.getElementById("formulario_STR");
    // const formSTD = document.getElementById("formulario_STD");
    const formSST = document.getElementById("formulario_SST");

    btnSTR.addEventListener("click", function () {
        formSTR.style.display = "block";
        // formSTD.style.display = "none";
    });

    // btnSTD.addEventListener("click", function () {
    //     formSTR.style.display = "none";
    //     formSTD.style.display = "block";
    // });

    btnSST.addEventListener("click", function () {
        formSTR.style.display = "none";
        // formSTD.style.display = "none";
        window.location.href = "./solicitud_soporte.html"; 
    });
});

///////AGREGADO PARA QUE RECARGUE LA PAGINA///////////////////
// const formulario = document.getElementById("Formulario");
//     formulario.addEventListener("submit", function (event) {
//         event.preventDefault();

//         const formData = new FormData(formulario);
//         fetch('/api/submit_str', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => {
//             alert('Solicitud enviada con éxito');
//             setTimeout(() => {
//                 window.location.reload();
//             }, 3000);
//         })
//         .catch(error => console.error('Error:', error));
//     });
//////////////////////////////////////////////////////////////


document.addEventListener("DOMContentLoaded", () => {
    const imgResena = document.querySelector(".reseña img");
    imgResena.classList.add("active");
});