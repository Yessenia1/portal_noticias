
from firebase_admin import credentials
import time
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from datetime import datetime
import re

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

import hashlib

# -------------------------------------
# 1. SUPABASE
# -------------------------------------

from supabase import create_client, Client

SUPABASE_URL = "https://bziuhbswzpcqduitponw.supabase.co"
SUPABASE_KEY = "sb_secret_MfQGBEt-5rSZCl3vKGFzMw_m4xx2lxx"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

print("Supabase conectado")


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
# 3. EXTRAER FECHA DE PUBLICACIÓN
# -------------------------------------

def extraer_fecha_publicacion(item, soup):
    """
    Extrae fecha real evitando textos repetidos o globales como el footer.
    Solo busca:
    - <time datetime="">
    - meta article:published_time
    - patrones dentro del mismo bloque de la noticia (pero limpiando spans vacíos)
    """
    # 1. <time datetime="">
    time_tag = item.find("time")
    if time_tag:
        dt = time_tag.get("datetime")
        if dt:
            fecha = parsear_fecha(dt)
            if fecha:
                return fecha

    # 2. meta property="article:published_time"
    meta_date = soup.find("meta", property="article:published_time")
    if meta_date and meta_date.get("content"):
        fecha = parsear_fecha(meta_date["content"])
        if fecha:
            return fecha

    # 3. Buscar solo en textos cortos donde suelen ir fechas
    candidatos = item.find_all(["span", "p", "div"], limit=5)

    patrones = [
        r"\d{1,2}\s+de\s+[A-Za-záéíóúñ]+\s+de\s+\d{4}",
        r"\d{1,2}/\d{1,2}/\d{4}",
        r"\d{4}-\d{2}-\d{2}",
    ]

    for c in candidatos:
        texto = c.get_text(" ", strip=True)
        if not texto or len(texto) > 80:
            continue  # evitar textos demasiado largos (footer, banners)

        for p in patrones:
            m = re.search(p, texto)
            if m:
                fecha = parsear_fecha(m.group())
                if fecha:
                    return fecha

    return datetime.now().isoformat()


def parsear_fecha(fecha_str):
    """
    Convierte fechas reales a ISO sin romper formatos.
    """
    meses = {
        'enero': '01','febrero': '02','marzo': '03','abril': '04',
        'mayo': '05','junio': '06','julio': '07','agosto': '08',
        'septiembre': '09','octubre': '10','noviembre': '11','diciembre': '12'
    }

    fecha_str = fecha_str.strip().lower()

    # 1. ISO exacto
    try:
        if re.match(r"\d{4}-\d{2}-\d{2}", fecha_str):
            return fecha_str[:10] + "T00:00:00"
    except:
        pass

    # 2. dd/mm/yyyy
    m = re.match(r"(\d{1,2})/(\d{1,2})/(\d{4})", fecha_str)
    if m:
        d, m_, y = m.groups()
        return f"{y}-{m_.zfill(2)}-{d.zfill(2)}T00:00:00"

    # 3. dd de mes de yyyy
    m = re.match(r"(\d{1,2})\s+de\s+([a-záéíóúñ]+)\s+de\s+(\d{4})", fecha_str)
    if m:
        d, mes_texto, y = m.groups()
        mes = meses.get(mes_texto, "01")
        return f"{y}-{mes}-{d.zfill(2)}T00:00:00"

    return None


