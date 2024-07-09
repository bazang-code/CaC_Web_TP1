// Botones de filtro de tareas
let filterButtons = {
    "Solicitados": document.querySelector("#VerSolicitados"),
    "Asignados": document.querySelector("#VerAsignados"),
    "Resueltos": document.querySelector("#VerResueltos"),
    "Cancelados": document.querySelector("#VerCancelados")
}

// Template de tarea Pendiente
let solicitudSolicitadosTemplateReference = document.querySelector(".solicitud.solicitados.template");

// Template de tarea Completada
let solicitudAsignadosTemplateReference = document.querySelector(".solicitud.asignados.template");

// Template de tarea Archivada
let solicitudResueltosTemplateReference = document.querySelector(".solicitud.resueltos.template");


// Template de tarea Archivada
let solicitudCanceladosTemplateReference = document.querySelector(".solicitud.cancelados.template");


// Templates de tareas para clonar al momento de agregar tareas al contenedor
let taskTemplates = {
    "Solicitados": solicitudSolicitadosTemplateReference.cloneNode(true),
    "Asignados": solicitudAsignadosTemplateReference.cloneNode(true),
    "Resueltos": solicitudResueltosTemplateReference.cloneNode(true),
    "Cancelados": solicitudCanceladosTemplateReference.cloneNode(true)
};

// Quito del documento los templates
solicitudSolicitadosTemplateReference.remove();
solicitudAsignadosTemplateReference.remove();
solicitudResueltosTemplateReference.remove();
solicitudCanceladosTemplateReference.remove();