from app.database import get_db

class clients:
    def __init__(self, id_clients=None, nombre=None, descripcion=None, fecha_creacion=None, completada=None, activa=None):
        self.id_clients = id_clients
        self.nombre = nombre
        self.descripcion = descripcion
        self.fecha_creacion = fecha_creacion
        self.completada = completada
        self.activa = activa