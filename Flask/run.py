from flask import Flask
from app.views import *
from app.database import test_connection, init_app
# asterisco es traeme todo
app = Flask(__name__)

# rutas de API-Rest
app.route('/', methods=['GET'])(index)

# Conexion a BDD
init_app(app)


if __name__ == '__main__':
    app.run(debug=True)

