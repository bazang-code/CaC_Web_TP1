let submitButton = document.querySelector("#formulario_STR #submit_str");

submitButton.addEventListener("click", ()=>{  
    let data_post = {
        'nombre': document.querySelector("#formulario_STR #nombre_STR").value,
        'apellido': document.querySelector("#formulario_STR #apellido_STR").value,
        'email': document.querySelector("#formulario_STR #email_STR").value,
        'telefono': document.querySelector("#formulario_STR #telefono_STR").value,
        'descripcion_problema': document.querySelector("#formulario_STR #problema_STR").value
    }

    // Imprimir los datos en la consola
    console.log(data_post);
        
    fetchData(
        "http://localhost:5000/api/solicitud/create/",
        "POST",
        (data) => {
            console.log("Respuesta de la API:", data);
            alert('La solicitud fue enviada con éxito');
            setTimeout(() => {
                window.location.href = "./tecnico_domicilio.html";
            }, 3000);
        },
        data_post
    );
}
);
