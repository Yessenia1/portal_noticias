# 🚀 MANUAL DE DESPLIEGUE - NewsPortal AI

## Portal de Agregación de Noticias con Inteligencia Artificial

**Versión:** 1.0
**Fecha:** Noviembre 2025
**Autor:** Equipo NewsPortal AI

---

## 📑 TABLA DE CONTENIDOS

1. [Introducción](#1-introducción)
2. [Arquitectura del Sistema](#2-arquitectura-del-sistema)
3. [Requisitos Previos](#3-requisitos-previos)
4. [Configuración del Entorno de Desarrollo](#4-configuración-del-entorno-de-desarrollo)
5. [Instalación del Backend](#5-instalación-del-backend)
6. [Configuración de la Base de Datos](#6-configuración-de-la-base-de-datos)
7. [Instalación del Frontend](#7-instalación-del-frontend)
8. [Configuración de Variables de Entorno](#8-configuración-de-variables-de-entorno)
9. [Ejecución en Local](#9-ejecución-en-local)
10. [Despliegue en Producción](#10-despliegue-en-producción)
11. [Configuración de Firebase Hosting](#11-configuración-de-firebase-hosting)
12. [Despliegue del Backend](#12-despliegue-del-backend)
13. [Configuración de Scraping Automatizado](#13-configuración-de-scraping-automatizado)
14. [Monitoreo y Logs](#14-monitoreo-y-logs)
15. [Mantenimiento y Actualizaciones](#15-mantenimiento-y-actualizaciones)
16. [Backup y Recuperación](#16-backup-y-recuperación)
17. [Seguridad](#17-seguridad)
18. [Troubleshooting](#18-troubleshooting)
19. [Scripts Útiles](#19-scripts-útiles)
20. [Checklist de Despliegue](#20-checklist-de-despliegue)

---

## 1. INTRODUCCIÓN

### 1.1 Propósito del Documento

Este manual proporciona instrucciones detalladas para el despliegue de NewsPortal AI, una aplicación web de agregación de noticias que consta de:

- **Frontend:** Aplicación web estática (HTML, CSS, JavaScript)
- **Backend:** API REST en Python/Flask con scraping automatizado
- **Base de datos:** Supabase (PostgreSQL)
- **Hosting:** Firebase Hosting (frontend) y servidor dedicado (backend)

### 1.2 Audiencia

Este documento está dirigido a:
- Desarrolladores backend y frontend
- Ingenieros DevOps
- Administradores de sistemas
- Personal técnico responsable del mantenimiento

### 1.3 Convenciones

**Símbolos utilizados:**
- ✅ Paso completado exitosamente
- ⚠️ Advertencia o precaución
- 🔧 Configuración requerida
- 📝 Nota informativa
- 🚨 Crítico - requiere atención inmediata
- 💡 Consejo o buena práctica

**Formato de comandos:**
```bash
# Comandos de terminal se muestran así
comando ejemplo
```

```python
# Código Python se muestra así
print("Ejemplo")
```

---

## 2. ARQUITECTURA DEL SISTEMA

### 2.1 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                         USUARIOS                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    FIREBASE HOSTING                          │
│                  (Frontend Estático)                         │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  index.html  │  │ dashboard.js │  │   main.js    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTPS
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE (PostgreSQL)                     │
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │              Tabla: noticias                      │       │
│  │  - id, titulo, resumen, enlace, imagen           │       │
│  │  - fuente, categoria, pais                       │       │
│  │  - fecha_publicacion, fecha_subida               │       │
│  └──────────────────────────────────────────────────┘       │
└──────────────────────┬──────────────────────────────────────┘
                       ▲
                       │
                       │ API REST
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                    BACKEND SERVER                            │
│                   (Python/Flask)                             │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  scraper.py  │  │   app.py     │  │api_server.py │      │
│  │  (Selenium)  │  │ (Scheduler)  │  │   (Flask)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │ dv.py (Clima)│  │scraper_      │                         │
│  │              │  │premium.py    │                         │
│  └──────────────┘  └──────────────┘                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Web Scraping
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   FUENTES DE NOTICIAS                        │
│                                                               │
│  BBC • Clarín • El Mundo • Yahoo • Infobae • El Diario      │
└─────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                    APIS EXTERNAS                             │
│                                                               │
│  ┌──────────────┐                                            │
│  │ Open-Meteo   │  (Datos meteorológicos)                   │
│  │     API      │                                            │
│  └──────────────┘                                            │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Componentes Principales

#### Frontend (Cliente)
- **Tecnología:** HTML5, CSS3 (Tailwind), JavaScript ES6+
- **Hosting:** Firebase Hosting
- **Características:**
  - SPA (Single Page Application) con hash routing
  - Autenticación vía localStorage
  - Integración con Supabase directamente
  - Responsive design

#### Backend (Servidor)
- **Tecnología:** Python 3.9+, Flask
- **Componentes:**
  - **scraper.py:** Motor de scraping con Selenium y BeautifulSoup
  - **app.py:** API Flask con scheduler para scraping automático
  - **api_server.py:** API REST para scraping bajo demanda
  - **dv.py:** Scraper de datos meteorológicos
  - **scraper_premium.py:** Scraping específico para usuarios premium

#### Base de Datos
- **Servicio:** Supabase (PostgreSQL as a Service)
- **Tabla principal:** `noticias`
- **Características:**
  - API REST automática
  - Autenticación integrada
  - Real-time subscriptions (opcional)

#### APIs Externas
- **Open-Meteo:** Datos meteorológicos (gratuito, sin API key)
- **Supabase REST API:** Consultas a la base de datos

### 2.3 Flujo de Datos

**1. Scraping Automático (Diario)**
```
Scheduler (app.py)
    ↓
Ejecuta scraper.py a las 5:00 AM
    ↓
Selenium + BeautifulSoup extraen noticias
    ↓
Procesa: título, resumen, imagen, categoría, país
    ↓
Inserta en Supabase (tabla noticias)
```

**2. Scraping Manual (Premium)**
```
Usuario Premium → Click en botón "Scrapear"
    ↓
Frontend → POST /api/actualizar
    ↓
Backend ejecuta scraper específico
    ↓
Retorna cantidad de noticias agregadas
    ↓
Frontend recarga datos de Supabase
```

**3. Visualización de Noticias**
```
Usuario → Accede a NewsPortal AI (Firebase Hosting)
    ↓
Frontend → SELECT * FROM noticias (Supabase API)
    ↓
Procesa y normaliza datos (categorías, países, fechas)
    ↓
Renderiza cards de noticias
    ↓
Usuario → Aplica filtros, búsqueda, favoritos
```

**4. Widget de Clima**
```
Usuario Premium → Selecciona ubicación
    ↓
Frontend → GET https://api.open-meteo.com/v1/forecast
    ↓
Recibe temperatura, viento, condición
    ↓
Actualiza widget con datos en tiempo real
```

---

## 3. REQUISITOS PREVIOS

### 3.1 Software Requerido

#### Para Desarrollo y Despliegue Local

| Software | Versión Mínima | Versión Recomendada | Enlace de Descarga |
|----------|----------------|---------------------|-------------------|
| **Python** | 3.9 | 3.11+ | https://www.python.org/downloads/ |
| **pip** | 21.0 | Latest | Incluido con Python |
| **Node.js** | 16.x | 18.x LTS | https://nodejs.org/ |
| **npm** | 8.x | Latest | Incluido con Node.js |
| **Git** | 2.30+ | Latest | https://git-scm.com/ |
| **Chrome/Chromium** | 90+ | Latest | Para Selenium |
| **ChromeDriver** | Automático | Automático | Via webdriver-manager |

#### Para Producción (Adicionales)

| Software | Propósito |
|----------|-----------|
| **Gunicorn** | Servidor WSGI para Flask |
| **Nginx** | Reverse proxy y servidor web |
| **Supervisor/systemd** | Gestión de procesos |
| **Firebase CLI** | Despliegue de frontend |

### 3.2 Cuentas y Servicios Necesarios

✅ **Cuenta de Supabase**
- Crear proyecto en: https://supabase.com/
- Plan gratuito es suficiente para desarrollo
- Obtener: URL del proyecto y API Key (anon/public)

✅ **Cuenta de Firebase**
- Crear proyecto en: https://console.firebase.google.com/
- Habilitar Firebase Hosting
- Obtener credenciales de autenticación (opcional)

✅ **(Opcional) Cuenta de Firebase Admin**
- Para autenticación avanzada
- Descargar archivo JSON de credenciales

### 3.3 Recursos de Hardware

#### Desarrollo Local
- **CPU:** Dual-core 2.0 GHz+
- **RAM:** 8 GB mínimo (16 GB recomendado)
- **Disco:** 10 GB disponibles
- **Conexión:** Banda ancha estable (5 Mbps+)

#### Producción (Servidor Backend)
- **CPU:** 2-4 vCPUs
- **RAM:** 4-8 GB
- **Disco:** 20-50 GB SSD
- **Conexión:** 100 Mbps+
- **OS:** Ubuntu 20.04/22.04 LTS o similar

### 3.4 Conocimientos Previos

**Esenciales:**
- Python básico
- Comandos de terminal/bash
- Git básico
- HTML/CSS/JavaScript

**Recomendados:**
- Flask framework
- PostgreSQL
- APIs REST
- Selenium/Web Scraping
- Conceptos de hosting y deployment

---

## 4. CONFIGURACIÓN DEL ENTORNO DE DESARROLLO

### 4.1 Clonar el Repositorio

#### Opción 1: Clonar desde Git (si existe repositorio)

```bash
# Navegar a la carpeta deseada
cd ~/proyectos

# Clonar el repositorio
git clone https://github.com/tu-usuario/newsportal-ai.git

# Entrar al directorio
cd newsportal-ai
```

#### Opción 2: Crear desde cero con la estructura existente

```bash
# Crear directorio del proyecto
mkdir newsportal-ai
cd newsportal-ai

# Crear estructura de carpetas
mkdir -p backend-scraper
mkdir -p frontend-web/public
mkdir -p frontend-web/public/js
```

### 4.2 Estructura de Directorios

La estructura final debe verse así:

```
newsportal-ai/
│
├── backend-scraper/
│   ├── .env                          # Variables de entorno (NO subir a Git)
│   ├── requirements.txt              # Dependencias Python
│   ├── scraper.py                    # Motor principal de scraping
│   ├── app.py                        # Flask app con scheduler
│   ├── api_server.py                 # API REST para scraping manual
│   ├── scraper_premium.py            # Scraping premium
│   ├── dv.py                         # Scraper de clima
│   └── noticias-firebase.json        # Credenciales Firebase Admin (NO subir)
│
├── frontend-web/
│   └── public/
│       ├── index.html                # Página principal
│       ├── dashboard.html            # Dashboard admin
│       ├── index_premium.html        # Vista premium
│       ├── 404.html                  # Página de error
│       └── js/
│           ├── main.js               # Lógica principal
│           └── dashboard.js          # Lógica del dashboard
│
├── firebase.json                     # Configuración de Firebase Hosting
├── .gitignore                        # Archivos a ignorar en Git
├── MANUAL_DE_USUARIO.md             # Manual de usuario
├── MANUAL_DE_DESPLIEGUE.md          # Este documento
└── README.md                         # Documentación general
```

### 4.3 Configurar Git (Opcional pero Recomendado)

```bash
# Inicializar repositorio Git
git init

# Crear archivo .gitignore
cat > .gitignore << 'EOF'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Entorno virtual
venv/
ENV/
.venv

# Variables de entorno
.env
*.env

# Credenciales
*-firebase-adminsdk-*.json
credentials.json
service-account.json

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
*.log
logs/

# OS
.DS_Store
Thumbs.db

# Node modules (si usas Node)
node_modules/
package-lock.json

# Firebase
.firebase/
firebase-debug.log
EOF

# Hacer primer commit
git add .
git commit -m "Initial commit: NewsPortal AI structure"
```

### 4.4 Configurar Entorno Virtual de Python

```bash
# Navegar a la carpeta del backend
cd backend-scraper

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate

# En Linux/Mac:
source venv/bin/activate

# Verificar que está activo (debe aparecer (venv) al inicio del prompt)
which python  # Linux/Mac
where python  # Windows
```

📝 **Nota:** Siempre active el entorno virtual antes de trabajar con Python.

---

## 5. INSTALACIÓN DEL BACKEND

### 5.1 Instalar Dependencias de Python

```bash
# Asegurarse de estar en backend-scraper/ con venv activado
cd backend-scraper
source venv/bin/activate  # o venv\Scripts\activate en Windows

# Instalar todas las dependencias
pip install -r requirements.txt
```

Si no tienes el archivo `requirements.txt`, créalo con este contenido:

```txt
# Firebase
firebase-admin==6.2.0

# Web Scraping
selenium==4.15.0
beautifulsoup4==4.12.2
webdriver-manager==4.0.1
requests==2.31.0

# NLP y Análisis de Texto
textblob==0.17.1
sumy==0.11.0
nltk==3.8.1

# API Backend
flask==3.0.0
flask-cors==4.0.0

# Utilidades
python-dotenv==1.0.0

# Supabase
supabase==2.0.0

# Scheduler
APScheduler==3.10.4

# Servidor WSGI (Producción)
gunicorn==21.2.0
```

Luego instala:

```bash
pip install -r requirements.txt
```

### 5.2 Verificar Instalación de ChromeDriver

El paquete `webdriver-manager` descarga automáticamente ChromeDriver. Verifica:

```bash
# Ejecutar Python
python

# En el intérprete de Python:
>>> from selenium import webdriver
>>> from webdriver_manager.chrome import ChromeDriverManager
>>> driver = webdriver.Chrome(ChromeDriverManager().install())
>>> driver.quit()
>>> exit()
```

Si no hay errores, ChromeDriver está correctamente instalado.

### 5.3 Descargar Recursos de NLTK (Para Análisis de Texto)

```bash
# Ejecutar Python
python

# En el intérprete:
>>> import nltk
>>> nltk.download('punkt')
>>> nltk.download('stopwords')
>>> exit()
```

### 5.4 Estructura de Archivos del Backend

Asegúrate de tener estos archivos en `backend-scraper/`:

**1. scraper.py**
- Motor principal de scraping con Selenium
- Funciones: crear_driver(), scrapear_portal(), ejecutar_scraping_completo()

**2. app.py**
- Aplicación Flask con scheduler (APScheduler)
- Ejecuta scraping automático diario a las 5:00 AM
- Endpoint: POST /api/actualizar (scraping bajo demanda)

**3. api_server.py**
- API REST para scraping manual premium
- Endpoints adicionales si es necesario

**4. dv.py**
- Scraper de datos meteorológicos (si se usa)

**5. scraper_premium.py**
- Lógica de scraping específica para usuarios premium

---

## 6. CONFIGURACIÓN DE LA BASE DE DATOS

### 6.1 Crear Proyecto en Supabase

1. Ve a https://supabase.com/
2. Haz clic en **"Start your project"**
3. Inicia sesión con GitHub o crea una cuenta
4. Clic en **"New project"**
5. Completa:
   - **Organization:** Crea una nueva o usa existente
   - **Name:** `newsportal-ai` (o el nombre que prefieras)
   - **Database Password:** Genera una contraseña segura (¡guárdala!)
   - **Region:** Selecciona el más cercano (ej: South America - São Paulo)
   - **Pricing Plan:** Free (para desarrollo)
6. Clic en **"Create new project"**
7. Espera 1-2 minutos mientras se provisiona la base de datos

### 6.2 Obtener Credenciales de Supabase

Una vez creado el proyecto:

1. En el dashboard de Supabase, ve a **Settings** (⚙️) → **API**
2. Copia y guarda:
   - **Project URL:** `https://xxxxxxxxxxxxx.supabase.co`
   - **Project API keys:**
     - **anon public:** (clave pública, para frontend)
     - **service_role:** (clave secreta, para backend) ⚠️ NO compartir

**📸 CAPTURA 1:** Dashboard de Supabase mostrando Settings → API

### 6.3 Crear Tabla de Noticias

#### Opción 1: Usando el Editor SQL de Supabase

1. En el dashboard de Supabase, ve a **SQL Editor**
2. Clic en **"New query"**
3. Pega el siguiente SQL:

```sql
-- Crear tabla noticias
CREATE TABLE noticias (
  id BIGSERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  resumen TEXT,
  enlace TEXT UNIQUE NOT NULL,
  imagen TEXT,
  fuente TEXT,
  categoria TEXT,
  pais TEXT,
  fecha_publicacion TIMESTAMPTZ,
  fecha_subida TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crear índices para mejorar rendimiento
CREATE INDEX idx_noticias_fuente ON noticias(fuente);
CREATE INDEX idx_noticias_categoria ON noticias(categoria);
CREATE INDEX idx_noticias_pais ON noticias(pais);
CREATE INDEX idx_noticias_fecha_publicacion ON noticias(fecha_publicacion DESC);
CREATE INDEX idx_noticias_fecha_subida ON noticias(fecha_subida DESC);

-- Habilitar RLS (Row Level Security) - Opcional
ALTER TABLE noticias ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública
CREATE POLICY "Permitir lectura pública"
  ON noticias
  FOR SELECT
  USING (true);

-- Política para permitir inserción solo con service_role
CREATE POLICY "Permitir inserción con service_role"
  ON noticias
  FOR INSERT
  WITH CHECK (true);
```

4. Clic en **"Run"**
5. Verifica que aparezca: "Success. No rows returned"

**📸 CAPTURA 2:** SQL Editor con la query de creación de tabla

#### Opción 2: Usando el Table Editor

1. Ve a **Table Editor**
2. Clic en **"Create a new table"**
3. Configura:
   - **Name:** `noticias`
   - **Enable Row Level Security:** ✅ (opcional)
4. Agrega columnas manualmente:

| Column Name | Type | Default Value | Primary | Nullable |
|-------------|------|---------------|---------|----------|
| id | int8 | Auto-increment | ✅ | ❌ |
| titulo | text | - | ❌ | ❌ |
| resumen | text | - | ❌ | ✅ |
| enlace | text | - | ❌ | ❌ |
| imagen | text | - | ❌ | ✅ |
| fuente | text | - | ❌ | ✅ |
| categoria | text | - | ❌ | ✅ |
| pais | text | - | ❌ | ✅ |
| fecha_publicacion | timestamptz | - | ❌ | ✅ |
| fecha_subida | timestamptz | now() | ❌ | ✅ |

5. Clic en **"Save"**

### 6.4 Verificar Tabla Creada

1. Ve a **Table Editor**
2. Verás la tabla `noticias` en la lista
3. Clic en ella para ver la estructura
4. Debe estar vacía inicialmente (0 rows)

**📸 CAPTURA 3:** Table Editor mostrando la tabla `noticias` vacía

### 6.5 Configurar Políticas de Seguridad (RLS)

Si habilitaste Row Level Security:

**Para lectura pública (usuarios no autenticados pueden leer):**

```sql
CREATE POLICY "public_read"
ON noticias
FOR SELECT
USING (true);
```

**Para escritura solo desde backend (con service_role key):**

```sql
-- No necesitas política adicional, el service_role bypasses RLS
```

### 6.6 Probar Conexión desde Backend

Crea un archivo de prueba `test_supabase.py`:

```python
from supabase import create_client, Client

SUPABASE_URL = "https://tu-proyecto.supabase.co"
SUPABASE_KEY = "tu-service-role-key"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Intentar insertar una noticia de prueba
try:
    data = supabase.table('noticias').insert({
        "titulo": "Noticia de Prueba",
        "resumen": "Esta es una prueba de conexión",
        "enlace": "https://ejemplo.com/test",
        "imagen": "https://via.placeholder.com/400x300",
        "fuente": "Test",
        "categoria": "General",
        "pais": "Internacional"
    }).execute()

    print("✅ Conexión exitosa!")
    print("Datos insertados:", data)
except Exception as e:
    print("❌ Error:", e)
```

Ejecuta:

```bash
python test_supabase.py
```

Si ves "✅ Conexión exitosa!", la base de datos está lista.

---

## 7. INSTALACIÓN DEL FRONTEND

### 7.1 Estructura del Frontend

El frontend es una aplicación estática, no requiere compilación. Solo necesitas los archivos HTML, CSS y JS.

```
frontend-web/
└── public/
    ├── index.html           # Página principal
    ├── dashboard.html       # Dashboard (si es separado)
    ├── index_premium.html   # Vista premium (si es separado)
    ├── 404.html             # Página de error
    └── js/
        ├── main.js          # Lógica principal
        └── dashboard.js     # Lógica del dashboard
```

### 7.2 Verificar Archivos Frontend

Asegúrate de que `index.html` contenga:

1. **Configuración de Supabase:**

```javascript
const supabaseUrl = 'https://bziuhbswzpcqduitponw.supabase.co';
const supabaseKey = 'eyJhbGci...'; // Tu anon/public key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);
```

2. **Importación de librerías:**

```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Supabase JS -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- ApexCharts (para gráficos) -->
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
```

3. **Scripts propios:**

```html
<script src="js/dashboard.js"></script>
<script type="module" src="js/main.js"></script>
```

### 7.3 Configurar Firebase CLI

Si vas a desplegar en Firebase Hosting:

```bash
# Instalar Firebase CLI globalmente
npm install -g firebase-tools

# Verificar instalación
firebase --version

# Iniciar sesión en Firebase
firebase login

# Inicializar proyecto (si no está inicializado)
cd ~/proyectos/newsportal-ai
firebase init hosting

# Responde a las preguntas:
# - What do you want to use as your public directory? → frontend-web/public
# - Configure as a single-page app? → No (o Yes si prefieres)
# - Set up automatic builds? → No
# - File frontend-web/public/index.html already exists. Overwrite? → No
```

Esto creará `firebase.json` y `.firebaserc`.

### 7.4 Archivo firebase.json

Verifica que contenga:

```json
{
  "hosting": {
    "public": "frontend-web/public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

---

## 8. CONFIGURACIÓN DE VARIABLES DE ENTORNO

### 8.1 Crear Archivo .env (Backend)

En `backend-scraper/`, crea el archivo `.env`:

```bash
cd backend-scraper
touch .env  # Linux/Mac
# o
type nul > .env  # Windows
```

Edita `.env` con tu editor favorito:

```env
# Supabase
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-service-role-key-aqui

# Firebase Admin (opcional, si usas Firebase Auth)
FIREBASE_CREDENTIALS_PATH=noticias-firebase-adminsdk.json

# Flask
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=genera-una-clave-secreta-aleatoria

# Scraping
SCRAPING_HOUR=5
SCRAPING_MINUTE=0
HEADLESS_MODE=True

# API
API_PORT=5000
API_HOST=0.0.0.0
CORS_ORIGINS=*
```

⚠️ **IMPORTANTE:** Nunca subas el archivo `.env` a Git. Verifica que esté en `.gitignore`.

### 8.2 Generar Clave Secreta para Flask

```bash
# En Python
python -c "import secrets; print(secrets.token_hex(32))"

# Copia el resultado y pégalo en SECRET_KEY del .env
```

### 8.3 Configurar Credenciales de Firebase Admin (Opcional)

Si usas Firebase Authentication:

1. Ve a Firebase Console → Project Settings → Service Accounts
2. Clic en **"Generate new private key"**
3. Descarga el archivo JSON
4. Renómbralo a `noticias-firebase-adminsdk.json`
5. Colócalo en `backend-scraper/`
6. Asegúrate de que esté en `.gitignore`

**📸 CAPTURA 4:** Firebase Console mostrando Service Accounts

### 8.4 Cargar Variables de Entorno en Python

En tus scripts de Python, agrega al inicio:

```python
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Usar variables
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')
```

---

## 9. EJECUCIÓN EN LOCAL

### 9.1 Ejecutar el Backend (Scraper)

#### Opción 1: Ejecutar Scraper Manualmente

```bash
cd backend-scraper
source venv/bin/activate  # Activar entorno virtual

# Ejecutar scraper una sola vez
python scraper.py
```

Esto ejecutará el scraping de todos los portales configurados y guardará las noticias en Supabase.

**Salida esperada:**

```
Supabase conectado
Iniciando scraping de BBC Home...
Scraping de BBC Home completado: 25 noticias agregadas
Iniciando scraping de Clarín...
Scraping de Clarín completado: 18 noticias agregadas
...
✅ Scraping completo. Total: 150 noticias agregadas
```

#### Opción 2: Ejecutar Flask App con Scheduler

```bash
cd backend-scraper
source venv/bin/activate

# Ejecutar aplicación Flask
python app.py
```

Esto iniciará:
- Servidor Flask en `http://localhost:5000`
- Scheduler que ejecutará scraping automático diariamente a las 5:00 AM

**Salida esperada:**

```
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in production.
 * Running on http://0.0.0.0:5000
Press CTRL+C to quit
Scheduler iniciado. Próxima ejecución: 2025-11-29 05:00:00
```

#### Opción 3: Ejecutar API Server (Scraping Manual)

```bash
cd backend-scraper
source venv/bin/activate

# Ejecutar API server
python api_server.py
```

Esto inicia un servidor Flask para scraping bajo demanda (usuario premium).

**Probar endpoint:**

```bash
# Desde otra terminal
curl -X POST http://localhost:5000/api/actualizar
```

### 9.2 Ejecutar el Frontend Localmente

#### Opción 1: Servidor HTTP Simple con Python

```bash
cd frontend-web/public

# Python 3
python -m http.server 8000

# Abre en navegador:
# http://localhost:8000
```

#### Opción 2: Live Server (VS Code Extension)

1. Instala la extensión "Live Server" en VS Code
2. Abre `frontend-web/public/index.html` en VS Code
3. Clic derecho → "Open with Live Server"
4. Se abrirá automáticamente en `http://127.0.0.1:5500`

#### Opción 3: Firebase Emulator

```bash
cd ~/proyectos/newsportal-ai

# Servir localmente con Firebase
firebase serve

# Abre en navegador:
# http://localhost:5000
```

### 9.3 Probar la Aplicación Completa

1. **Backend corriendo:** `http://localhost:5000` (Flask)
2. **Frontend corriendo:** `http://localhost:8000` (HTTP Server)

**Flujo de prueba:**

1. Abre el frontend en el navegador
2. Deberías ver la página principal con noticias cargadas desde Supabase
3. Prueba:
   - Registro de usuario
   - Login
   - Búsqueda de noticias
   - Filtros (país, fuente, fecha)
   - Categorías
   - Favoritos (si eres premium)
   - Dashboard admin (si usas admin@portal.com)

**📸 CAPTURA 5:** Frontend local mostrando noticias cargadas

**📸 CAPTURA 6:** Terminal mostrando backend Flask corriendo

### 9.4 Debugging

**Ver logs del backend:**

```bash
# Los logs aparecen en la terminal donde ejecutaste Flask
# Agrega prints para debugging:
print(f"Datos recibidos: {data}")
```

**Ver logs del frontend:**

1. Abre DevTools en el navegador (F12)
2. Ve a la pestaña "Console"
3. Verás logs de JavaScript, errores, y mensajes de debug

**📸 CAPTURA 7:** DevTools Console mostrando logs del frontend

---

## 10. DESPLIEGUE EN PRODUCCIÓN

### 10.1 Preparación Pre-Despliegue

**Checklist:**

- [ ] Todas las funcionalidades probadas en local
- [ ] Variables de entorno configuradas correctamente
- [ ] Credenciales de producción listas (Supabase, Firebase)
- [ ] `.gitignore` actualizado (no subir .env, credenciales)
- [ ] Código comentado y documentado
- [ ] Tests ejecutados (si existen)
- [ ] Backup de base de datos (si tiene datos importantes)

### 10.2 Opciones de Hosting

#### Frontend

| Opción | Costo | Pros | Contras |
|--------|-------|------|---------|
| **Firebase Hosting** | Gratis (10 GB/mes) | Fácil, rápido, CDN global | Limitado a sitios estáticos |
| **Netlify** | Gratis (100 GB/mes) | CI/CD automático, forms | - |
| **Vercel** | Gratis | Muy rápido, optimizado | - |
| **GitHub Pages** | Gratis | Integrado con Git | Sin HTTPS custom |
| **AWS S3 + CloudFront** | ~$1-5/mes | Escalable, profesional | Configuración compleja |

**Recomendación:** Firebase Hosting (ya configurado)

#### Backend

| Opción | Costo | Pros | Contras |
|--------|-------|------|---------|
| **Heroku** | $7-25/mes | Fácil despliegue | Caro a largo plazo |
| **Railway** | Gratis (500 hrs/mes) | Simple, moderno | Limitado en plan gratis |
| **Render** | Gratis (512 MB RAM) | Free tier generoso | Puede dormir |
| **AWS EC2** | $5-20/mes | Control total, escalable | Requiere configuración |
| **DigitalOcean Droplet** | $6-12/mes | Balance precio/control | Requiere setup manual |
| **Google Cloud Run** | Pay-as-you-go | Serverless, escala auto | Curva de aprendizaje |
| **PythonAnywhere** | $5/mes | Específico para Python | Limitaciones de paquetes |

**Recomendación:** Railway o Render para inicio, DigitalOcean/AWS para escalabilidad.

---

## 11. CONFIGURACIÓN DE FIREBASE HOSTING

### 11.1 Preparar para Despliegue

```bash
cd ~/proyectos/newsportal-ai

# Verificar que firebase.json existe
cat firebase.json

# Debe contener:
# {
#   "hosting": {
#     "public": "frontend-web/public",
#     ...
#   }
# }
```

### 11.2 Configurar Claves de Producción en Frontend

Edita `frontend-web/public/index.html` y actualiza:

```javascript
// Configuración de Supabase (PRODUCCIÓN)
const supabaseUrl = 'https://bziuhbswzpcqduitponw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Tu ANON PUBLIC key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);
```

⚠️ **IMPORTANTE:** Usa la clave **anon/public** (no service_role) en el frontend.

### 11.3 Desplegar a Firebase Hosting

```bash
# Asegurarte de estar logueado
firebase login

# Ver proyectos disponibles
firebase projects:list

# Seleccionar proyecto (si tienes múltiples)
firebase use tu-proyecto-id

# Desplegar
firebase deploy --only hosting
```

**Salida esperada:**

```
=== Deploying to 'newsportal-ai'...

i  deploying hosting
i  hosting[newsportal-ai]: beginning deploy...
i  hosting[newsportal-ai]: found 5 files in frontend-web/public
✔  hosting[newsportal-ai]: file upload complete
i  hosting[newsportal-ai]: finalizing version...
✔  hosting[newsportal-ai]: version finalized
i  hosting[newsportal-ai]: releasing new version...
✔  hosting[newsportal-ai]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/newsportal-ai/overview
Hosting URL: https://newsportal-ai.web.app
```

**📸 CAPTURA 8:** Terminal mostrando despliegue exitoso en Firebase

### 11.4 Verificar Despliegue

1. Abre la URL de hosting en tu navegador: `https://tu-proyecto.web.app`
2. Verifica que la aplicación carga correctamente
3. Prueba todas las funcionalidades principales
4. Revisa la consola del navegador (F12) para errores

**📸 CAPTURA 9:** Aplicación desplegada en Firebase Hosting

### 11.5 Configurar Dominio Personalizado (Opcional)

1. Ve a Firebase Console → Hosting
2. Clic en **"Add custom domain"**
3. Ingresa tu dominio (ej: `www.newsportal.com`)
4. Sigue las instrucciones para configurar DNS:
   - Tipo A: Apunta a la IP de Firebase
   - O CNAME: Apunta a tu-proyecto.web.app
5. Espera propagación DNS (puede tardar hasta 24 horas)
6. Firebase automáticamente provee certificado SSL

**📸 CAPTURA 10:** Firebase Console mostrando dominio personalizado

---

## 12. DESPLIEGUE DEL BACKEND

### 12.1 Preparar Servidor (Opción: DigitalOcean Droplet)

#### Crear Droplet

1. Ve a https://www.digitalocean.com/
2. Clic en **"Create" → "Droplets"**
3. Selecciona:
   - **Image:** Ubuntu 22.04 LTS
   - **Plan:** Basic ($6/mes - 1 GB RAM)
   - **Datacenter:** Región más cercana
   - **Authentication:** SSH Key (recomendado) o Password
   - **Hostname:** newsportal-backend
4. Clic en **"Create Droplet"**
5. Anota la IP pública del droplet

**📸 CAPTURA 11:** DigitalOcean Droplet creado

#### Conectar al Servidor

```bash
# Desde tu terminal local
ssh root@tu-ip-publica

# O si usaste SSH key:
ssh -i ~/.ssh/id_rsa root@tu-ip-publica
```

### 12.2 Configuración Inicial del Servidor

```bash
# Actualizar paquetes
apt update && apt upgrade -y

# Instalar dependencias del sistema
apt install -y python3 python3-pip python3-venv git nginx supervisor

# Instalar Chrome y ChromeDriver (para Selenium)
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
apt update
apt install -y google-chrome-stable

# Verificar instalación de Chrome
google-chrome --version
```

### 12.3 Clonar Repositorio en el Servidor

```bash
# Crear directorio para la aplicación
mkdir -p /var/www
cd /var/www

# Clonar repositorio (ajusta la URL)
git clone https://github.com/tu-usuario/newsportal-ai.git
cd newsportal-ai/backend-scraper
```

Si no usas Git, puedes subir archivos con SCP:

```bash
# Desde tu máquina local
scp -r backend-scraper/ root@tu-ip:/var/www/newsportal-ai/
```

### 12.4 Configurar Entorno Virtual en el Servidor

```bash
cd /var/www/newsportal-ai/backend-scraper

# Crear entorno virtual
python3 -m venv venv

# Activar entorno virtual
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Desactivar entorno virtual
deactivate
```

### 12.5 Configurar Variables de Entorno en el Servidor

```bash
cd /var/www/newsportal-ai/backend-scraper

# Crear archivo .env
nano .env

# Pega el contenido:
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-service-role-key
FLASK_ENV=production
FLASK_DEBUG=False
SECRET_KEY=tu-clave-secreta-de-produccion
SCRAPING_HOUR=5
SCRAPING_MINUTE=0
HEADLESS_MODE=True
API_PORT=5000
API_HOST=0.0.0.0
CORS_ORIGINS=https://tu-proyecto.web.app

# Guardar: Ctrl+O, Enter, Ctrl+X
```

### 12.6 Configurar Gunicorn (Servidor WSGI)

Crea un archivo `wsgi.py` en `backend-scraper/`:

```python
# /var/www/newsportal-ai/backend-scraper/wsgi.py

from app import app

if __name__ == "__main__":
    app.run()
```

Prueba Gunicorn:

```bash
cd /var/www/newsportal-ai/backend-scraper
source venv/bin/activate

# Ejecutar con Gunicorn
gunicorn --bind 0.0.0.0:5000 wsgi:app

# Si funciona, detén con Ctrl+C
```

### 12.7 Configurar Supervisor (Gestión de Procesos)

Supervisor mantiene tu aplicación corriendo, incluso después de reiniciar el servidor.

```bash
# Crear archivo de configuración
nano /etc/supervisor/conf.d/newsportal-backend.conf

# Pega el contenido:
[program:newsportal-backend]
command=/var/www/newsportal-ai/backend-scraper/venv/bin/gunicorn --workers 3 --bind 0.0.0.0:5000 wsgi:app
directory=/var/www/newsportal-ai/backend-scraper
user=root
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stderr_logfile=/var/log/newsportal-backend.err.log
stdout_logfile=/var/log/newsportal-backend.out.log
environment=PATH="/var/www/newsportal-ai/backend-scraper/venv/bin"

# Guardar: Ctrl+O, Enter, Ctrl+X
```

Activar Supervisor:

```bash
# Recargar configuración
supervisorctl reread
supervisorctl update

# Iniciar aplicación
supervisorctl start newsportal-backend

# Verificar estado
supervisorctl status

# Debería mostrar:
# newsportal-backend    RUNNING   pid 12345, uptime 0:00:10
```

**📸 CAPTURA 12:** Supervisor mostrando aplicación corriendo

### 12.8 Configurar Nginx (Reverse Proxy)

Nginx redirige tráfico HTTP/HTTPS a tu aplicación Flask.

```bash
# Crear archivo de configuración
nano /etc/nginx/sites-available/newsportal-backend

# Pega el contenido:
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;  # O usa tu IP

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Guardar: Ctrl+O, Enter, Ctrl+X
```

Activar sitio:

```bash
# Crear enlace simbólico
ln -s /etc/nginx/sites-available/newsportal-backend /etc/nginx/sites-enabled/

# Verificar configuración
nginx -t

# Debería mostrar:
# nginx: configuration file /etc/nginx/nginx.conf test is successful

# Reiniciar Nginx
systemctl restart nginx
```

Verificar que Nginx está corriendo:

```bash
systemctl status nginx

# Debería mostrar: active (running)
```

### 12.9 Configurar Firewall

```bash
# Permitir SSH (puerto 22)
ufw allow 22

# Permitir HTTP (puerto 80)
ufw allow 80

# Permitir HTTPS (puerto 443)
ufw allow 443

# Habilitar firewall
ufw enable

# Verificar reglas
ufw status
```

### 12.10 Configurar SSL/HTTPS con Let's Encrypt (Opcional pero Recomendado)

```bash
# Instalar Certbot
apt install -y certbot python3-certbot-nginx

# Obtener certificado SSL
certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# Sigue las instrucciones:
# - Ingresa tu email
# - Acepta términos
# - Selecciona: Redirect HTTP to HTTPS (opción 2)

# Certbot automáticamente configurará Nginx para HTTPS
```

Renovación automática:

```bash
# Probar renovación
certbot renew --dry-run

# Certbot automáticamente crea un cron job para renovar cada 90 días
```

**📸 CAPTURA 13:** Certificado SSL instalado exitosamente

### 12.11 Probar Backend en Producción

```bash
# Desde tu máquina local
curl http://tu-ip-publica/

# O si configuraste dominio:
curl https://tu-dominio.com/

# Para probar endpoint de scraping:
curl -X POST https://tu-dominio.com/api/actualizar
```

Si recibes una respuesta JSON, ¡el backend está corriendo correctamente!

**📸 CAPTURA 14:** Respuesta exitosa del backend en producción

---

## 13. CONFIGURACIÓN DE SCRAPING AUTOMATIZADO

### 13.1 Verificar Scheduler de APScheduler

El archivo `app.py` ya incluye un scheduler con APScheduler que ejecuta el scraping diariamente.

Verifica que contenga:

```python
from apscheduler.schedulers.background import BackgroundScheduler
import atexit

def tarea_scraping_diario():
    print(f"--- ⏰ INICIO DE TAREA DE SCRAPING DIARIO: {datetime.now()} ---")
    ejecutar_scraping_completo()
    print(f"--- ⏰ FIN DE TAREA DE SCRAPING DIARIO ---")

scheduler = BackgroundScheduler()
scheduler.add_job(
    func=tarea_scraping_diario,
    trigger="cron",
    hour=5,  # 5:00 AM
    minute=0
)
scheduler.start()
atexit.register(lambda: scheduler.shutdown())
```

### 13.2 Opción Alternativa: Cron Job del Sistema

Si prefieres usar cron del sistema operativo:

```bash
# Editar crontab
crontab -e

# Agregar línea (ejecuta scraper.py diariamente a las 5:00 AM):
0 5 * * * cd /var/www/newsportal-ai/backend-scraper && /var/www/newsportal-ai/backend-scraper/venv/bin/python scraper.py >> /var/log/scraper.log 2>&1

# Guardar y salir
```

Explicación:
- `0 5 * * *`: Ejecuta a las 5:00 AM todos los días
- `cd ...`: Navega al directorio del proyecto
- `venv/bin/python`: Usa el Python del entorno virtual
- `>> /var/log/scraper.log`: Guarda logs
- `2>&1`: Redirige errores también al log

Verificar cron jobs:

```bash
crontab -l
```

**📸 CAPTURA 15:** Cron job configurado

### 13.3 Verificar Logs de Scraping

```bash
# Ver logs de Supervisor
tail -f /var/log/newsportal-backend.out.log

# Ver logs de cron (si usas cron)
tail -f /var/log/scraper.log

# Ver logs del sistema
tail -f /var/log/syslog | grep scraper
```

### 13.4 Ejecutar Scraping Manual desde el Servidor

```bash
cd /var/www/newsportal-ai/backend-scraper
source venv/bin/activate
python scraper.py
```

Esto ejecutará el scraping inmediatamente, útil para:
- Poblar la base de datos inicialmente
- Verificar que el scraper funciona en producción
- Debugging

---

## 14. MONITOREO Y LOGS

### 14.1 Logs del Backend (Flask/Gunicorn)

**Ver logs en tiempo real:**

```bash
# Logs de Supervisor (stdout)
tail -f /var/log/newsportal-backend.out.log

# Logs de Supervisor (stderr)
tail -f /var/log/newsportal-backend.err.log

# Logs de Nginx (acceso)
tail -f /var/log/nginx/access.log

# Logs de Nginx (errores)
tail -f /var/log/nginx/error.log
```

**📸 CAPTURA 16:** Terminal mostrando logs del backend

### 14.2 Logs del Scraper

Si usas APScheduler (dentro de Flask), los logs aparecerán en:

```bash
tail -f /var/log/newsportal-backend.out.log
```

Si usas cron job separado:

```bash
tail -f /var/log/scraper.log
```

### 14.3 Configurar Rotación de Logs (Logrotate)

Para evitar que los logs crezcan indefinidamente:

```bash
# Crear configuración de logrotate
nano /etc/logrotate.d/newsportal

# Pega el contenido:
/var/log/newsportal-backend.*.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    create 0640 root root
    sharedscripts
    postrotate
        supervisorctl restart newsportal-backend > /dev/null
    endscript
}

/var/log/scraper.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 root root
}

# Guardar: Ctrl+O, Enter, Ctrl+X
```

Probar configuración:

```bash
logrotate -d /etc/logrotate.d/newsportal
```

### 14.4 Monitoreo de Recursos del Servidor

**CPU y RAM:**

```bash
# Monitoreo en tiempo real
htop

# O si no tienes htop:
top

# Ver uso de memoria
free -h

# Ver uso de disco
df -h
```

**📸 CAPTURA 17:** htop mostrando recursos del servidor

**Verificar procesos de Python:**

```bash
ps aux | grep python

# Debería mostrar procesos de Gunicorn
```

### 14.5 Configurar Alertas (Opcional)

**Opción 1: UptimeRobot (Gratis)**

1. Regístrate en https://uptimerobot.com/
2. Agrega monitor:
   - Type: HTTP(s)
   - URL: https://tu-dominio.com/
   - Interval: 5 minutes
3. Configura alertas por email

**Opción 2: HealthChecks.io (Gratis)**

1. Regístrate en https://healthchecks.io/
2. Crea check para scraping diario
3. Agrega al final de tu script:

```python
import requests

# Al final de ejecutar_scraping_completo()
try:
    requests.get("https://hc-ping.com/tu-uuid-aqui")
except:
    pass
```

---

## 15. MANTENIMIENTO Y ACTUALIZACIONES

### 15.1 Actualizar Código del Backend

```bash
# Conectar al servidor
ssh root@tu-ip

# Navegar al proyecto
cd /var/www/newsportal-ai

# Hacer pull de cambios (si usas Git)
git pull origin main

# Activar entorno virtual
cd backend-scraper
source venv/bin/activate

# Instalar dependencias nuevas (si hay)
pip install -r requirements.txt

# Reiniciar aplicación
supervisorctl restart newsportal-backend

# Verificar estado
supervisorctl status
```

### 15.2 Actualizar Frontend

```bash
# Desde tu máquina local
cd ~/proyectos/newsportal-ai

# Hacer cambios en frontend-web/public/

# Desplegar a Firebase
firebase deploy --only hosting
```

Firebase automáticamente actualiza el sitio y limpia caché.

### 15.3 Actualizar Base de Datos (Migraciones)

Si necesitas agregar columnas o modificar la estructura:

```sql
-- Conectar a Supabase Dashboard → SQL Editor

-- Ejemplo: Agregar columna "vistas"
ALTER TABLE noticias ADD COLUMN vistas INTEGER DEFAULT 0;

-- Crear índice
CREATE INDEX idx_noticias_vistas ON noticias(vistas DESC);
```

⚠️ **IMPORTANTE:** Haz backup antes de modificar la estructura.

### 15.4 Backup de Base de Datos

**Backup automático de Supabase:**

Supabase hace backups automáticos diarios en el plan gratuito (retención de 7 días).

**Backup manual:**

1. Ve a Supabase Dashboard → Database → Backups
2. Clic en **"Create backup"**

**Backup con pg_dump (desde servidor):**

```bash
# Instalar PostgreSQL client
apt install -y postgresql-client

# Obtener connection string de Supabase Dashboard
export DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Hacer backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Comprimir
gzip backup_$(date +%Y%m%d).sql
```

**📸 CAPTURA 18:** Supabase Dashboard mostrando backups

### 15.5 Restaurar Base de Datos

```bash
# Descomprimir backup
gunzip backup_20251128.sql.gz

# Restaurar
psql $DATABASE_URL < backup_20251128.sql
```

---

## 16. BACKUP Y RECUPERACIÓN

### 16.1 Estrategia de Backup

**Qué respaldar:**

| Componente | Frecuencia | Método | Ubicación |
|------------|------------|--------|-----------|
| Base de datos | Diaria | pg_dump | Almacenamiento externo (S3, Dropbox) |
| Código backend | Con cada cambio | Git | GitHub/GitLab |
| Código frontend | Con cada cambio | Git | GitHub/GitLab |
| Variables .env | Mensual | Copia encriptada | Almacenamiento seguro local |
| Credenciales Firebase | Una vez | Copia encriptada | Almacenamiento seguro local |
| Logs | Semanal | Logrotate | Servidor local (rotación automática) |

### 16.2 Script de Backup Automatizado

Crea `backup.sh` en el servidor:

```bash
#!/bin/bash
# /var/www/newsportal-ai/backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/newsportal"
DB_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Crear directorio si no existe
mkdir -p $BACKUP_DIR

# Backup de base de datos
echo "Iniciando backup de base de datos..."
pg_dump $DB_URL | gzip > $BACKUP_DIR/db_backup_$DATE.sql.gz

# Backup de código
echo "Iniciando backup de código..."
tar -czf $BACKUP_DIR/code_backup_$DATE.tar.gz /var/www/newsportal-ai/backend-scraper

# Backup de .env (encriptado)
echo "Iniciando backup de .env..."
openssl enc -aes-256-cbc -salt -in /var/www/newsportal-ai/backend-scraper/.env -out $BACKUP_DIR/env_backup_$DATE.enc -k TU_PASSWORD_SECRETO

# Eliminar backups antiguos (más de 30 días)
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete
find $BACKUP_DIR -name "*.enc" -mtime +30 -delete

echo "Backup completado: $BACKUP_DIR"
```

Hacer ejecutable:

```bash
chmod +x /var/www/newsportal-ai/backup.sh
```

Agregar a cron (backup diario a las 2:00 AM):

```bash
crontab -e

# Agregar:
0 2 * * * /var/www/newsportal-ai/backup.sh >> /var/log/backup.log 2>&1
```

### 16.3 Sincronizar Backups a la Nube

**Opción 1: Amazon S3**

```bash
# Instalar AWS CLI
apt install -y awscli

# Configurar credenciales
aws configure

# Sincronizar backups
aws s3 sync /var/backups/newsportal s3://tu-bucket/newsportal-backups/
```

**Opción 2: Dropbox**

```bash
# Instalar Dropbox Uploader
curl "https://raw.githubusercontent.com/andreafabrizi/Dropbox-Uploader/master/dropbox_uploader.sh" -o /usr/local/bin/dropbox_uploader.sh
chmod +x /usr/local/bin/dropbox_uploader.sh

# Configurar
dropbox_uploader.sh

# Subir backup
dropbox_uploader.sh upload /var/backups/newsportal/*.gz /newsportal-backups/
```

**Opción 3: Rclone (Multi-cloud)**

```bash
# Instalar rclone
curl https://rclone.org/install.sh | sudo bash

# Configurar (soporta Google Drive, Dropbox, OneDrive, etc.)
rclone config

# Sincronizar
rclone sync /var/backups/newsportal remote:newsportal-backups
```

### 16.4 Plan de Recuperación ante Desastres

**Escenario 1: Pérdida total del servidor**

1. Provisionar nuevo servidor
2. Instalar dependencias (Python, Nginx, etc.)
3. Clonar repositorio desde Git
4. Restaurar base de datos desde backup
5. Configurar variables de entorno
6. Iniciar servicios

**Tiempo estimado:** 1-2 horas

**Escenario 2: Corrupción de base de datos**

1. Detener scraper (evitar más inserciones)
2. Obtener backup más reciente
3. Restaurar base de datos
4. Verificar integridad de datos
5. Reiniciar servicios

**Tiempo estimado:** 30 minutos

**Escenario 3: Frontend caído (Firebase)**

1. Verificar estado de Firebase (https://status.firebase.google.com/)
2. Si Firebase está operativo, redesplegar:
   ```bash
   firebase deploy --only hosting
   ```
3. Si Firebase está caído, considerar host alternativo temporal (Netlify, Vercel)

**Tiempo estimado:** 15-30 minutos

---

## 17. SEGURIDAD

### 17.1 Checklist de Seguridad

**Backend:**

- [ ] Variables de entorno en `.env`, no hardcodeadas
- [ ] `.env` en `.gitignore` (nunca subir a Git)
- [ ] Credenciales Firebase Admin protegidas
- [ ] API key de Supabase (service_role) solo en backend
- [ ] CORS configurado correctamente (solo dominios autorizados)
- [ ] Rate limiting en endpoints críticos
- [ ] Validación de inputs en API
- [ ] HTTPS habilitado (certificado SSL)
- [ ] Firewall configurado (solo puertos necesarios)
- [ ] Actualizaciones de seguridad del OS aplicadas

**Frontend:**

- [ ] Solo usar API key pública de Supabase (anon/public)
- [ ] No exponer credenciales sensibles en código JS
- [ ] HTTPS habilitado en Firebase Hosting
- [ ] Validación de inputs en formularios
- [ ] Protección contra XSS (escapar HTML)
- [ ] Content Security Policy configurada

**Base de Datos:**

- [ ] Row Level Security (RLS) habilitado
- [ ] Políticas de acceso configuradas
- [ ] Backups automáticos activos
- [ ] Contraseña de admin fuerte
- [ ] Solo conexiones desde IPs autorizadas (si es posible)

### 17.2 Configurar CORS en Flask

Edita `app.py`:

```python
from flask_cors import CORS

app = Flask(__name__)

# Configurar CORS solo para tu dominio
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://tu-proyecto.web.app", "https://tu-dominio.com"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"]
    }
})
```

### 17.3 Implementar Rate Limiting

Instala Flask-Limiter:

```bash
pip install Flask-Limiter
```

Agrega a `app.py`:

```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

@app.route('/api/actualizar', methods=['POST'])
@limiter.limit("10 per hour")  # Máximo 10 scraping por hora
def actualizar_ahora():
    # ...
```

### 17.4 Validar Tokens de Usuario (Premium)

Para verificar que el usuario que llama a la API es Premium:

```python
from firebase_admin import auth

@app.route('/api/actualizar', methods=['POST'])
def actualizar_ahora():
    # Obtener token del header
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({"error": "No autorizado"}), 401

    try:
        # Verificar token con Firebase Admin
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token['uid']

        # Verificar que el usuario es premium (lógica personalizada)
        # ...

        # Ejecutar scraping
        resultado = ejecutar_scraping_completo()
        return jsonify(resultado)
    except Exception as e:
        return jsonify({"error": "Token inválido"}), 401
```

### 17.5 Proteger Archivos Sensibles

```bash
# Permisos restrictivos para .env
chmod 600 /var/www/newsportal-ai/backend-scraper/.env

# Permisos restrictivos para credenciales Firebase
chmod 600 /var/www/newsportal-ai/backend-scraper/noticias-firebase.json

# Solo root puede leer
chown root:root /var/www/newsportal-ai/backend-scraper/.env
```

### 17.6 Habilitar Fail2Ban (Protección contra Fuerza Bruta)

```bash
# Instalar Fail2Ban
apt install -y fail2ban

# Configurar para proteger SSH y Nginx
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
nano /etc/fail2ban/jail.local

# Habilitar:
[sshd]
enabled = true
port = 22
maxretry = 3
bantime = 3600

[nginx-http-auth]
enabled = true
port = http,https
maxretry = 5
bantime = 3600

# Reiniciar Fail2Ban
systemctl restart fail2ban

# Ver bans activos
fail2ban-client status
```

### 17.7 Actualizar Sistema Regularmente

```bash
# Configurar actualizaciones automáticas de seguridad
apt install -y unattended-upgrades
dpkg-reconfigure --priority=low unattended-upgrades

# Actualizar manualmente
apt update && apt upgrade -y
```

---

## 18. TROUBLESHOOTING

### 18.1 Problemas Comunes del Backend

#### Problema: "ModuleNotFoundError: No module named 'X'"

**Causa:** Dependencia no instalada o entorno virtual no activado.

**Solución:**

```bash
# Activar entorno virtual
source venv/bin/activate

# Reinstalar dependencias
pip install -r requirements.txt

# Verificar instalación
pip list | grep nombre-modulo
```

---

#### Problema: "selenium.common.exceptions.WebDriverException: Message: 'chromedriver' executable needs to be in PATH"

**Causa:** ChromeDriver no encontrado.

**Solución:**

```bash
# En el código, asegúrate de usar webdriver-manager:
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(ChromeDriverManager().install())
```

---

#### Problema: "Connection refused" al conectar a Supabase

**Causa:** Credenciales incorrectas o problemas de red.

**Solución:**

```bash
# Verificar variables de entorno
echo $SUPABASE_URL
echo $SUPABASE_KEY

# Probar conexión con curl
curl -X GET "$SUPABASE_URL/rest/v1/noticias?select=*" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY"

# Si funciona, el problema está en el código Python
```

---

#### Problema: Backend no responde en producción

**Solución:**

```bash
# Verificar que Gunicorn está corriendo
supervisorctl status

# Si está parado:
supervisorctl start newsportal-backend

# Ver logs de errores
tail -f /var/log/newsportal-backend.err.log

# Verificar que Nginx está corriendo
systemctl status nginx

# Reiniciar Nginx si es necesario
systemctl restart nginx
```

---

### 18.2 Problemas Comunes del Frontend

#### Problema: "Supabase is not defined"

**Causa:** Librería de Supabase no cargada.

**Solución:**

Verifica que en `index.html` tienes:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
  // Después de cargar la librería:
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
</script>
```

---

#### Problema: Noticias no se cargan en el frontend

**Causa:** Error en la consulta a Supabase o problema de CORS.

**Solución:**

1. Abre DevTools (F12) → Console
2. Busca errores relacionados con Supabase
3. Verifica que la API key es correcta (anon/public)
4. Prueba la consulta manualmente:

```javascript
// En la consola del navegador:
const { data, error } = await supabase.from('noticias').select('*').limit(10);
console.log(data, error);
```

---

#### Problema: "ERR_BLOCKED_BY_RESPONSE" o problemas de CORS

**Causa:** Supabase bloqueando peticiones por CORS o RLS.

**Solución:**

1. Ve a Supabase Dashboard → Authentication → Policies
2. Asegúrate de tener política de lectura pública:

```sql
CREATE POLICY "public_read"
ON noticias
FOR SELECT
USING (true);
```

3. Verifica en Supabase Dashboard → Settings → API que CORS está habilitado para tu dominio

---

### 18.3 Problemas de Scraping

#### Problema: Selenium no encuentra elementos

**Causa:** Selectores CSS incorrectos o contenido dinámico cargado con JavaScript.

**Solución:**

```python
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Esperar a que el elemento cargue
wait = WebDriverWait(driver, 10)
elemento = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'selector')))
```

---

#### Problema: "TimeoutException" al scrapear

**Causa:** Página tarda mucho en cargar.

**Solución:**

```python
# Aumentar timeout
driver.set_page_load_timeout(60)  # 60 segundos

# O usar try-except
try:
    driver.get(url)
except TimeoutException:
    print(f"Timeout al cargar {url}, continuando...")
```

---

#### Problema: Scraper bloqueado por detección de bots

**Causa:** Sitio detecta que eres un bot.

**Solución:**

```python
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--disable-blink-features=AutomationControlled")
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option('useAutomationExtension', False)

# User agent realista
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

driver = webdriver.Chrome(options=chrome_options)
```

---

### 18.4 Problemas de Despliegue

#### Problema: Firebase deploy falla con "Error: HTTP Error: 403"

**Causa:** No tienes permisos en el proyecto de Firebase.

**Solución:**

```bash
# Volver a autenticarte
firebase logout
firebase login

# Verificar proyectos disponibles
firebase projects:list

# Seleccionar proyecto correcto
firebase use nombre-del-proyecto
```

---

#### Problema: "502 Bad Gateway" en Nginx

**Causa:** Backend (Gunicorn) no está corriendo.

**Solución:**

```bash
# Verificar estado de Gunicorn
supervisorctl status newsportal-backend

# Si está parado:
supervisorctl start newsportal-backend

# Ver logs
tail -f /var/log/newsportal-backend.err.log
```

---

### 18.5 Obtener Ayuda Adicional

**Recursos:**

- **Documentación oficial:**
  - Flask: https://flask.palletsprojects.com/
  - Supabase: https://supabase.com/docs
  - Selenium: https://selenium-python.readthedocs.io/
  - Firebase: https://firebase.google.com/docs

- **Comunidades:**
  - Stack Overflow
  - Reddit: r/Flask, r/learnpython
  - Discord de Supabase: https://discord.supabase.com/

- **Logs y Debug:**
  - Siempre revisa logs completos
  - Busca el error exacto en Google
  - Reproduce el error en local primero

---

## 19. SCRIPTS ÚTILES

### 19.1 Script de Salud del Sistema

Crea `health_check.sh`:

```bash
#!/bin/bash
# /var/www/newsportal-ai/health_check.sh

echo "=== NewsPortal AI - Health Check ==="
echo "Fecha: $(date)"
echo ""

# 1. Verificar backend
echo "[Backend]"
if supervisorctl status newsportal-backend | grep -q RUNNING; then
    echo "✅ Backend: RUNNING"
else
    echo "❌ Backend: STOPPED"
fi

# 2. Verificar Nginx
echo "[Nginx]"
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx: ACTIVE"
else
    echo "❌ Nginx: INACTIVE"
fi

# 3. Verificar conexión a Supabase
echo "[Supabase]"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SUPABASE_URL/rest/v1/noticias?select=id&limit=1" -H "apikey: $SUPABASE_KEY")
if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✅ Supabase: CONNECTED"
else
    echo "❌ Supabase: ERROR (HTTP $HTTP_CODE)"
fi

# 4. Verificar uso de disco
echo "[Disk Usage]"
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}')
echo "Uso: $DISK_USAGE"

# 5. Verificar uso de RAM
echo "[Memory Usage]"
MEM_USAGE=$(free -m | awk 'NR==2{printf "%.2f%%", $3*100/$2 }')
echo "Uso: $MEM_USAGE"

echo ""
echo "=== Fin del Health Check ==="
```

Ejecutar:

```bash
chmod +x health_check.sh
./health_check.sh
```

### 19.2 Script de Limpieza de Logs

Crea `cleanup_logs.sh`:

```bash
#!/bin/bash
# /var/www/newsportal-ai/cleanup_logs.sh

echo "Limpiando logs antiguos..."

# Eliminar logs más antiguos de 30 días
find /var/log/newsportal-backend.*.log -mtime +30 -delete
find /var/log/scraper.log -mtime +30 -delete

# Comprimir logs antiguos (7-30 días)
find /var/log/newsportal-backend.*.log -mtime +7 -mtime -30 -exec gzip {} \;

echo "Limpieza completada."
```

### 19.3 Script de Reinicio Rápido

Crea `restart_all.sh`:

```bash
#!/bin/bash
# /var/www/newsportal-ai/restart_all.sh

echo "Reiniciando todos los servicios..."

supervisorctl restart newsportal-backend
systemctl restart nginx

echo "Servicios reiniciados."
supervisorctl status
systemctl status nginx --no-pager
```

---

## 20. CHECKLIST DE DESPLIEGUE

### 20.1 Pre-Despliegue

**Backend:**
- [ ] Código probado en local
- [ ] Dependencias listadas en `requirements.txt`
- [ ] Variables de entorno configuradas en `.env`
- [ ] Credenciales de Supabase obtenidas
- [ ] ChromeDriver funcional
- [ ] Scraper ejecutado manualmente con éxito
- [ ] API Flask funcional en local

**Frontend:**
- [ ] Aplicación probada en local
- [ ] Configuración de Supabase correcta (anon key)
- [ ] Todas las páginas accesibles
- [ ] Funcionalidades críticas verificadas
- [ ] Responsividad probada (móvil, tablet, desktop)

**Base de Datos:**
- [ ] Proyecto de Supabase creado
- [ ] Tabla `noticias` creada
- [ ] Políticas de RLS configuradas
- [ ] Datos de prueba insertados

### 20.2 Despliegue del Frontend

- [ ] Firebase CLI instalado
- [ ] Login en Firebase realizado
- [ ] Proyecto de Firebase creado
- [ ] `firebase.json` configurado
- [ ] Despliegue exitoso: `firebase deploy --only hosting`
- [ ] URL de producción accesible
- [ ] Certificado SSL activo (HTTPS)
- [ ] (Opcional) Dominio personalizado configurado

### 20.3 Despliegue del Backend

- [ ] Servidor aprovisionado (DigitalOcean, AWS, etc.)
- [ ] SSH configurado y accesible
- [ ] Dependencias del sistema instaladas (Python, Chrome, etc.)
- [ ] Código subido al servidor (Git o SCP)
- [ ] Entorno virtual creado
- [ ] Dependencias Python instaladas
- [ ] Variables de entorno configuradas (`.env`)
- [ ] Gunicorn configurado
- [ ] Supervisor configurado y corriendo
- [ ] Nginx configurado como reverse proxy
- [ ] Firewall configurado (UFW)
- [ ] SSL/HTTPS configurado (Let's Encrypt)
- [ ] Backend accesible desde navegador

### 20.4 Post-Despliegue

- [ ] Pruebas end-to-end en producción
- [ ] Scraping automático configurado (cron o APScheduler)
- [ ] Logs monitoreados
- [ ] Backups configurados y probados
- [ ] Alertas de uptime configuradas
- [ ] Documentación actualizada
- [ ] Equipo notificado sobre despliegue
- [ ] Plan de rollback preparado

### 20.5 Verificación Final

**Frontend:**
- [ ] Página principal carga sin errores
- [ ] Noticias se visualizan correctamente
- [ ] Login/Registro funcional
- [ ] Filtros y búsqueda funcionan
- [ ] Favoritos funcionan (usuario premium)
- [ ] Dashboard admin accesible (solo admin)
- [ ] Widget de clima funcional (premium)
- [ ] Modo oscuro funciona

**Backend:**
- [ ] Endpoint de salud responde: `curl https://tu-dominio.com/`
- [ ] Scraping manual funciona: `curl -X POST https://tu-dominio.com/api/actualizar`
- [ ] Logs no muestran errores críticos
- [ ] Supervisor muestra estado RUNNING
- [ ] Nginx muestra estado ACTIVE

**Base de Datos:**
- [ ] Noticias se insertan correctamente
- [ ] Consultas desde frontend funcionan
- [ ] RLS funciona correctamente
- [ ] Backups automáticos activos

**Seguridad:**
- [ ] HTTPS activo en frontend y backend
- [ ] CORS configurado correctamente
- [ ] Variables sensibles no expuestas
- [ ] Firewall activo
- [ ] Fail2Ban configurado (opcional)

---

## 🎉 ¡FELICITACIONES!

Si completaste todos los pasos, tu aplicación **NewsPortal AI** está desplegada y funcionando en producción.

---

## 📞 SOPORTE Y CONTACTO

**Documentación Adicional:**
- Manual de Usuario: `MANUAL_DE_USUARIO.md`
- README del proyecto: `README.md`

**Soporte Técnico:**
- Email: soporte@newsportal.ai
- GitHub Issues: [Repositorio del proyecto]

**Mantenimiento:**
- Revisar logs semanalmente
- Actualizar dependencias mensualmente
- Verificar backups semanalmente
- Monitorear recursos del servidor diariamente

---

**Versión del Manual:** 1.0
**Última Actualización:** 28 de Noviembre de 2025
**Autor:** Equipo NewsPortal AI

© 2025 NewsPortal AI. Todos los derechos reservados.
