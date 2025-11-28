# /backend-scraper/app.py

from flask import Flask, jsonify, request
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
import atexit

# Importamos la función principal de scraping de nuestro otro archivo
from scraper import ejecutar_scraping_completo # Asume que creaste esta función en scraper.py

app = Flask(__name__)

# --- 1. LÓGICA DE SCHEDULER (TAREA DIARIA) ---

def tarea_scraping_diario():
    """Función que se ejecuta automáticamente una vez al día."""
    print(f"--- ⏰ INICIO DE TAREA DE SCRAPING DIARIO: {datetime.now()} ---")
    try:
        # Llama a la función principal de tu scraper.py para obtener noticias de todos los portales
        ejecutar_scraping_completo()
    except Exception as e:
        print(f"ERROR en la tarea de scraping: {e}")
    print(f"--- ⏰ FIN DE TAREA DE SCRAPING DIARIO ---")

# Configuración del Scheduler
scheduler = BackgroundScheduler()
# Ejecuta la tarea_scraping_diario todos los días a las 05:00 AM (ajusta la hora)
scheduler.add_job(
    func=tarea_scraping_diario, 
    trigger="cron", 
    hour=5, 
    minute=0, 
    id='daily_scraper'
)
scheduler.start()

# Asegura que el scheduler se detenga cuando la aplicación Flask se cierre
atexit.register(lambda: scheduler.shutdown())


# --- 2. RUTA PARA EL BOTÓN DE ACTUALIZACIÓN (PREMIUM) ---

@app.route('/api/actualizar', methods=['POST'])
def actualizar_ahora():
    """
    Ruta para el botón 'Actualizar' que el usuario Premium puede clickear.
    Esto ejecuta el scraping bajo demanda.
    """
    # ⚠️ En un proyecto real, aquí deberías verificar el token de Firebase 
    #    para confirmar que el usuario que llama a esta API es Premium.
    
    # En esta simulación, solo ejecutamos la tarea:
    print(f"--- 🚀 INICIO DE SCRAPING MANUAL POR USUARIO: {datetime.now()} ---")
    try:
        ejecutar_scraping_completo()
        return jsonify({
            "status": "success", 
            "message": "Scraping manual iniciado y completado. Revise Firestore en breve."
        }), 200
    except Exception as e:
        print(f"Error al ejecutar scraping manual: {e}")
        return jsonify({
            "status": "error", 
            "message": f"Error en el servidor al ejecutar el scraping: {str(e)}"
        }), 500


# --- 3. INICIO DE LA APLICACIÓN FLASK ---

if __name__ == '__main__':
    # La aplicación Flask solo necesita correr en tu máquina/servidor para programar 
    # la tarea y responder a la actualización manual.
    app.run(debug=True, use_reloader=False) 
    # use_reloader=False es importante para que el Scheduler no se ejecute dos veces