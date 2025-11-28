import firebase_admin
from firebase_admin import credentials, firestore
import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from datetime import datetime

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

import hashlib


# -------------------------------------
# 1. FIREBASE
# -------------------------------------

SERVICE_ACCOUNT_FILE = "noticias-c704d-firebase-adminsdk-fbsvc-1c440cc1bc.json"
try:
    cred = credentials.Certificate(SERVICE_ACCOUNT_FILE)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    print("Firebase conectado ✔")
except Exception as e:
    print("Error Firebase:", e)
    exit()


# -------------------------------------
# 2. CREAR DRIVER SELENIUM (ROBUSTO)
# -------------------------------------

def crear_driver():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--start-maximized")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")

    service = Service(ChromeDriverManager().install())

    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

# -------------------------------------
# 3. GUARDAR EN FIRESTORE
# -------------------------------------

def guardar_noticia(noticia):
    try:
        id_unico = hashlib.md5(noticia["enlace"].encode()).hexdigest()

        noticia['fecha_subida'] = firestore.SERVER_TIMESTAMP
        noticia['es_premium'] = False

        if "fecha_publicacion" not in noticia:
            noticia["fecha_publicacion"] = datetime.now()

        ref = db.collection("noticias").document(id_unico)

        # Ya existe → no guardar
        if ref.get().exists:
            return False

        # Guardar noticia
        ref.set(noticia)
        return True

    except:
        return False

# -------------------------------------
# 4. SCRAPER SELENIUM GENÉRICO (ULTRA ROBUSTO)
# -------------------------------------

def scraper_selenium(url, fuente, pais="US"):
    driver = crear_driver()

    print(f"Cargando {fuente} ...")
    driver.get(url)
    time.sleep(3)

    # =====================================================
    # 🔥 SCROLL INFINITO — Opción A
    # =====================================================
    scrolls = 35   # Aumenta para más días (recomendado: 30–50)
    last_height = driver.execute_script("return document.body.scrollHeight")

    print("Haciendo scroll infinito...")

    for i in range(scrolls):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2.2)  # dejar cargar noticias

        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            print("No hay más contenido, scroll detenido.")
            break

        last_height = new_height

    print("Scroll completado ✔")

    # Obtener HTML final tras scroll
    html = driver.page_source
    driver.quit()

    soup = BeautifulSoup(html, "html.parser")

    noticias = []
    vistos = set()

    print(f"Analizando HTML de {fuente}...")

    # Contenedores donde suelen estar las noticias
    contenedores = soup.select("article, div.card, div.story, div.teaser, div.post, li, div")

    for item in contenedores:
        try:
            # ---------- TÍTULO ----------
            titulo_el = item.find(["h1", "h2", "h3"])
            if not titulo_el:
                continue

            titulo = titulo_el.get_text(strip=True)
            if len(titulo) < 20:
                continue

            # ---------- ENLACE ----------
            a = item.find("a")
            if not a:
                continue

            enlace = a.get("href", "")
            if not enlace:
                continue

            if not enlace.startswith("http"):
                enlace = urljoin(url, enlace)

            if enlace in vistos:
                continue
            vistos.add(enlace)

            # ---------- IMAGEN ----------
            img = item.find("img")
            imagen = ""
            if img:
                imagen = (
                    img.get("src")
                    or img.get("data-src")
                    or img.get("data-lazy-src")
                    or img.get("data-original")
                    or ""
                )
                if imagen.startswith("//"):
                    imagen = "https:" + imagen
                elif not imagen.startswith("http"):
                    imagen = urljoin(url, imagen)

            # ---------- RESUMEN ----------
            p = item.find("p")
            resumen = p.get_text(strip=True) if p else f"Noticia de {fuente}"

            # ---------- CATEGORÍA / PAÍS ----------
            texto_completo = (titulo + " " + resumen).lower()
            categoria_auto = clasificar_categoria(texto_completo)
            pais_auto = detectar_pais(texto_completo)

            # ---------- AGREGAR NOTICIA ----------
            noticias.append({
                "titulo": titulo,
                "enlace": enlace,
                "resumen": resumen[:300],
                "fuente": fuente,
                "pais": pais_auto,
                "categoria": categoria_auto,
                "imagen": imagen,
            })

        except:
            continue

    print(f"✔ {len(noticias)} noticias extraídas de {fuente}")
    return noticias


def clasificar_categoria(texto):
    texto = texto.lower()

    reglas = {
        "Política": ["elecciones", "gobierno", "presidente", "ministro", "congreso", "polit"],
        "Economía": ["inflación", "economía", "mercado", "finanzas", "dólar", "bolsa"],
        "Deportes": ["fútbol", "gol", "liga", "mundial", "nba", "mlb", "tenis", "deporte"],
        "Tecnología": ["tecnología", "smartphone", "google", "apple", "ai", "intel", "chip"],
        "Salud": ["salud", "covid", "virus", "hospital", "vacuna"],
        "Entretenimiento": ["película", "serie", "actor", "música", "cultura"],
        "Clima": ["tormenta", "terremoto", "sismo", "clima", "huracán", "lluvia"],
        "Internacional": ["eeuu", "china", "rusia", "ucrania", "méxico", "europa"],
    }

    for categoria, palabras in reglas.items():
        if any(p in texto for p in palabras):
            return categoria

    return "General"

