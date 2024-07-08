from flask import Flask, request, jsonify
from flask_cors import CORS
from app.views import *
from app.database import *
from app.models import Solicitud

# from app.models import create_table_solicitud

app = Flask(__name__)


# Crear la tabla de solicitudes
create_table_solicitud()

# Defino las rutas de la API-Rest
app.route('/', methods=['GET'])(index)

# Rutas para solicitudes de soporte técnico
# app.route('/api/submit_str', methods=['POST'])(submit_str)
# app.route('/api/success')

# #CRUD
app.route('/api/solicitud/create/', methods=['POST'])(create_solicitud)
app.route('/api/solicitud/fetch/<int:id_solicitud>', methods=['GET'])(get_solicitud)
app.route('/api/solicitud/update/<int:id_solicitud>', methods=['PUT'])(update_solicitud)

# app.route('/api/solicitud/canceled/', methods=['GET'])(canceled_solicitud)

app.route('/api/solicitud/all/', methods=['GET'])(get_all_solicitud) #LISTA TODAS LAS SOLICITUDES AL CARGAR LA PAGINA
app.route('/api/solicitud/pending/', methods=['GET'])(get_pending_solicitud)
app.route('/api/solicitud/completed/', methods=['GET'])(get_completed_solicitud)
app.route('/api/solicitud/assigned/', methods=['GET'])(get_assigned_solicitud)


# Conexión a BDD
init_app(app)

# Cors
CORS(app)


if __name__ == '__main__':
    app.run(debug=True)

