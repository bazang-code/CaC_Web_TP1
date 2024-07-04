document.addEventListener("DOMContentLoaded", function () {
    const btn1 = document.getElementById("B1");
    const btn2 = document.getElementById("B2");
    const btn3 = document.getElementById("B3");
    const btn4 = document.getElementById("B4");
    const form1 = document.getElementById("formulario_B1");
    const form2 = document.getElementById("formulario_B2");
    const form3 = document.getElementById("formulario_B3");
    const form4 = document.getElementById("formulario_B4");

    btn1.addEventListener("click", function () {
        alert("Botón SOLICITADOS presionado");
        form1.style.display = "block";
        form2.style.display = "none";
        form3.style.display = "none";
        form4.style.display = "none";
    });

    btn2.addEventListener("click", function () {
        alert("Botón ASIGNADOS presionado");
        form1.style.display = "none";
        form2.style.display = "block";
        form3.style.display = "none";
        form4.style.display = "none";
    });

    btn3.addEventListener("click", function () {
        alert("Botón RESUELTOS presionado");
        form1.style.display = "none";
        form2.style.display = "none";
        form3.style.display = "block";
        form4.style.display = "none";
    });

    btn4.addEventListener("click", function () {
        alert("Botón CANCELADOS presionado");
        form1.style.display = "none";
        form2.style.display = "none";
        form3.style.display = "none";
        form4.style.display = "block";
    });
});

// document.addEventListener("DOMContentLoaded", () => {
//     const imgResena = document.querySelector(".reseña img");
//     imgResena.classList.add("active");
// });