def detectar_pais(texto):
    texto = texto.lower()

    paises = {
        "Perú": ["perú", "lima", "peruano"],
        "México": ["méxico", "mexicano", "cdmx"],
        "Argentina": ["argentina", "argentino", "buenos aires"],
        "Chile": ["chile", "chileno"],
        "Colombia": ["colombia", "bogotá", "colombiano"],
        "España": ["españa", "madrid", "español"],
        "Estados Unidos": ["eeuu", "estados unidos", "washington", "new york"],
        "Reino Unido": ["reino unido", "uk", "londres"],
        "China": ["china", "chino", "beijing"],
        "Rusia": ["rusia", "moscú"],
    }

    for pais, palabras in paises.items():
        if any(p in texto for p in palabras):
            return pais

    return "Internacional"

# -------------------------------------
# 5. LISTA DE PORTALES
# -------------------------------------

PORTALES = [
    ("BBC Home", "https://www.bbc.com/", "UK"),
    ("BBC News", "https://www.bbc.com/news", "UK"),
    ("BBC Sport", "https://www.bbc.com/sport", "UK"),
    ("BBC Business", "https://www.bbc.com/business", "UK"),
    ("BBC Innovation", "https://www.bbc.com/innovation", "UK"),
    ("BBC Culture", "https://www.bbc.com/culture", "UK"),
    ("BBC Arts", "https://www.bbc.com/arts", "UK"),
    ("BBC Travel", "https://www.bbc.com/travel", "UK"),
    ("BBC Eath", "https://www.bbc.com/future-planet", "UK"),

    ("Clarin", "https://www.clarin.com/", "US"),
    ("Clarin ultimo", "https://www.clarin.com/ultimo-momento", "US"),
    ("Clarin politica", "https://www.clarin.com/politica", "US"),
    ("Clarin economia", "https://www.clarin.com/economia", "US"),
    ("Clarin rural", "https://www.clarin.com/rural", "US"),
    ("Clarin sociedad", "https://www.clarin.com/sociedad", "US"),
    ("Clarin mundo", "https://www.clarin.com/mundo", "US"),
    ("Clarin deportes", "https://www.clarin.com/deportes", "US"),
    ("Clarin espectaculos", "https://www.clarin.com/espectaculos", "US"),
    ("Clarin 80", "https://www.clarin.com/80-aniversario", "US"),

    ("Yahoo Noticias", "https://es-us.noticias.yahoo.com/", "US"),
    ("Yahoo Noticias america", "https://es-us.noticias.yahoo.com/america-latina/", "US"),
    ("Yahoo Noticias eeuu", "https://es-us.noticias.yahoo.com/estados-unidos/", "US"),
    ("Yahoo Noticias deportes", "https://es-us.noticias.yahoo.com/deportes/", "US"),

    ("El Mundo", "https://www.elmundo.es/", "ES"),
    ("El Mundo ultimas", "https://www.elmundo.es/ultimas-noticias.html", "ES"),
    ("El Mundo mundoamerica", "https://www.mundoamerica.com/", "ES"),
    ("El Mundo metropoli", "hhttps://www.elmundo.es/metropoli.html", "ES"),
    ("El Mundo cronica", "https://www.elmundo.es/cronica.html", "ES"),
    ("El Mundo yodona", "https://www.elmundo.es/yodona.html", "ES"),
    ("El Mundo papel", "https://www.elmundo.es/papel.html", "ES"),
    ("El Mundo madrid", "https://www.elmundo.es/madrid.html", "ES"),
    ("El Mundo loc", "https://www.elmundo.es/loc.html", "ES"),
    ("El Mundo vida", "https://www.elmundo.es/vida-sana.html", "ES"),
    ("El Mundo motor", "https://www.elmundo.es/motor.html", "ES"),
    ("El Mundo ambiente", "https://www.elmundo.es/ciencia-y-salud/medio-ambiente.html", "ES"),
    ("El Mundo encuestas", "https://www.elmundo.es/espana/encuestas.html", "ES"),
    ("El Mundo lectura", "https://www.elmundo.es/la-lectura.html", "ES"),
    ("El Mundo tecnologia", "https://www.elmundo.es/tecnologia.html", "ES"),

    ("Infobae España", "https://www.infobae.com/espana/", "ES"),
    ("Infobae México", "https://www.infobae.com/mexico/", "MX"),
    ("Infobae Perú", "https://www.infobae.com/peru/", "PE"),
]


# -------------------------------------
# 6. EJECUTAR SCRAPING COMPLETO
# -------------------------------------

def ejecutar_scraping():
    total_global = 0

    for nombre, url, pais in PORTALES:
        print("\n==============================")
        print("Portal:", nombre)
        print("==============================")

        noticias = scraper_selenium(url, nombre, pais)

        if not noticias:
            print("⚠️ No se encontraron.")
            continue

        nuevas = 0

        for n in noticias:
            if guardar_noticia(n):
                nuevas += 1

        total_global += nuevas

        print(f"✔ {nombre}: {nuevas} noticias nuevas guardadas")

    print("\n================================")
    print("SCRAPING COMPLETO - Total nuevas:", total_global)
    print("================================")


if __name__ == "__main__":
    ejecutar_scraping()