def parsear_fecha(fecha_str):
    """
    Convierte diferentes formatos de fecha a ISO format
    """
    meses = {
        'enero': '01', 'febrero': '02', 'marzo': '03', 'abril': '04',
        'mayo': '05', 'junio': '06', 'julio': '07', 'agosto': '08',
        'septiembre': '09', 'octubre': '10', 'noviembre': '11', 'diciembre': '12'
    }
    
    try:
        # Formato ISO directo
        if 'T' in fecha_str or '-' in fecha_str:
            return datetime.fromisoformat(fecha_str.replace('Z', '+00:00')).isoformat()
        
        # Formato "21 de noviembre de 2024"
        for mes, num in meses.items():
            if mes in fecha_str.lower():
                fecha_str = fecha_str.lower().replace(mes, num)
                match = re.search(r'(\d{1,2})\s+de\s+(\d{2})\s+de\s+(\d{4})', fecha_str)
                if match:
                    dia, mes_num, año = match.groups()
                    return f"{año}-{mes_num.zfill(2)}-{dia.zfill(2)}T00:00:00"
        
        # Formato "21/11/2024"
        match = re.search(r'(\d{1,2})/(\d{1,2})/(\d{4})', fecha_str)
        if match:
            dia, mes, año = match.groups()
            return f"{año}-{mes.zfill(2)}-{dia.zfill(2)}T00:00:00"
        
    except:
        pass
    
    return datetime.now().isoformat()


# -------------------------------------
# 4. EXTRAER RESUMEN DETALLADO
# -------------------------------------

def extraer_resumen(item, titulo, fuente):
    """
    Extrae un resumen más completo y detallado
    Busca en múltiples elementos HTML
    Si no encuentra nada, genera uno basado en el título
    """
    resumen = ""
    
    # Buscar en diferentes elementos comunes
    selectores = [
        "p.summary",
        "p.description", 
        "p.excerpt",
        "div.article-lead",
        "div.article-summary",
        "div.teaser-text",
        "p",  # párrafo genérico como último recurso
    ]
    
    for selector in selectores:
        elemento = item.select_one(selector)
        if elemento:
            texto = elemento.get_text(strip=True)
            if len(texto) > 50:  # Solo si tiene contenido sustancial
                resumen = texto
                break
    
    # Si encontramos múltiples párrafos, combinarlos
    if not resumen or len(resumen) < 100:
        parrafos = item.find_all("p", limit=3)
        textos = [p.get_text(strip=True) for p in parrafos if len(p.get_text(strip=True)) > 30]
        if textos:
            resumen = " ".join(textos)
    
    # Limpiar y limitar tamaño
    resumen = resumen.strip()
    if len(resumen) > 500:
        resumen = resumen[:497] + "..."
    
    # Si no hay resumen, generar uno basado en el título
    if not resumen or len(resumen) < 20:
        resumen = generar_resumen_del_titulo(titulo, fuente)
    
    return resumen


def generar_resumen_del_titulo(titulo, fuente):
    """
    Genera un resumen contextual basado en el título
    cuando no hay descripción disponible
    """
    # Detectar tipo de noticia por palabras clave
    titulo_lower = titulo.lower()
    
    if any(palabra in titulo_lower for palabra in ["gana", "victoria", "triunfo", "campeonato", "partido"]):
        return f"{titulo}. Cobertura completa del evento deportivo en {fuente}."
    
    elif any(palabra in titulo_lower for palabra in ["presidente", "gobierno", "ministro", "congreso", "elecciones"]):
        return f"{titulo}. Análisis político y contexto de la situación en {fuente}."
    
    elif any(palabra in titulo_lower for palabra in ["mercado", "economía", "dólar", "inflación", "bolsa"]):
        return f"{titulo}. Detalles económicos y análisis de mercado en {fuente}."
    
    elif any(palabra in titulo_lower for palabra in ["muere", "fallece", "muerte", "víctima"]):
        return f"{titulo}. Información sobre el acontecimiento reportado por {fuente}."
    
    elif any(palabra in titulo_lower for palabra in ["estrena", "lanza", "presenta", "nuevo", "nueva"]):
        return f"{titulo}. Conoce más detalles sobre este lanzamiento en {fuente}."
    
    elif any(palabra in titulo_lower for palabra in ["alerta", "emergencia", "desastre", "terremoto", "incendio"]):
        return f"{titulo}. Información actualizada sobre la emergencia en {fuente}."
    
    elif any(palabra in titulo_lower for palabra in ["tecnología", "app", "smartphone", "google", "apple", "ai"]):
        return f"{titulo}. Cobertura tecnológica completa en {fuente}."
    
    else:
        # Resumen genérico pero más informativo
        return f"{titulo}. Noticia reportada por {fuente} con información actualizada sobre el tema."


