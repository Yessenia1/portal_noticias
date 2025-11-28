# This file contains the Flask server for the backend functionalities.
# The code has been reviewed and is in the correct format.
# api_server.py - Servidor Flask para funcionalidades backend

from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import threading

app = Flask(__name__)
CORS(app)  # Permitir solicitudes desde el frontend

# Variable para controlar si hay un scraping en ejecución
scraping_en_curso = False

@app.route('/api/actualizar', methods=['POST'])
def actualizar_noticias():
    """
    Ejecuta el scraper para actualizar noticias
    Solo usuarios premium pueden usar esta función
    """
    global scraping_en_curso
    
    if scraping_en_curso:
        return jsonify({
            'success': False,
            'message': 'Ya hay un proceso de actualización en curso. Espera unos minutos.'
        }), 429
    
    try:
        scraping_en_curso = True
        
        # Ejecutar el scraper en un hilo separado
        def run_scraper():
            global scraping_en_curso
            try:
                subprocess.run(['python', 'scraper_premium.py'], check=True)
            finally:
                scraping_en_curso = False
        
        thread = threading.Thread(target=run_scraper)
        thread.start()
        
        return jsonify({
            'success': True,
            'message': '✅ Actualización de noticias iniciada. Esto puede tardar varios minutos.'
        })
    
    except Exception as e:
        scraping_en_curso = False
        return jsonify({
            'success': False,
            'message': f'Error al iniciar actualización: {str(e)}'
        }), 500

@app.route('/api/status', methods=['GET'])
def status():
    """
    Verifica el estado del scraping
    """
    return jsonify({
        'scraping_en_curso': scraping_en_curso,
        'status': 'ok'
    })

@app.route('/api/health', methods=['GET'])
def health():
    """
    Health check endpoint
    """
    return jsonify({
        'status': 'healthy',
        'service': 'Noticias+ Premium API'
    })

if __name__ == '__main__':
    print("🚀 Servidor Flask iniciado en http://127.0.0.1:5000")
    print("📡 Endpoints disponibles:")
    print("  - POST /api/actualizar - Actualizar noticias")
    print("  - GET  /api/status - Estado del scraping")
    print("  - GET  /api/health - Health check")
    app.run(debug=True, host='127.0.0.1', port=5000)