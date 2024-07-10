from app.database import get_db

class Solicitud:
    def __init__(self, id_solicitud=None,fecha_solicitud=None, nombre=None, apellido=None, email=None, telefono=None, descripcion_problema=None, tecnico_asignado=None, estado_solicitud=None, fecha_cierre=None):
        self.id_solicitud = id_solicitud
        self.fecha_solicitud = fecha_solicitud
        self.nombre = nombre
        self.apellido = apellido
        self.email = email
        self.telefono = telefono
        self.descripcion_problema = descripcion_problema
        self.tecnico_asignado = tecnico_asignado
        self.estado_solicitud = estado_solicitud
        self.fecha_cierre = fecha_cierre

    @staticmethod
    def __get_solicitud_by_query(query):
        db = get_db()
        cursor = db.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
    
        solicitud = []
        for row in rows:
            solicitud.append(
                Solicitud(
                    id_solicitud=row[0], 
                    fecha_solicitud=row[1], 
                    nombre=row[2], 
                    apellido=row[3], 
                    email=row[4], 
                    telefono=row[5], 
                    descripcion_problema=row[6], 
                    tecnico_asignado=row[7], 
                    estado_solicitud=row[8], 
                    fecha_cierre=row[9]
                )
            )
        cursor.close()
        return solicitud


    @staticmethod
    def get_all_solicitud():
        return Solicitud.__get_solicitud_by_query(
            """
                SELECT A.ID_SOLICITUD, A.FECHA_SOLICITUD,A.NOMBRE, A.APELLIDO, A.EMAIL, A.TELEFONO, A.DESCRIPCION_PROBLEMA, 
                       A.TECNICO_ASIGNADO, A.ESTADO_SOLICITUD, A.FECHA_CIERRE
                    FROM SOLICITUDES A
                ORDER BY A.ID_SOLICITUD DESC
            """
        )
    
    @staticmethod
    def get_all_pending():
        return Solicitud.__get_solicitud_by_query(
            """
                SELECT A.ID_SOLICITUD, A.FECHA_SOLICITUD,A.NOMBRE, A.APELLIDO, A.EMAIL, A.TELEFONO, A.DESCRIPCION_PROBLEMA, 
                       A.TECNICO_ASIGNADO, A.ESTADO_SOLICITUD, A.FECHA_CIERRE
                    FROM SOLICITUDES A
                WHERE A.ESTADO_SOLICITUD = FALSE
                  AND A.FECHA_CIERRE IS NULL
                ORDER BY A.ID_SOLICITUD DESC
            """
        )

    @staticmethod
    def get_all_completed():
        return Solicitud.__get_solicitud_by_query(
            """
                SELECT A.ID_SOLICITUD, A.FECHA_SOLICITUD,A.NOMBRE, A.APELLIDO, A.EMAIL, A.TELEFONO, A.DESCRIPCION_PROBLEMA, 
                       A.TECNICO_ASIGNADO, A.ESTADO_SOLICITUD, A.FECHA_CIERRE
                    FROM SOLICITUDES A
                WHERE A.ESTADO_SOLICITUD = TRUE
                ORDER BY A.ID_SOLICITUD DESC
            """
        )

    @staticmethod
    def get_all_assigned():
        return Solicitud.__get_solicitud_by_query(
            """
                SELECT A.ID_SOLICITUD, A.FECHA_SOLICITUD,A.NOMBRE, A.APELLIDO, A.EMAIL, A.TELEFONO, A.DESCRIPCION_PROBLEMA, 
                       A.TECNICO_ASIGNADO, A.ESTADO_SOLICITUD, A.FECHA_CIERRE
                    FROM SOLICITUDES A
                WHERE A.TECNICO_ASIGNADO = TRUE
                ORDER BY A.ID_SOLICITUD DESC
            """
        ) 
    
    @staticmethod
    def get_all_canceled():
        return Solicitud.__get_solicitud_by_query(
            """
                SELECT A.ID_SOLICITUD, A.FECHA_SOLICITUD,A.NOMBRE, A.APELLIDO, A.EMAIL, A.TELEFONO, A.DESCRIPCION_PROBLEMA, 
                       A.TECNICO_ASIGNADO, A.ESTADO_SOLICITUD, A.FECHA_CIERRE
                    FROM SOLICITUDES A
                WHERE A.TECNICO_ASIGNADO = FALSE AND A.ESTADO_SOLICITUD = FALSE AND A.FECHA_CIERRE IS NOT NULL
                ORDER BY A.ID_SOLICITUD DESC
            """
        ) 
    
    
    @staticmethod
    def get_by_id(id_solicitud):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM SOLICITUDES WHERE ID_SOLICITUD = %s", (id_solicitud,))

        row = cursor.fetchone()
        cursor.close()

        if row:
            return Solicitud(
                id_solicitud=row[0], 
                fecha_solicitud=row[1], 
                nombre=row[2], 
                apellido=row[3], 
                email=row[4], 
                telefono=row[5], 
                descripcion_problema=row[6], 
                tecnico_asignado=row[7], 
                estado_solicitud=row[8], 
                fecha_cierre=row[9]
            )
        return None
    


    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_solicitud: # Actualizar Solicitud existente
            cursor.execute(
                """
                UPDATE SOLICITUDES
                SET TECNICO_ASIGNADO = %s, ESTADO_SOLICITUD = %s, FECHA_CIERRE = %s
                WHERE ID_SOLICITUD = %s
                """,
                (self.tecnico_asignado, self.estado_solicitud, self.fecha_cierre, self.id_solicitud))
        else: # Crear Solicitud nueva
            cursor.execute(
                """
                INSERT INTO SOLICITUDES
                (nombre, apellido, email, telefono, descripcion_problema)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (self.nombre, self.apellido, self.email, self.telefono, self.descripcion_problema))
            self.id_solicitud = cursor.lastrowid
        db.commit()
        cursor.close()

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """
            UPDATE SOLICITUDES
                SET TECNICO_ASIGNADO = FALSE, ESTADO_SOLICITUD = FALSE, FECHA_CIERRE = %s 
            WHERE ID_SOLICITUD = %s""", 
            (self.fecha_cierre.strftime('%Y-%m-%d'), self.id_solicitud,))
            
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id_solicitud': self.id_solicitud,
            'fecha_solicitud': self.fecha_solicitud.strftime('%Y-%m-%d'),
            'nombre': self.nombre,
            'apellido': self.apellido,
            'email': self.email,
            'telefono': self.telefono,
            'descripcion_problema': self.descripcion_problema,
            'tecnico_asignado': self.tecnico_asignado, 
            'estado_solicitud': self.estado_solicitud, 
            'fecha_cierre': self.fecha_cierre
        }

