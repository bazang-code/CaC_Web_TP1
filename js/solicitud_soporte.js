document.addEventListener("DOMContentLoaded", function () {
    // fetch('/api/solicitud/all/api/solicitud/all')
    fetch('http://localhost:5000/api/solicitud/all')
        .then(response => response.json())
        .then(data => {
            const tablaSolicitudes = document.getElementById('tablaSolicitudes');
            data.forEach(solicitud => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${solicitud.id_solicitud}</td>
                    <td>${solicitud.fecha_solicitud}</td>
                    <td>${solicitud.nombre}</td>
                    <td>${solicitud.apellido}</td>
                    <td>${solicitud.email}</td>
                    <td>${solicitud.telelono}</td>
                    <td>${solicitud.descripcion_problema}</td>
                    <td>${solicitud.estado_solicitud ? 'Resuelto' : 'Pendiente'}</td>
                    <td>${solicitud.tecnico_asignado ? 'Asignado' : 'No asignado'}</td>
                    <td>${solicitud.fecha_cierre || 'N/A'}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="asignarTecnico(${solicitud.id_solicitud})">Asignar Técnico</button>
                        <button class="btn btn-success btn-sm" onclick="marcarResuelto(${solicitud.id_solicitud})">Resuelto</button>
                        <button class="btn btn-danger btn-sm" onclick="cancelarSolicitud(${solicitud.id_solicitud})">Cancelar</button>
                    </td>
                `;
                tablaSolicitudes.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function asignarTecnico(id) {
    // Lógica para asignar técnico
    alert(`Asignar técnico a la solicitud ${id}`);
}

function marcarResuelto(id) {
    // Lógica para marcar como resuelto
    alert(`Marcar resuelto la solicitud ${id}`);
}

function cancelarSolicitud(id) {
    // Lógica para cancelar solicitud
    alert(`Cancelar la solicitud ${id}`);
}

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



// document.addEventListener("DOMContentLoaded", () => {
//     const imgResena = document.querySelector(".reseña img");
//     imgResena.classList.add("active");
// });

