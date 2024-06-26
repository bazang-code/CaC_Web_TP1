from flask import jsonify

def index():
    return jsonify(
        {
            'mesaje': 'Hola Mundo Listado de Tareas'
        }
    )