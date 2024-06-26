import os
import psycopg2
from flask import g
from dotenv import load_dotenv
# Cargar variables de entorno desde el archivo .env
load_dotenv()
# Configuración de la base de datos usando variables de entorno
DATABASE_CONFIG = {
 'user': os.getenv('DB_USERNAME'), 
 'password': os.getenv('DB_PASSWORD'), 
 'host': os.getenv('DB_HOST'), 
 'database': os.getenv('DB_NAME'), 
 'port': os.getenv('DB_PORT', 5432) 
}

def test_connection():
    conn = psycopg2.connect(**DATABASE_CONFIG) 

    cur = conn.cursor() 
    
    conn.commit() 
    
    cur.close() 
    conn.close()