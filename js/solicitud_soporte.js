document.addEventListener("DOMContentLoaded", function () {
    // Inicialización de la tabla con todas las solicitudes al cargar la página
    fetchData('http://localhost:5000/api/solicitud/all');

    // Botones de filtro
    const btn1 = document.getElementById("VerSolicitados");
    const btn2 = document.getElementById("VerAsignados");
    const btn3 = document.getElementById("VerResueltos");
    const btn4 = document.getElementById("VerCancelados");

    // Eventos de los botones
    btn1.addEventListener("click", function () {
        // alert("Botón SOLICITADOS presionado");
        fetchData('http://localhost:5000/api/solicitud/pending');
    });

    btn2.addEventListener("click", function () {
        // alert("Botón ASIGNADOS presionado");
        fetchData('http://localhost:5000/api/solicitud/assigned');
    });

    btn3.addEventListener("click", function () {
        // alert("Botón RESUELTOS presionado");
        fetchData('http://localhost:5000/api/solicitud/completed');
    });

    btn4.addEventListener("click", function () {
        // alert("Botón CANCELADOS presionado");
        fetchData('http://localhost:5000/api/solicitud/canceled');
    });
});

function fetchData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tablaSolicitudes = document.getElementById('tablaSolicitudes');
            tablaSolicitudes.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas
            data.forEach(solicitud => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${solicitud.id_solicitud}</td>
                    <td>${solicitud.fecha_solicitud}</td>
                    <td>${solicitud.nombre}</td>
                    <td>${solicitud.apellido}</td>
                    <td>${solicitud.email}</td>
                    <td>${solicitud.telefono}</td>
                    <td>${solicitud.descripcion_problema}</td>
                    <td>${solicitud.tecnico_asignado ? 'Asignado' : 'No asignado'}</td>
                    <td>${solicitud.estado_solicitud ? 'Resuelto' : 'Pendiente'}</td>
                    <td>${solicitud.fecha_cierre || 'N/A'}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="asignarTecnico(${solicitud.id_solicitud})" data-toggle="tooltip" title="Asignar Técnico">
                            <i class='bx bxs-user-voice'></i>
                        </button>
                        <button class="btn btn-success btn-sm" onclick="marcarResuelto(${solicitud.id_solicitud})" data-toggle="tooltip" title="Resuelto">
                            <i class='bx bxs-check-circle'></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="cancelarSolicitud(${solicitud.id_solicitud})" data-toggle="tooltip" title="Cancelar">
                            <i class='bx bxs-x-circle'></i>
                        </button>
                    </td>
                `;
                tablaSolicitudes.appendChild(row);
            });
            $('[data-toggle="tooltip"]').tooltip(); // Inicializar tooltips de Bootstrap
        })
        .catch(error => console.error('Error fetching data:', error));
}

function asignarTecnico(id) {
    fetch(`http://localhost:5000/api/solicitud/update_tecnico/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        location.reload(); // Recargar la página para reflejar los cambios
    })
    .catch(error => console.error('Error al actualizar el estado del técnico:', error));
}

function marcarResuelto(id) {
    fetch(`http://localhost:5000/api/solicitud/update_resuelto/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        location.reload(); // Recargar la página para reflejar los cambios
    })
    .catch(error => console.error('Error al marcar como resuelto:', error));
}

function cancelarSolicitud(id) {
    fetch(`http://localhost:5000/api/solicitud/update_cancelar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        location.reload(); // Recargar la página para reflejar los cambios
    })
    .catch(error => console.error('Error al cancelar la solicitud:', error));
}
