document.addEventListener("DOMContentLoaded", function () {
    const btnSTR = document.getElementById("STR");
    const btnSTD = document.getElementById("STD");
    const formSTR = document.getElementById("formulario_STR");
    const formSTD = document.getElementById("formulario_STD");

    btnSTR.addEventListener("click", function () {
        formSTR.style.display = "block";
        formSTD.style.display = "none";
    });

    btnSTD.addEventListener("click", function () {
        formSTR.style.display = "none";
        formSTD.style.display = "block";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const imgResena = document.querySelector(".reseña img");
    imgResena.classList.add("active");
});