# -------------------------------------
# 5. GUARDAR EN SUPABASE
# -------------------------------------

def guardar_noticia_supabase(noticia):
    try:
        id_unico = hashlib.md5(noticia["enlace"].encode()).hexdigest()

        noticia["id"] = id_unico
        noticia["es_premium"] = False

        # 1. Revisar si ya existe
        existe = supabase.table("noticias").select("id").eq("id", id_unico).execute()

        if existe.data:
            return False  # ya estaba, no guardar

        # 2. Guardar noticia nueva
        supabase.table("noticias").insert(noticia).execute()

        return True

    except Exception as e:
        print("Error guardando noticia:", e)
        return False


# -------------------------------------
# 6. SCRAPER SELENIUM GENÉRICO (ULTRA ROBUSTO)
# -------------------------------------

def scraper_selenium(url, fuente, pais="US"):
    driver = crear_driver()

    print(f"Cargando {fuente} ...")
    driver.get(url)
    time.sleep(3)

    # =====================================================
    # 🔥 SCROLL INFINITO
    # =====================================================
    scrolls = 35
    last_height = driver.execute_script("return document.body.scrollHeight")

    print("Haciendo scroll infinito...")

    for i in range(scrolls):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2.2)

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

            # ---------- RESUMEN (MEJORADO) ----------
            resumen = extraer_resumen(item, titulo, fuente)

            # ---------- FECHA DE PUBLICACIÓN (REAL) ----------
            fecha_publicacion = extraer_fecha_publicacion(item, soup)

            # ---------- CATEGORÍA / PAÍS ----------
            texto_completo = (titulo + " " + resumen).lower()
            categoria_auto = clasificar_categoria(texto_completo)
            pais_auto = detectar_pais(texto_completo)

            # ---------- AGREGAR NOTICIA ----------
            noticias.append({
                "titulo": titulo,
                "enlace": enlace,
                "resumen": resumen,
                "fuente": fuente,
                "pais": pais_auto,
                "categoria": categoria_auto,
                "imagen": imagen,
                "fecha_publicacion": fecha_publicacion,
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
# 7. LISTA DE PORTALES
# -------------------------------------

PORTALES = [
    ("BBC", "https://www.bbc.com/", "UK"),
    ("BBC", "https://www.bbc.com/news", "UK"),
    ("BBC", "https://www.bbc.com/sport", "UK"),
    ("BBC", "https://www.bbc.com/business", "UK"),
    ("BBC", "https://www.bbc.com/innovation", "UK"),
    ("BBC", "https://www.bbc.com/culture", "UK"),
    ("BBC", "https://www.bbc.com/arts", "UK"),
    ("BBC", "https://www.bbc.com/travel", "UK"),
    ("BBC", "https://www.bbc.com/future-planet", "UK"),

    ("Clarin", "https://www.clarin.com/", "US"),
    ("Clarin", "https://www.clarin.com/ultimo-momento", "US"),
    ("Clarin", "https://www.clarin.com/politica", "US"),
    ("Clarin", "https://www.clarin.com/economia", "US"),
    ("Clarin", "https://www.clarin.com/rural", "US"),
    ("Clarin", "https://www.clarin.com/sociedad", "US"),
    ("Clarin", "https://www.clarin.com/mundo", "US"),
    ("Clarin", "https://www.clarin.com/deportes", "US"),
    ("Clarin", "https://www.clarin.com/espectaculos", "US"),
    ("Clarin", "https://www.clarin.com/80-aniversario", "US"),

    ("Yahoo", "https://es-us.noticias.yahoo.com/", "US"),
    ("Yahoo", "https://es-us.noticias.yahoo.com/america-latina/", "US"),
    ("Yahoo", "https://es-us.noticias.yahoo.com/estados-unidos/", "US"),
    ("Yahoo", "https://es-us.noticias.yahoo.com/deportes/", "US"),

    ("El Mundo", "https://www.elmundo.es/", "ES"),
    ("El Mundo", "https://www.elmundo.es/ultimas-noticias.html", "ES"),
    ("El Mundo", "https://www.mundoamerica.com/", "ES"),
    ("El Mundo", "hhttps://www.elmundo.es/metropoli.html", "ES"),
    ("El Mundo", "https://www.elmundo.es/cronica.html", "ES"),
    ("El Mundo", "https://www.elmundo.es/yodona.html", "ES"),
    ("El Mundo", "https://www.elmundo.es/papel.html", "ES"),
    ("El Mundo", "https://www.elmundo.es/madrid.html", "ES"),
    ("El Mundo", "https://www.elmundo.es/loc.html", "ES"),
    ("El Mundo", "https://www.elmundo.es/vida-sana.html", "ES"),
    ("El Mundo ", "https://www.elmundo.es/motor.html", "ES"),
    ("El Mundo", "https://www.elmundo.es/ciencia-y-salud/medio-ambiente.html", "ES"),
    ("El Mundo", "https://www.elmundo.es/espana/encuestas.html", "ES"),
    ("El Mundo", "https://www.elmundo.es/la-lectura.html", "ES"),
    ("El Mundo", "https://www.elmundo.es/tecnologia.html", "ES"),

    ("Infobae", "https://www.infobae.com/salud/", "ES"),
    ("Infobae", "https://www.infobae.com/tendencias/", "MX"),
    ("Infobae ", "https://www.infobae.com/cultura/", "PE"),
    ("Infobae ", "https://www.infobae.com/tag/peru-politica/", "ES"),
    ("Infobae ", "https://www.infobae.com/tag/peru-gastronomia/", "MX"),
    ("Infobae ", "https://www.infobae.com/tag/peru-economia/", "PE"),
    ("Infobae ", "https://www.infobae.com/tag/peru-actualidad/", "ES"),
    ("Infobae ", "https://www.infobae.com/tag/peru-entretenimiento/", "MX"),
    ("Infobae ", "https://www.infobae.com/tag/peru-turismo/", "PE"),
    ("Infobae ", "https://www.infobae.com/peru/ultimas-noticias/", "ES"),
    ("Infobae ", "https://www.infobae.com/america/", "MX"),
    ("Infobae ", "https://www.infobae.com/peru/", "PE"),
    ("Infobae ", "https://www.infobae.com/mexico/", "ES"),
    ("Infobae ", "https://www.infobae.com/espana/", "MX"),
    ("Infobae ", "https://www.infobae.com/colombia/", "PE"),
    ("Infobae ", "https://www.infobae.com/?noredirect", "ES"),
    ("Infobae ", "https://www.infobae.com/malditos-nerds/", "MX"),

    ("El Cultural", "https://www.elespanol.com/el-cultural/", "PE"),
    ("El Cultural", "https://www.elespanol.com/ultimas/?utm_cmp_rs=trends", "PE"),
    ("El Cultural", "https://www.elespanol.com/deportes/", "PE"),
    ("El Cultural", "https://www.elespanol.com/ciencia/", "PE"),
    ("El Cultural", "https://www.elespanol.com/mundo/", "PE"),
    ("El Cultural", "https://www.elespanol.com/sociedad/", "PE"),
    ("El Cultural", "https://www.elespanol.com/espana/", "ES"),

    ("El Diario", "https://www.eldiario.es/", "ES"),
    ("El Diario", "https://www.eldiario.es/politica/", "ES"),
    ("El Diario", "https://www.eldiario.es/internacional/", "ES"),
    ("El Diario", "https://www.eldiario.es/economia/", "ES"),
    ("El Diario", "https://www.eldiario.es/cultura/", "ES"),
    ("El Diario", "https://www.eldiario.es/tecnologia/", "ES"),
]


# -------------------------------------
# 8. EJECUTAR SCRAPING COMPLETO
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
            if guardar_noticia_supabase(n):
                nuevas += 1

        total_global += nuevas

        print(f"✔ {nombre}: {nuevas} noticias nuevas guardadas")

    print("\n================================")
    print("SCRAPING COMPLETO - Total nuevas:", total_global)
    print("================================")


if __name__ == "__main__":
    ejecutar_scraping()