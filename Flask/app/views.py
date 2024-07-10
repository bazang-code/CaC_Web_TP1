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

######## ACTUALIZO UNA SOLICITUD POR ID ########
def update_solicitud_tecnico(id_solicitud):
    solicitud = Solicitud.get_by_id(id_solicitud)
    if not solicitud:
        return jsonify({'message': 'Solicitud not found'}), 404
    
    solicitud.tecnico_asignado = not solicitud.tecnico_asignado
    solicitud.save()
    return jsonify({'message': 'Estado de técnico asignado actualizado'}), 200


######## RESOLVER/COMPLETAR UNA SOLICITUD ########    
def update_solicitud_resuelto(id_solicitud):
    solicitud = Solicitud.get_by_id(id_solicitud)
    if not solicitud:
        return jsonify({'message': 'Solicitud no encontrada'}), 404
    
    # solicitud.estado_solicitud = True
    solicitud.estado_solicitud = not solicitud.estado_solicitud
    solicitud.fecha_cierre = date.today().strftime('%Y-%m-%d') if not solicitud.fecha_cierre else None
    solicitud.save()
    return jsonify({'message': 'Solicitud marcada como resuelta'}), 200



######## CANCELAR UNA SOLICITUD ########
def update_solicitud_cancelar(id_solicitud):
    solicitud = Solicitud.get_by_id(id_solicitud)
    if not solicitud:
        return jsonify({'message': 'Solicitud no encontrada'}), 404
    
    solicitud.estado_solicitud = False
    solicitud.tecnico_asignado = False
    solicitud.fecha_cierre = date.today().strftime('%Y-%m-%d') if not solicitud.fecha_cierre else None
    solicitud.save()
    return jsonify({'message': 'Solicitud cancelada'}), 200

########    ########

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

def get_canceled_solicitud():
    solicitud = Solicitud.get_all_canceled()
    return jsonify([solicitud.serialize() for solicitud in solicitud])

# HASTA ACA ESTAMOS OK CON LOS CAMBIOS ## 
