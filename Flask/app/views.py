from flask import jsonify, request
from app.database import *
from app.models import Solicitud

from datetime import date

def index():
    return jsonify(
        {
            'mensaje': 'Solicitudes de Soporte Tecnico'
        }
    )

######## CREO UNA SOILCITUD ########
def create_solicitud():
    data = request.json
    # Agreggo ---------
    if not data:
        return jsonify({'message': 'No se recibieron datos'}), 400
    try:
    # hasta aca ---------
        new_solicitud = Solicitud(
            fecha_solicitud=date.today().strftime('%Y-%m-%d'),
            nombre=data['nombre'],
            apellido=data['apellido'],
            email=data['email'],
            telefono=data['telefono'],
            descripcion_problema=data['descripcion_problema'],
            tecnico_asignado=False,
            estado_solicitud=True
        )
        new_solicitud.save()
        return jsonify({'message': 'Solicitud creada con exito'}), 201
    # Agreggo ---------
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    # hasta aca ---------
    
######## TRAIGO UNA SOLICITUD POR ID ########
def get_solicitud(id_solicitud):
    solicitud = Solicitud.get_by_id(id_solicitud)
    if not solicitud:
        return jsonify({'message': 'Solicitud not found'}), 404
    return jsonify(solicitud.serialize())

######## ACTUALIZO UNA SOLICITUD PO ID ########
def update_solicitud(id_solicitud):
    solicitud = Solicitud.get_by_id(id_solicitud)
    if not solicitud:
        return jsonify({'message': 'Solicitud not found'}), 404
    
    data = request.json
    solicitud.tecnico_asignado = data['tecnico_asginado']
    solicitud.estado_solicitud = data['estado_solicitud']
    solicitud.fecha_cierre = data['fecha_cierre']
    solicitud.save()
    return jsonify({'message': 'Solicitud modificada con exito'})

######## CANCELAR UNA SOLICITUD ########
# def get_canecled_solicitud()

def get_all_solicitud():
    solicitud = Solicitud.get_all_solicitud()
    return jsonify([solicitud.serialize() for solicitud in solicitud])

def get_pending_solicitud():
    solicitud = Solicitud.get_all_pending()
    return jsonify([solicitud.serialize() for solicitud in solicitud])

def get_completed_solicitud():
    solicitud = Solicitud.get_all_completed()
    return jsonify([solicitud.serialize() for solicitud in solicitud])

def get_assigned_solicitud():
    solicitud = Solicitud.get_all_assigned()
    return jsonify([solicitud.serialize() for solicitud in solicitud])


# HASTA ACA ESTAMOS OK CON LOS CAMBIOS ## 



# def update_asignar_tecnico(id_solicitud):
#     clients = Clients.get_by_id(clients_id)
#     if not clients:
#         return jsonify({'message': 'Clients not found'}), 404
   
#     data = request.json
#     clients.nombre = data['nombre']
#     clients.descripcion = data['descripcion']
#     clients.save()
#     return jsonify({'message': 'Clients updated successfully'})

# def archive_clients(clients_id):
#     clients = Clients.get_by_id(clients_id)
#     if not clients:
#         return jsonify({'message': 'Clients not found'}), 404
   
#     clients.delete()
#     return jsonify({'message': 'Movie deleted successfully'})

# def __complete_clients(clients_id, status):
#     clients = Clients.get_by_id(clients_id)
#     if not clients:
#         return jsonify({'message': 'Clients not found'}), 404

#     clients.completada = status
#     clients.activa = True
#     clients.save()
#     return jsonify({'message': 'Clients updated successfully'})

# def set_complete_clients(clients_id):
#     return __complete_clients(clients_id, True)

# def reset_complete_clients(clients_id):
#     return __complete_clients(clients_id, False)

