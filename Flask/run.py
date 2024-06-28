from flask import Flask
from flask_cors import CORS

from app.views import *
from app.database import *
app = Flask(__name__)

# asterisco es traeme todo
# rutas de API-Rest
app.route('/', methods=['GET'])(index)

#CRUD
app.route('/api/clients/pending/', methods=['GET'])(get_pending_clients)
app.route('/api/clients/completed/', methods=['GET'])(get_completed_clients)
app.route('/api/clients/archived/', methods=['GET'])(get_archived_clients)

app.route('/api/clients/fetch/<int:clients_id>', methods=['GET'])(get_clients)

app.route('/api/clients/create/', methods=['POST'])(create_clients)
app.route('/api/clients/update/<int:clients_id>', methods=['PUT'])(update_clients)

app.route('/api/clients/archive/<int:clients_id>', methods=['DELETE'])(archive_clients)
app.route('/api/clients/complete/set/<int:clients_id>', methods=['PUT'])(set_complete_clients)
app.route('/api/clients/complete/reset/<int:clients_id>', methods=['PUT'])(reset_complete_clients)

create_table_clientes()

# Conexion a BDD
init_app(app)

# Cors
CORS(app)

if __name__ == '__main__':
    app.run(debug=True)

