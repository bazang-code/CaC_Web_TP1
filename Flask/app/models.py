from app.database import get_db

class Clients:
    def __init__(self, id_clients=None, nombre=None, descripcion=None, fecha_creacion=None, completada=None, activa=None):
        self.id_clients = id_clients
        self.nombre = nombre
        self.descripcion = descripcion
        self.fecha_creacion = fecha_creacion
        self.completada = completada
        self.activa = activa

    @staticmethod
    def __get_clients_by_query(query):
        db = get_db()
        cursor = db.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
    
        clients = []
        for row in rows:
            clients.append(
                Clients(
                    id_clients=row[0],
                    nombre=row[1],
                    descripcion=row[2],
                    fecha_creacion=row[3],
                    completada=row[4],
                    activa=row[5]
                )
            )
        cursor.close()
        return clients

    @staticmethod
    def get_all_pending():
        return Clients.__get_clients_by_query(
            """
                SELECT * 
                FROM tareas 
                WHERE activa = true AND completada = false
                ORDER BY fecha_creacion DESC
            """
        )

    @staticmethod
    def get_all_completed():
        return Clients.__get_clients_by_query(
            """
                SELECT * 
                FROM tareas 
                WHERE activa = true AND completada = true
                ORDER BY fecha_creacion DESC
            """
        )

    @staticmethod
    def get_all_archived():
        return Clients.__get_clients_by_query(
            """
                SELECT * 
                FROM tareas 
                WHERE activa = false
                ORDER BY fecha_creacion DESC
            """
        ) 
    @staticmethod
    def get_by_id(id_clients):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM tareas WHERE id = %s", (id_clients,))

        row = cursor.fetchone()
        cursor.close()

        if row:
            return Clients(
                id_clients==row[0],
                nombre=row[1],
                descripcion=row[2],
                fecha_creacion=row[3],
                completada=row[4],
                activa=row[5]
            )
        return None
    
    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_clients: # Actualizar Tarea existente
            cursor.execute(
                """
                UPDATE tareas
                SET nombre = %s, descripcion = %s, completada = %s, activa = %s
                WHERE id = %s
                """,
                (self.nombre, self.descripcion, self.completada, self.activa, self.id_clients))
        else: # Crear Tarea nueva
            cursor.execute(
                """
                INSERT INTO tareas
                (nombre, descripcion, fecha_creacion, completada, activa)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (self.nombre, self.descripcion, self.fecha_creacion, self.completada, self.activa))
            self.id_clients = cursor.lastrowid
        db.commit()
        cursor.close()

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE tareas SET activa = false WHERE id = %s", (self.id_clients,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id': self.id_clients,
            'nombre': self.nombre,
            'descripcion': self.descripcion,
            'fecha_creacion': self.fecha_creacion.strftime('%Y-%m-%d'),
            'completada': self.completada,
            'activa': self.activa
        }


