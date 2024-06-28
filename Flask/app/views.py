from flask import jsonify, request
from app.models import Clients

from datetime import date
 

def index():
    return jsonify(
        {
            'mesaje': 'Hola Mundo Listado de Tareas'
        }
    )


def get_pending_clients():
    clients = Clients.get_all_pending()
    return jsonify([clients.serialize() for task in clients])

def get_completed_clients():
    clients = Clients.get_all_completed()
    return jsonify([clients.serialize() for clients in clients])

def get_archived_clients():
    clients = Clients.get_all_archived()
    return jsonify([clients.serialize() for clients in clients])

def get_clients(clients_id):
    clients = Clients.get_by_id(clients_id)
    if not clients:
        return jsonify({'message': 'Clients not found'}), 404
    return jsonify(clients.serialize())

def create_clients():
    data = request.json
    new_clients = Clients(
        nombre=data['nombre'],
        descripcion=data['descripcion'],
        fecha_creacion=date.today().strftime('%Y-%m-%d'),
        completada=False,
        activa=True
    )
    new_clients.save()
    return jsonify({'message': 'Clients created successfully'}), 201

def update_clients(clients_id):
    clients = Clients.get_by_id(clients_id)
    if not clients:
        return jsonify({'message': 'Clients not found'}), 404
   
    data = request.json
    clients.nombre = data['nombre']
    clients.descripcion = data['descripcion']
    clients.save()
    return jsonify({'message': 'Clients updated successfully'})

def archive_clients(clients_id):
    clients = Clients.get_by_id(clients_id)
    if not clients:
        return jsonify({'message': 'Clients not found'}), 404
   
    clients.delete()
    return jsonify({'message': 'Movie deleted successfully'})

def __complete_clients(clients_id, status):
    clients = Clients.get_by_id(clients_id)
    if not clients:
        return jsonify({'message': 'Clients not found'}), 404

    clients.completada = status
    clients.activa = True
    clients.save()
    return jsonify({'message': 'Clients updated successfully'})

def set_complete_clients(clients_id):
    return __complete_clients(clients_id, True)

def reset_complete_clients(clients_id):
    return __complete_clients(clients_id, False)

