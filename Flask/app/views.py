from flask import jsonify, request

def index():
    return jsonify(
        {
            'mesaje': 'Hola Mundo Listado de Tareas'
        }
    )

def get_pending_clients():
    clients = [
        {
            'id':1,
            'nombre':'Cliente 1 pending',
            'descripcion':'Cliente 1 Desc',
            'completada': False,
            'activo': True,
            'fecha_creacion': '2024-01-01'
        },
        {
            'id':2,
            'nombre':'Cliente 2',
            'descripcion':'Cliente 2 Desc',
            'completada': False,
            'activo': True,
            'fecha_creacion': '2024-01-01'
        }
    ]
    return jsonify(clients)

def get_completed_clients():
    clients = [
        {
            'id':1,
            'nombre':'Cliente 1 completed',
            'descripcion':'Cliente 1 Desc',
            'completada': False,
            'activo': True,
            'fecha_creacion': '2024-01-01'
        },
        {
            'id':2,
            'nombre':'Cliente 2',
            'descripcion':'Cliente 2 Desc',
            'completada': False,
            'activo': True,
            'fecha_creacion': '2024-01-01'
        }
    ]
    return jsonify(clients)

def get_archived_clients():
    clients = [
        {
            'id':1,
            'nombre':'Cliente 1 archived',
            'descripcion':'Cliente 1 Desc',
            'completada': False,
            'activo': True,
            'fecha_creacion': '2024-01-01'
        },
        {
            'id':2,
            'nombre':'Cliente 2',
            'descripcion':'Cliente 2 Desc',
            'completada': False,
            'activo': True,
            'fecha_creacion': '2024-01-01'
        }
    ]
    return jsonify(clients)

def get_clients(clients_id):
 clients = {
 'id':clients_id,
 }
 return jsonify(clients)

def create_clients():
    #datos recibidos en formato json
    data = request.json
    return jsonify({'message': 'Clients created successfully','data':data}), 201

def update_clients(clients_id):
    #datos recibidos en formato json
    data = request.json
    return jsonify({'message': 'Clients updated successfully','data':data,'id':clients_id})

def archive_clients(clients_id):
    return jsonify({'message': 'Clients archived successfully','id':clients_id})

def set_complete_clients(clients_id):
    return jsonify({'message': 'Clients updated successfully','id':clients_id})

def reset_complete_clients(clients_id):
    return jsonify({'message': 'Clients updated successfully','id':clients_id})
