from flask import Flask


app = Flask(__name__)

# cuando vemos un @algo arriba de una funcion se llama decorator
@app.route('/')
def home():
    return "hola mundo flask"

# este if significa q estoy ejecutando este script por consola.
# es decir:
#Python hello.py
if __name__ == '__main__':
    app.run(debug=True)class
    