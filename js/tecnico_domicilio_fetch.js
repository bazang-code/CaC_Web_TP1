document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.querySelector("#submit_str");  // el ID del botón de envío del form
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();  // Prevenir el envío del formulario por defecto

        const data_post = {
            'nombre': document.querySelector("#nombre_STR").value,
            'apellido': document.querySelector("#apellido_STR").value,
            'email': document.querySelector("#email_STR").value,
            'telefono': document.querySelector("#telefono_STR").value,
            'descripcion_problema': document.querySelector("#problema_STR").value
        };

        // Imprimir los datos en la consola
        console.log(data_post);

        fetch("http://localhost:5000/api/submit_str", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data_post)
        })
        .then(response => response.json())
        .then(data => {
            alert('Solicitud enviada con éxito');
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        })
        .catch(error => console.error("Ocurrió un error!", error));
        // fetchData(
        //     "http://localhost:5000/api/submit_str",  // Asegúrate de que esta ruta sea correcta
        //     "POST",
        //     (data) => {
        //         alert('Solicitud enviada con éxito');
        //         setTimeout(() => {
        //             window.location.reload();  // Recargar la página después de 3 segundos
        //         }, 3000);
        //     },
        //     data_post
        // );
    });
});

function fetchData(url, method, callback, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,
    };

    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        callback(data);
    })
    .catch(error => console.log("Ocurrió un error! " + error));
}
