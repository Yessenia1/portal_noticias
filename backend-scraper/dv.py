import requests
from bs4 import BeautifulSoup
import json
from typing import Dict, Any, List
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# -------------------------------------------------------
# 1. MAPEO DE NOTICIAS REALES (Países + Perú por región)
# -------------------------------------------------------
URL_MAPPING: Dict[str, str] = {
    # Países
    "madrid": "https://elpais.com/espana/madrid/",
    "buenosaires": "https://www.lanacion.com.ar/buenos-aires/",
    "mexicodf": "https://www.eluniversal.com.mx/metropoli/",
    "santiago": "https://www.emol.com/",
    "bogota": "https://www.eltiempo.com/bogota",
    "quito": "https://www.elcomercio.com/actualidad/quito/",
    "lapaz": "https://www.lostiempos.com/actualidad",
    "saopaulo": "https://g1.globo.com/sp/sao-paulo/",

    # Perú (departamentos)
    "lima": "https://rpp.pe/lima",
    "arequipa": "https://rpp.pe/arequipa",
    "cusco": "https://rpp.pe/cusco",
    "puno": "https://rpp.pe/puno",
    "junin": "https://rpp.pe/junin",
    "lalibertad": "https://rpp.pe/la-libertad",
    "piura": "https://rpp.pe/piura",
    "lambayeque": "https://rpp.pe/lambayeque",
    "loreto": "https://rpp.pe/loreto",
    "cajamarca": "https://rpp.pe/cajamarca",
    "ancash": "https://rpp.pe/ancash",
    "tacna": "https://rpp.pe/tacna",
    "ica": "https://rpp.pe/ica",
    "ucayali": "https://rpp.pe/ucayali",
    "tumbes": "https://rpp.pe/tumbes",
    "sanmartin": "https://rpp.pe/san-martin",
    "moquegua": "https://rpp.pe/moquegua",
    "madrededios": "https://rpp.pe/madre-de-dios",
    "huancavelica": "https://rpp.pe/huancavelica",
    "huanuco": "https://rpp.pe/huanuco",
    "apurimac": "https://rpp.pe/apurimac",
    "ayacucho": "https://rpp.pe/ayacucho",
    "amazonas": "https://rpp.pe/amazonas",
    "pasco": "https://rpp.pe/pasco"
}

# -------------------------------------------------------
# 2. COORDENADAS PARA CLIMA REAL (Open-Meteo)
# -------------------------------------------------------
CITY_COORDS = {
    "madrid": {"lat": 40.4168, "lon": -3.7038},
    "buenosaires": {"lat": -34.6037, "lon": -58.3816},
    "mexicodf": {"lat": 19.4326, "lon": -99.1332},
    "santiago": {"lat": -33.4489, "lon": -70.6693},
    "bogota": {"lat": 4.7110, "lon": -74.0721},
    "quito": {"lat": -0.1807, "lon": -78.4678},
    "lapaz": {"lat": -16.4897, "lon": -68.1193},
    "saopaulo": {"lat": -23.5505, "lon": -46.6333},

    # Algunas ciudades referenciales por departamento del Perú
    "lima": {"lat": -12.0464, "lon": -77.0428},
    "arequipa": {"lat": -16.4090, "lon": -71.5375},
    "cusco": {"lat": -13.5319, "lon": -71.9675},
    "puno": {"lat": -15.8402, "lon": -70.0219},
    "junin": {"lat": -11.1580, "lon": -75.9920},
    "lalibertad": {"lat": -8.1117, "lon": -79.0288},
    "piura": {"lat": -5.1945, "lon": -80.6328},
    "lambayeque": {"lat": -6.7011, "lon": -79.9061},
    "loreto": {"lat": -3.7491, "lon": -73.2538},
    "ica": {"lat": -14.0678, "lon": -75.7286},
    "tacna": {"lat": -18.0066, "lon": -70.2463},
}

# -------------------------------------------------------
# 3. Función para obtener clima
# -------------------------------------------------------
def get_real_weather(city_key: str) -> Dict[str, Any]:
    coords = CITY_COORDS.get(city_key)
    if not coords:
        return {"error": "No hay coordenadas para esta región"}

    url = (
        f"https://api.open-meteo.com/v1/forecast?"
        f"latitude={coords['lat']}&longitude={coords['lon']}&current_weather=true"
    )

    try:
        res = requests.get(url, timeout=10)
        data = res.json()
        cw = data["current_weather"]

        weathercode_map = {
            0: "cielo despejado",
            1: "mayormente despejado",
            2: "parcialmente nublado",
            3: "nublado",
            45: "niebla",
            48: "niebla escarchada",
            51: "llovizna ligera",
            61: "lluvia ligera",
            63: "lluvia moderada",
            80: "chubascos",
            95: "tormentas"
        }

        desc = weathercode_map.get(cw["weathercode"], "clima variable")

        return {
            "temperature": cw["temperature"],
            "wind_speed": cw["windspeed"],
            "description": desc,
            "sentence": f"En {city_key.capitalize()} el clima es {desc} con {cw['temperature']}°C."
        }

    except Exception as e:
        return {"error": str(e)}

# -------------------------------------------------------
# 4. Scraping real de noticias
# -------------------------------------------------------
def fetch_and_scrape_data(city_key: str) -> Dict[str, Any]:
    target_url = URL_MAPPING.get(city_key)
    if not target_url:
        return {"error": "Ciudad/Región no soportada"}

    response = requests.get(target_url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
    soup = BeautifulSoup(response.text, "html.parser")

    articles = soup.find_all("article")[:8]

    news_list = []
    for art in articles:
        title = (art.find("h2") or art.find("h3"))
        p = art.find("p")
        a = art.find("a", href=True)

        if title:
            news_list.append({
                "title": title.get_text(strip=True),
                "snippet": p.get_text(strip=True) if p else "",
                "url": a["href"] if a else target_url
            })

    weather = get_real_weather(city_key)

    return {
        "city_key": city_key,
        "source_url": target_url,
        "weather": weather,
        "news": news_list
    }

# Configuración de reintentos
def session_with_retries():
    # Intenta 3 veces, espera 1s, 2s, 4s entre reintentos
    retry_strategy = Retry(
        total=3,
        backoff_factor=1,
        status_forcelist=[429, 500, 502, 503, 504]
    )
    adapter = HTTPAdapter(max_retries=retry_strategy)
    http = requests.Session()
    http.mount("https://", adapter)
    http.mount("http://", adapter)
    return http


# -------------------------------------------------------
# 5. Ejecutar
# -------------------------------------------------------
if __name__ == "__main__":
    for key in URL_MAPPING.keys():
        print("\n" + "="*80)
        data = fetch_and_scrape_data(key)
        print(json.dumps(data, indent=4, ensure_ascii=False))
