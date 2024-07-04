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

document.addEventListener("DOMContentLoaded", () => {
    const imgResena = document.querySelector(".reseña img");
    imgResena.classList.add("active");
});