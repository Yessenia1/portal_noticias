# 📰 MANUAL DE USUARIO - NewsPortal AI

## Portal de Agregación de Noticias con Inteligencia Artificial

**Versión:** 1.0
**Fecha:** Noviembre 2025
**Plataforma:** Web Application

---

## 📑 TABLA DE CONTENIDOS

1. [Introducción](#1-introducción)
2. [Requisitos del Sistema](#2-requisitos-del-sistema)
3. [Acceso a la Plataforma](#3-acceso-a-la-plataforma)
4. [Registro e Inicio de Sesión](#4-registro-e-inicio-de-sesión)
5. [Interfaz Principal](#5-interfaz-principal)
6. [Navegación y Exploración de Noticias](#6-navegación-y-exploración-de-noticias)
7. [Filtros y Búsqueda](#7-filtros-y-búsqueda)
8. [Gestión de Favoritos](#8-gestión-de-favoritos)
9. [Perfil de Usuario](#9-perfil-de-usuario)
10. [Planes y Suscripciones](#10-planes-y-suscripciones)
11. [Funcionalidades Premium](#11-funcionalidades-premium)
12. [Dashboard Administrativo](#12-dashboard-administrativo)
13. [Widget de Clima](#13-widget-de-clima)
14. [Scraping Manual de Noticias](#14-scraping-manual-de-noticias)
15. [Modo Oscuro](#15-modo-oscuro)
16. [Preguntas Frecuentes](#16-preguntas-frecuentes)
17. [Solución de Problemas](#17-solución-de-problemas)
18. [Glosario](#18-glosario)

---

## 1. INTRODUCCIÓN

### 1.1 ¿Qué es NewsPortal AI?

NewsPortal AI es una plataforma web de agregación de noticias que utiliza tecnología de scraping e inteligencia artificial para recopilar, organizar y presentar noticias de múltiples fuentes internacionales en un solo lugar.

**Características principales:**
- 📰 Acceso a noticias de más de 75 fuentes internacionales
- 🔍 Sistema de búsqueda y filtrado avanzado
- ❤️ Gestión de noticias favoritas
- 📊 Dashboard administrativo con estadísticas
- 🌤️ Widget de clima en tiempo real
- 🎨 Interfaz moderna y responsiva
- 🌙 Modo oscuro/claro

### 1.2 Tipos de Usuarios

NewsPortal AI cuenta con tres tipos de usuarios:

| Tipo | Características | Funcionalidades |
|------|-----------------|-----------------|
| **Gratuito** | Acceso limitado sin costo | • Últimas 300 noticias<br>• Filtros básicos<br>• Visualización con anuncios |
| **Premium** | Suscripción mensual/anual | • Acceso ilimitado<br>• Sin anuncios<br>• Favoritos<br>• Scraping manual<br>• Widget de clima<br>• Estadísticas |
| **Administrador** | Gestión de la plataforma | • Todo lo de Premium<br>• Dashboard administrativo<br>• KPIs y gráficos<br>• Nube de palabras |

**📸 CAPTURA 1:** Pantalla de inicio mostrando las tres opciones de usuario

---

## 2. REQUISITOS DEL SISTEMA

### 2.1 Navegadores Compatibles

✅ **Navegadores recomendados:**
- Google Chrome (v90+)
- Mozilla Firefox (v88+)
- Microsoft Edge (v90+)
- Safari (v14+)
- Opera (v76+)

### 2.2 Requisitos de Hardware

- **Procesador:** Dual-core 1.6 GHz o superior
- **RAM:** 4 GB mínimo (8 GB recomendado)
- **Conexión a Internet:** Banda ancha (5 Mbps mínimo)
- **Resolución de pantalla:** 1280x720 mínimo (1920x1080 recomendado)

### 2.3 Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3 (Tailwind CSS), JavaScript (ES6+)
- **Backend:** Python (Flask), Selenium, BeautifulSoup
- **Base de datos:** Supabase (PostgreSQL)
- **APIs externas:** Open-Meteo (clima)
- **Librerías:** ApexCharts (gráficos)

---

## 3. ACCESO A LA PLATAFORMA

### 3.1 URL de Acceso

Abra su navegador web preferido e ingrese la URL de NewsPortal AI:

```
http://localhost:puerto/index.html
```

O la URL de producción proporcionada por su administrador.

### 3.2 Primera Vez en la Plataforma

Al acceder por primera vez, verá:
- Barra lateral de navegación (izquierda)
- Header con logo y controles
- Área principal con noticias
- Botón "Ingresar" (esquina superior derecha)

**📸 CAPTURA 2:** Vista completa de la pantalla de inicio sin autenticación

---

## 4. REGISTRO E INICIO DE SESIÓN

### 4.1 Crear una Cuenta Nueva

#### Paso 1: Abrir el modal de autenticación
1. Haga clic en el botón **"Ingresar"** en la esquina superior derecha
2. Se abrirá una ventana modal con dos pestañas: "Iniciar Sesión" y "Crear Cuenta"
3. Seleccione la pestaña **"Crear Cuenta"**

**📸 CAPTURA 3:** Modal de autenticación mostrando la pestaña "Crear Cuenta"

#### Paso 2: Completar el formulario de registro
1. Ingrese su **correo electrónico** en el campo "Email"
   - Debe ser un email válido (ejemplo: usuario@ejemplo.com)
   - No puede estar ya registrado en el sistema

2. Ingrese su **contraseña** en el campo "Contraseña"
   - Debe tener al menos 6 caracteres
   - Se recomienda usar letras, números y símbolos

3. Haga clic en el botón **"Registrarme"**

**📸 CAPTURA 4:** Formulario de registro completado (antes de enviar)

#### Paso 3: Confirmación
- Si el registro es exitoso, verá el mensaje: **"¡Cuenta creada exitosamente! 🎉"**
- Será redirigido automáticamente a la pestaña de "Iniciar Sesión"
- Su cuenta se crea con plan **Gratuito** por defecto

**📸 CAPTURA 5:** Mensaje de éxito después del registro

### 4.2 Iniciar Sesión

#### Paso 1: Acceder al formulario de login
1. Haga clic en el botón **"Ingresar"** en la esquina superior derecha
2. Por defecto verá la pestaña "Iniciar Sesión"

#### Paso 2: Ingresar credenciales
1. Escriba su **email** registrado
2. Escriba su **contraseña**
3. Haga clic en **"Ingresar"**

**📸 CAPTURA 6:** Formulario de inicio de sesión

#### Paso 3: Acceso exitoso
- El modal se cerrará automáticamente
- Verá su avatar y nombre en la esquina superior derecha
- El botón "Ingresar" será reemplazado por su perfil

**📸 CAPTURA 7:** Vista del header después de iniciar sesión (mostrando avatar de usuario)

### 4.3 Errores Comunes en Autenticación

| Error | Causa | Solución |
|-------|-------|----------|
| "Por favor complete todos los campos" | Campos vacíos | Complete email y contraseña |
| "Email inválido" | Formato incorrecto | Use formato: usuario@dominio.com |
| "La contraseña debe tener al menos 6 caracteres" | Contraseña muy corta | Use 6+ caracteres |
| "Este email ya está registrado" | Email duplicado | Use otro email o inicie sesión |
| "Email no registrado" | Email no existe | Verifique ortografía o regístrese |
| "Contraseña incorrecta" | Contraseña errónea | Verifique mayúsculas/minúsculas |

---

## 5. INTERFAZ PRINCIPAL

### 5.1 Barra Lateral (Sidebar)

La barra lateral izquierda contiene los elementos de navegación principales:

**Componentes (de arriba a abajo):**

1. **Logo del Portal**
   - Icono "N" en color azul
   - Identifica la aplicación

2. **Menú de Navegación**
   - 🏠 **Home:** Página principal de noticias
   - 📊 **Dashboard:** Panel administrativo (solo admin)
   - ❤️ **Favoritos:** Noticias guardadas (solo premium)
   - ⚙️ **Configuración:** Ajustes y panel admin

3. **Toggle Modo Oscuro/Claro**
   - ☀️ **Modo Claro:** Fondo blanco, texto oscuro
   - 🌙 **Modo Oscuro:** Fondo oscuro, texto claro

**📸 CAPTURA 8:** Barra lateral completa mostrando todos los iconos

**Características:**
- Posición fija (siempre visible)
- Ancho: 80px
- Tooltips al pasar el mouse
- Iconos animados con efecto hover

### 5.2 Header (Cabecera)

El header superior contiene:

**Lado izquierdo:**
- **Título de sección:** Indica la página actual (ej: "Titulares Destacados")
- **Contador global:** Muestra el total de noticias (ej: "4108 noticias")

**Centro:**
- **Barra de búsqueda** (🔍)
  - Placeholder: "Buscar artículos..."
  - Búsqueda en tiempo real

**Lado derecho:**
- **Botón de Favoritos** (❤️) - Solo premium
  - Badge con número de favoritos guardados
- **Botón de Scraping** (🔄) - Solo premium
  - Abre modal de scraping manual
- **Avatar de usuario** / **Botón "Ingresar"**
  - Si está logueado: Avatar circular con menú desplegable
  - Si no está logueado: Botón "Ingresar"

**📸 CAPTURA 9:** Header completo (usuario logueado, plan premium)

**📸 CAPTURA 10:** Header completo (usuario sin login)

### 5.3 Área de Contenido Principal

La zona central de la aplicación contiene:

**Sección de Filtros:**
- Filtros por fecha (inicio/fin)
- Filtro por país
- Filtro por fuente
- Botones: "Filtrar" y "Limpiar"

**📸 CAPTURA 11:** Sección de filtros expandida

**Sección de Categorías:**
- 8 categorías con iconos:
  - 📰 General
  - 🌍 Actualidad
  - ⚽ Deportes
  - 💰 Economía
  - 💻 Tecnología
  - 🎭 Cultura
  - 🔬 Ciencia
  - 🏛️ Política

**📸 CAPTURA 12:** Grid de categorías completo

**Titulares Destacados:**
- Cards horizontales compactas
- Muestra las 8 primeras noticias
- Incluye imagen, título, fuente, fecha

**📸 CAPTURA 13:** Sección de titulares destacados

**Grid de Noticias:**
- Cards verticales en grid de 4 columnas
- Cada card contiene:
  - Imagen de portada
  - Badge de categoría (esquina superior izquierda)
  - Botón de favorito (esquina superior derecha)
  - Título de la noticia
  - Resumen breve
  - Información: Fuente • Fecha • País
  - Botón "Leer →"

**📸 CAPTURA 14:** Grid de noticias completo (mostrar varias filas)

**Paginación:**
- Botón "← Anterior"
- Indicador de página: "Página X de Y"
- Botón "Siguiente →"

**📸 CAPTURA 15:** Controles de paginación

---

## 6. NAVEGACIÓN Y EXPLORACIÓN DE NOTICIAS

### 6.1 Visualización de Noticias

#### Cards de Noticias

Cada noticia se presenta en una tarjeta (card) con la siguiente estructura:

**Elementos visuales:**
1. **Imagen de portada** (altura 160px)
   - Si la noticia no tiene imagen, se genera una aleatoria
   - Imágenes responsive y optimizadas

2. **Badge de categoría** (esquina superior izquierda)
   - Color azul con texto blanco
   - Indica la categoría: General, Deportes, etc.

3. **Botón de favorito** (esquina superior derecha)
   - Icono de corazón
   - Vacío (❤️ outline) si no está en favoritos
   - Lleno (❤️ solid) si está en favoritos
   - Solo premium puede agregar favoritos

4. **Título de la noticia**
   - Fuente bold, tamaño grande
   - Máximo 2 líneas (truncado con "...")
   - Color azul al hacer hover

5. **Resumen**
   - Texto gris, tamaño pequeño
   - Máximo 2 líneas
   - Descripción breve de la noticia

6. **Información inferior**
   - **Fuente:** Nombre del portal (ej: BBC, Clarín)
   - **Fecha:** Formato "23 nov 2025"
   - **País:** Origen de la noticia (ej: Argentina)

7. **Botón "Leer →"**
   - Color azul
   - Abre la noticia completa en nueva pestaña
   - Link directo al sitio original

**📸 CAPTURA 16:** Una sola card de noticia en detalle (zoom)

#### Interacciones con Cards

**Hover (pasar el mouse):**
- La sombra de la card aumenta
- El título cambia a color azul
- Efecto de transición suave

**Click en corazón:**
- Si no eres premium: Muestra mensaje "Los favoritos son una función exclusiva Premium"
- Si eres premium: Agrega/quita de favoritos
- El contador de favoritos se actualiza

**Click en "Leer →":**
- Abre el artículo completo en nueva pestaña
- Navega al sitio web original de la noticia

**📸 CAPTURA 17:** Card con efecto hover (captura rápida)

### 6.2 Categorías de Noticias

NewsPortal AI organiza las noticias en 8 categorías principales:

| Categoría | Icono | Descripción | Palabras clave detectadas |
|-----------|-------|-------------|---------------------------|
| **General** | 📰 | Noticias generales sin categoría específica | Default |
| **Actualidad** | 🌍 | Eventos mundiales y noticias de última hora | mundo, internacional, actual |
| **Deportes** | ⚽ | Fútbol, tenis, olimpiadas y más | fútbol, liga, gol, mundial, tenis |
| **Economía** | 💰 | Finanzas, bolsa, mercados | bolsa, dólar, inversión, banco, PBI |
| **Tecnología** | 💻 | Tech, startups, innovación | IA, Google, Apple, software, tecnología |
| **Cultura** | 🎭 | Arte, cine, música, literatura | cine, música, libro, teatro, exposición |
| **Ciencia** | 🔬 | Descubrimientos científicos | espacio, NASA, virus, descubrimiento |
| **Política** | 🏛️ | Gobierno, elecciones, leyes | presidente, congreso, elecciones, ministro |

#### Cómo filtrar por categoría:

1. Ubique la sección **"Explorar por Categorías"** debajo de los filtros
2. Haga clic en el icono de la categoría deseada
3. El grid de noticias se filtrará automáticamente
4. La categoría seleccionada tendrá un borde azul resaltado
5. El contador global mostrará "X noticias (filtradas)"

**Para quitar el filtro:**
- Haga clic nuevamente en la misma categoría
- O haga clic en el botón "Limpiar" de la sección de filtros

**📸 CAPTURA 18:** Categorías con una seleccionada (borde azul visible)

**📸 CAPTURA 19:** Noticias filtradas por categoría "Deportes"

### 6.3 Fuentes de Noticias

NewsPortal AI recopila noticias de más de 75 fuentes internacionales:

**Principales fuentes:**

**🇬🇧 Reino Unido:**
- BBC (Home, News, Sport, Business)

**🇦🇷 Argentina:**
- Clarín (General, Último Momento, Política, Deportes)
- Infobae Perú

**🇪🇸 España:**
- El Mundo (General, Últimas Noticias)
- Infobae España
- El Diario (General, Política)

**🇲🇽 México:**
- Infobae México

**🌍 Internacional:**
- Yahoo Noticias

### 6.4 Países Cubiertos

Las noticias se clasifican automáticamente por país de origen:

- 🇵🇪 **Perú**
- 🇨🇴 **Colombia**
- 🇲🇽 **México**
- 🇨🇱 **Chile**
- 🇦🇷 **Argentina**
- 🇪🇸 **España**
- 🇬🇧 **Reino Unido**
- 🌍 **Internacional** (otros países)

**Detección automática:**
- Por fuente del portal (configuración predefinida)
- Por palabras clave en el título (ej: "Lima" → Perú)

---

## 7. FILTROS Y BÚSQUEDA

### 7.1 Barra de Búsqueda

La barra de búsqueda permite encontrar noticias específicas en tiempo real.

#### Cómo usar la búsqueda:

1. Ubique la barra de búsqueda en el **header central**
2. Haga clic en el campo de texto (icono 🔍)
3. Escriba palabras clave relacionadas con la noticia
4. Los resultados se filtrarán automáticamente mientras escribe
5. La búsqueda considera:
   - **Título** de la noticia
   - **Resumen** de la noticia

**Características:**
- ✅ Búsqueda en tiempo real (sin necesidad de presionar Enter)
- ✅ No distingue entre mayúsculas y minúsculas
- ✅ Busca coincidencias parciales
- ✅ Se combina con otros filtros activos

**Ejemplos de búsqueda:**
```
"Argentina" → Muestra noticias que contienen "Argentina"
"fútbol"    → Muestra noticias sobre fútbol
"economía"  → Muestra noticias económicas
"COVID"     → Muestra noticias sobre COVID
```

**📸 CAPTURA 20:** Barra de búsqueda con texto ingresado

**📸 CAPTURA 21:** Resultados de búsqueda filtrados

#### Para limpiar la búsqueda:
1. Borre el texto del campo de búsqueda
2. O haga clic en el botón **"Limpiar"** de la sección de filtros

### 7.2 Filtros Avanzados

La sección de filtros permite combinar múltiples criterios de búsqueda.

**📸 CAPTURA 22:** Sección completa de filtros (sin seleccionar)

#### 7.2.1 Filtro por Fecha

**Campos disponibles:**
- **Desde:** Fecha de inicio
- **Hasta:** Fecha de fin

**Cómo usar:**

1. Haga clic en el campo **"Desde"**
2. Seleccione una fecha del calendario emergente
3. Haga clic en el campo **"Hasta"**
4. Seleccione la fecha final
5. Haga clic en **"Filtrar"**

**Comportamiento:**
- Por defecto muestra noticias de los últimos 2 meses
- Solo muestra noticias publicadas entre las fechas seleccionadas
- Si solo selecciona "Desde": muestra desde esa fecha hasta hoy
- Si solo selecciona "Hasta": muestra todas las noticias hasta esa fecha

**📸 CAPTURA 23:** Calendario de fecha desplegado

**Ejemplo práctico:**
```
Desde: 01/11/2025
Hasta: 28/11/2025
Resultado: Noticias de noviembre 2025
```

#### 7.2.2 Filtro por País

**Cómo usar:**

1. Haga clic en el selector **"País"**
2. Se desplegará una lista de países disponibles
3. Seleccione el país deseado
4. Haga clic en **"Filtrar"**

**Opciones:**
- **Todos** (predeterminado - muestra todos los países)
- Perú
- Argentina
- España
- Colombia
- México
- Chile
- Reino Unido
- Internacional

**📸 CAPTURA 24:** Dropdown de países desplegado

**Nota:** La lista de países se genera dinámicamente según las noticias disponibles en la base de datos.

#### 7.2.3 Filtro por Fuente

**Cómo usar:**

1. Haga clic en el selector **"Fuente"**
2. Se desplegará una lista de fuentes disponibles
3. Seleccione la fuente deseada
4. Haga clic en **"Filtrar"**

**Opciones (ejemplos):**
- **Todas** (predeterminado)
- BBC
- Clarín
- El Mundo
- Infobae
- Yahoo
- El Diario
- (y más según disponibilidad)

**📸 CAPTURA 25:** Dropdown de fuentes desplegado

#### 7.2.4 Aplicar Filtros

Una vez que haya seleccionado sus criterios de filtrado:

1. Haga clic en el botón **"Filtrar"** (color azul)
2. El sistema procesará los filtros
3. Las noticias se actualizarán instantáneamente
4. El contador global indicará: "X noticias (filtradas)"

**Combinación de filtros:**
- Puede combinar todos los filtros simultáneamente
- Ejemplo: Fecha + País + Fuente + Búsqueda
- Los criterios se aplican con lógica AND (todos deben cumplirse)

**📸 CAPTURA 26:** Filtros aplicados (varios criterios seleccionados)

#### 7.2.5 Limpiar Filtros

Para restablecer todos los filtros a sus valores predeterminados:

1. Haga clic en el botón **"Limpiar"** (gris)
2. Todos los selectores volverán a "Todos"/"Todas"
3. Las fechas volverán a su rango predeterminado
4. La barra de búsqueda se vaciará
5. Se mostrarán todas las noticias disponibles

**📸 CAPTURA 27:** Estado después de limpiar filtros

### 7.3 Paginación

Debido a la gran cantidad de noticias, estas se dividen en páginas de **100 noticias cada una**.

#### Controles de paginación:

**Ubicación:** Parte inferior del grid de noticias

**Elementos:**
- **Botón "← Anterior":** Va a la página anterior
- **Indicador de página:** Muestra "Página X de Y"
- **Botón "Siguiente →":** Va a la página siguiente

**Comportamiento:**
- El botón "Anterior" se deshabilita en la página 1
- El botón "Siguiente" se deshabilita en la última página
- Al cambiar de página, el scroll sube automáticamente
- Los filtros se mantienen al cambiar de página

**📸 CAPTURA 28:** Controles de paginación (página intermedia)

**Ejemplo:**
```
Total de noticias: 4108
Noticias por página: 100
Total de páginas: 42

Página 1: Noticias 1-100
Página 2: Noticias 101-200
...
Página 42: Noticias 4101-4108
```

---

## 8. GESTIÓN DE FAVORITOS

### 8.1 ¿Qué son los Favoritos?

Los favoritos permiten guardar noticias de interés para leerlas más tarde. Esta es una **funcionalidad exclusiva para usuarios Premium**.

**Beneficios:**
- ✅ Acceso rápido a noticias guardadas
- ✅ Guardar ilimitado de artículos
- ✅ Sincronización en el navegador (localStorage)
- ✅ Gestión sencilla (agregar/quitar)

### 8.2 Agregar Noticias a Favoritos

#### Método 1: Desde el Grid de Noticias

1. Ubique la noticia que desea guardar
2. En la esquina superior derecha de la card, encontrará el **icono de corazón** (❤️)
3. Haga clic en el icono de corazón
4. El corazón cambiará de vacío a lleno (se coloreará)
5. El contador de favoritos en el header se actualizará

**📸 CAPTURA 29:** Card de noticia antes de agregar a favoritos (corazón vacío)

**📸 CAPTURA 30:** Card de noticia después de agregar a favoritos (corazón lleno, color rojo)

#### Método 2: Desde Titulares Destacados

1. Los titulares destacados también tienen botón de favorito
2. Haga clic en el corazón de la noticia deseada
3. Se agregará a favoritos de la misma manera

**Nota para usuarios gratuitos:**
- Si intenta agregar a favoritos siendo usuario gratuito
- Aparecerá un mensaje: **"⭐ Los favoritos son una función exclusiva Premium"**
- Se abrirá automáticamente el modal de planes

**📸 CAPTURA 31:** Mensaje de restricción para usuarios gratuitos

### 8.3 Quitar Noticias de Favoritos

Para remover una noticia de favoritos:

1. Ubique la noticia guardada (corazón lleno ❤️)
2. Haga clic nuevamente en el icono de corazón
3. El corazón volverá a estar vacío (❤️ outline)
4. El contador de favoritos disminuirá

**Confirmación:**
- No se solicita confirmación (acción reversible)
- Puede volver a agregar la noticia en cualquier momento

### 8.4 Ver Todos los Favoritos

#### Acceso a la página de Favoritos:

**Opción 1: Desde el Header**
1. Haga clic en el **botón de corazón** (❤️) en la esquina superior derecha
2. Lo llevará directamente a la página de favoritos

**Opción 2: Desde la Barra Lateral**
1. Haga clic en el **icono de corazón** en la barra lateral izquierda
2. Lo llevará a la página de favoritos

**📸 CAPTURA 32:** Página de favoritos completa (con varias noticias guardadas)

#### Elementos de la Página de Favoritos:

1. **Título:** "Mis Artículos Favoritos" con icono ❤️
2. **Contador:** "X favoritos guardados"
3. **Grid de noticias:** Cards de noticias guardadas (4 columnas)
4. **Controles:** Cada card mantiene el botón de favorito para quitar

**Características:**
- Las noticias se muestran en orden de guardado (más recientes primero)
- Puede leer las noticias haciendo clic en "Leer →"
- Puede quitar favoritos directamente desde esta página
- Si elimina todos los favoritos, verá el estado vacío

### 8.5 Estado Vacío (Sin Favoritos)

Si aún no ha guardado ninguna noticia:

**Mensaje mostrado:**
```
❤️ Aún no tienes favoritos

Presiona el corazón ❤️ en cualquier noticia
para añadirla a esta lista

[Botón: Explorar Noticias]
```

**📸 CAPTURA 33:** Página de favoritos vacía (sin noticias guardadas)

Haciendo clic en **"Explorar Noticias"**, volverá a la página principal.

### 8.6 Contador de Favoritos

**Ubicación:** Header superior derecho, sobre el icono de corazón

**Características:**
- Badge circular de color rojo
- Muestra el número total de favoritos guardados
- Se actualiza en tiempo real al agregar/quitar
- Se oculta cuando favoritos = 0

**📸 CAPTURA 34:** Badge de contador de favoritos (número visible)

### 8.7 Paywall para Usuarios Gratuitos

Si un usuario gratuito intenta acceder a la página de favoritos:

**Mensaje mostrado:**
```
🔒 Esta es una característica exclusiva de nuestro plan Premium

Actualiza tu plan para poder guardar
tus noticias favoritas

[Botón: ¡Actualizar a Premium!]
```

**📸 CAPTURA 35:** Paywall de favoritos para usuarios gratuitos

Al hacer clic en **"¡Actualizar a Premium!"**, se abre el modal de planes.

---

## 9. PERFIL DE USUARIO

### 9.1 Acceder al Perfil

Para abrir su perfil de usuario:

1. Haga clic en su **avatar circular** en la esquina superior derecha
2. Se desplegará un menú con opciones
3. Haga clic en **"Mi Perfil"**
4. Se abrirá el modal de perfil

**📸 CAPTURA 36:** Menú desplegable de usuario (opciones visibles)

**Opciones del menú desplegable:**
- Email del usuario
- Plan actual (👑 Premium o Plan Gratuito)
- **Mi Perfil** → Abre modal de perfil
- **Planes** → Abre modal de pricing
- **Cerrar Sesión** → Logout

### 9.2 Modal de Perfil

El modal de perfil permite editar información personal.

**📸 CAPTURA 37:** Modal de perfil completo (vista general)

#### Secciones del Modal:

**1. Información de la cuenta (solo lectura):**
- **Email:** Su correo electrónico registrado (no editable)
- **Plan actual:** Gratuito o Premium (con icono 👑)

**2. Nombre de usuario (editable):**
- Campo de texto para editar su nombre
- Placeholder: "Ingresa tu nombre"
- Validación: No puede estar vacío

**3. Selector de Avatar:**
- 8 opciones de emoji disponibles:
  - 👤 Usuario (predeterminado)
  - 😊 Feliz
  - 🎨 Artista
  - 🚀 Cohete
  - 🌟 Estrella
  - 🎯 Diana
  - 💼 Maletín
  - 🎮 Gamer

**Diseño:**
- Grid de 4 columnas
- Avatar seleccionado: Borde azul resaltado
- Hover: Efecto de escala y sombra

**📸 CAPTURA 38:** Selector de avatares (con uno seleccionado)

### 9.3 Editar Perfil

#### Cambiar nombre:

1. Haga clic en el campo **"Nombre de usuario"**
2. Borre el nombre actual
3. Escriba su nuevo nombre
4. Haga clic en **"Guardar Cambios"**

#### Cambiar avatar:

1. Ubique la sección **"Foto de perfil"**
2. Haga clic en el emoji que desea usar
3. El avatar seleccionado se resaltará con borde azul
4. Haga clic en **"Guardar Cambios"**

**📸 CAPTURA 39:** Editando nombre de usuario

### 9.4 Guardar Cambios

Una vez que haya editado su información:

1. Verifique que sus cambios sean correctos
2. Haga clic en el botón **"Guardar Cambios"** (azul)
3. Verá un mensaje de confirmación: **"✓ Perfil actualizado correctamente"**
4. El mensaje desaparecerá después de 3 segundos
5. El modal se cerrará automáticamente
6. Su avatar y nombre se actualizarán en toda la interfaz

**📸 CAPTURA 40:** Mensaje de éxito al guardar perfil

**Nota:** Los cambios se guardan en el almacenamiento local del navegador (localStorage).

### 9.5 Cerrar el Modal

Para cerrar el modal sin guardar cambios:

1. Haga clic en el botón **"Cancelar"** (gris)
2. O haga clic fuera del modal (en el fondo oscuro)
3. O presione la tecla **ESC** en su teclado
4. Los cambios no guardados se perderán

---

## 10. PLANES Y SUSCRIPCIONES

### 10.1 Tipos de Planes

NewsPortal AI ofrece tres planes de suscripción:

**📸 CAPTURA 41:** Modal de planes completo (mostrando los 3 planes)

#### Plan 1: Gratuito (S/ 0)

**Características:**
- ✅ Acceso a las últimas 300 noticias
- ✅ Filtros básicos (fecha, país, fuente)
- ✅ Búsqueda por palabras clave
- ❌ Con anuncios publicitarios
- ❌ Sin favoritos
- ❌ Sin estadísticas
- ❌ Sin scraping manual
- ❌ Sin widget de clima

**Ideal para:** Usuarios ocasionales que solo quieren mantenerse informados.

#### Plan 2: Mensual (S/ 29.90/mes) ⭐ MÁS POPULAR

**Características:**
- ✅ Acceso ilimitado a todas las noticias
- ✅ Sin anuncios publicitarios
- ✅ Favoritos ilimitados
- ✅ Todos los filtros avanzados
- ✅ Estadísticas de lectura
- ✅ Widget de clima en tiempo real
- ✅ Scraping manual de noticias
- ✅ Notificaciones en tiempo real

**Ideal para:** Usuarios regulares que consumen noticias diariamente.

**📸 CAPTURA 42:** Card del plan Mensual (resaltado como "Más Popular")

#### Plan 3: Anual (S/ 299/año)

**Características:**
- ✅ Todo lo del plan Mensual
- ✅ Acceso prioritario a nuevas funciones
- ✅ Estadísticas detalladas y avanzadas
- ✅ Notificaciones personalizadas
- ✅ Soporte prioritario
- 💰 **Ahorro:** S/ 59.80 vs plan mensual

**Cálculo del ahorro:**
```
Plan Mensual x 12 meses: S/ 29.90 × 12 = S/ 358.80
Plan Anual:               S/ 299.00
Ahorro:                   S/ 59.80 (16.7%)
```

**Ideal para:** Usuarios profesionales y entusiastas de las noticias.

### 10.2 Comparativa de Planes

| Característica | Gratuito | Mensual | Anual |
|----------------|----------|---------|-------|
| **Precio** | S/ 0 | S/ 29.90/mes | S/ 299/año |
| **Noticias disponibles** | 300 últimas | Ilimitado | Ilimitado + Prioritario |
| **Anuncios** | Sí | No | No |
| **Favoritos** | No | Sí (ilimitado) | Sí (ilimitado) |
| **Filtros** | Básicos | Todos | Todos |
| **Estadísticas** | No | Sí | Sí (detalladas) |
| **Widget Clima** | No | Sí | Sí |
| **Scraping Manual** | No | Sí | Sí |
| **Notificaciones** | No | Sí (tiempo real) | Sí (personalizadas) |
| **Soporte** | Estándar | Estándar | Prioritario |

### 10.3 Actualizar a Premium

#### Desde el Modal de Planes:

1. Haga clic en su **avatar** en la esquina superior derecha
2. Seleccione **"Planes"** del menú desplegable
3. Se abrirá el modal de planes
4. Revise las características de cada plan
5. Haga clic en **"Elegir Mensual"** o **"Elegir Anual"**
6. Se abrirá el modal de pago

**📸 CAPTURA 43:** Modal de planes con botones "Elegir" visibles

#### Desde Restricciones:

Cuando intenta usar una función premium siendo usuario gratuito:
- Se muestra un mensaje de restricción
- Aparece un botón **"Actualizar a Premium"**
- Al hacer clic, se abre el modal de planes

**Ejemplos de restricciones:**
- Intentar agregar a favoritos
- Intentar acceder a scraping manual
- Intentar ver widget de clima

---

## 11. FUNCIONALIDADES PREMIUM

### 11.1 Acceso Ilimitado

**Usuarios Premium:**
- Acceso a **todas las noticias** sin límite (4000+)
- Sin restricción de 300 noticias

**Usuarios Gratuitos:**
- Limitados a las últimas 300 noticias
- Noticias antiguas no disponibles

### 11.2 Sin Anuncios

**Usuarios Premium:**
- Interfaz limpia sin banners publicitarios
- Experiencia de lectura ininterrumpida

**Usuarios Gratuitos:**
- Banners publicitarios en la parte superior
- Anuncios de PayPal, LinkedIn, Adobe, etc.

**📸 CAPTURA 44:** Vista de usuario gratuito (con anuncios)

**📸 CAPTURA 45:** Vista de usuario premium (sin anuncios)

### 11.3 Widget de Clima (Premium)

El widget de clima muestra información meteorológica en tiempo real usando la API Open-Meteo.

**📸 CAPTURA 46:** Widget de clima completo (vista general)

#### 11.3.1 Ubicación del Widget

- Sección: Bajo el título principal
- Título: "Clima en Tiempo Real"
- Solo visible para usuarios **Premium**

#### 11.3.2 Seleccionar Ubicación

**Selector de Tipo:**
1. Haga clic en el primer selector
2. Opciones:
   - **🇵🇪 Perú:** 24 departamentos de Perú
   - **🌍 Países:** 8 ciudades internacionales

**📸 CAPTURA 47:** Selector de tipo de ubicación (Perú/Países)

**Selector de Ubicación:**
1. Haga clic en el segundo selector
2. Si eligió **Perú**, verá:
   - Lima, Arequipa, Cusco, Puno, Junín
   - La Libertad, Piura, Lambayeque, Loreto
   - Cajamarca, Áncash, Tacna, Ica, Ucayali
   - Tumbes, San Martín, Moquegua, Madre de Dios
   - Huancavelica, Huánuco, Apurímac, Ayacucho
   - Amazonas, Pasco

3. Si eligió **Países**, verá:
   - 🇪🇸 Madrid (España)
   - 🇦🇷 Buenos Aires (Argentina)
   - 🇲🇽 Ciudad de México (México)
   - 🇨🇱 Santiago (Chile)
   - 🇨🇴 Bogotá (Colombia)
   - 🇪🇨 Quito (Ecuador)
   - 🇧🇴 La Paz (Bolivia)
   - 🇧🇷 São Paulo (Brasil)

**📸 CAPTURA 48:** Dropdown de departamentos de Perú desplegado

**📸 CAPTURA 49:** Dropdown de países desplegado

#### 11.3.3 Información del Clima

Una vez seleccionada la ubicación, el widget muestra:

**Datos principales:**
- **Nombre de la ubicación:** Ej: "Lima", "Madrid"
- **Temperatura actual:** Ej: "23°C"
- **Descripción del clima:** Ej: "Parcialmente nublado"
- **Icono climático:** ☀️, 🌤️, ⛅, ☁️, 🌫️, 🌧️, ⛈️

**Datos adicionales:**
- **Viento:** Velocidad en km/h (ej: "15 km/h")
- **Sensación térmica:** Temperatura percibida (ej: "21°C")

**📸 CAPTURA 50:** Widget mostrando datos del clima (Lima, Perú)

#### 11.3.4 Códigos Climáticos

| Condición | Código | Icono | Descripción |
|-----------|--------|-------|-------------|
| Despejado | 0 | ☀️ | Cielo despejado |
| Mayormente despejado | 1 | 🌤️ | Pocas nubes |
| Parcialmente nublado | 2 | ⛅ | Nubes dispersas |
| Nublado | 3 | ☁️ | Cielo cubierto |
| Niebla | 45, 48 | 🌫️ | Visibilidad reducida |
| Llovizna | 51-55 | 🌧️ | Lluvia ligera |
| Lluvia | 61-65 | 🌧️ | Lluvia moderada a fuerte |
| Chubascos | 80-82 | 🌦️ | Lluvia intermitente |
| Tormenta | 95-99 | ⛈️ | Tormenta eléctrica |

#### 11.3.5 Gradientes Dinámicos

El fondo del widget cambia según las condiciones climáticas:

- **Cielo despejado:** Gradiente amarillo → naranja
- **Mayormente despejado:** Gradiente azul claro → azul
- **Nublado:** Gradiente azul oscuro → azul marino
- **Lluvia/Tormenta:** Gradiente gris → gris oscuro

**📸 CAPTURA 51:** Widget con clima despejado (fondo amarillo-naranja)

**📸 CAPTURA 52:** Widget con clima lluvioso (fondo gris)

#### 11.3.6 Actualización del Clima

El clima se actualiza:
- **Automáticamente:** Al cambiar de ubicación
- **Manualmente:** Recargando la página
- **Frecuencia:** Datos en tiempo real de Open-Meteo API

### 11.4 Scraping Manual de Noticias (Premium)

El scraping manual permite obtener noticias actualizadas de fuentes específicas bajo demanda.

**📸 CAPTURA 53:** Botón de scraping en el header (icono de recarga 🔄)

#### 11.4.1 Abrir el Modal de Scraping

1. Ubique el **botón de recarga** (🔄) en la esquina superior derecha del header
2. Haga clic en el botón
3. Se abrirá el modal **"Scraping Manual de Noticias"**

**Nota:** Este botón solo es visible para usuarios **Premium**.

#### 11.4.2 Seleccionar Fuente

El modal muestra una lista de 15 fuentes disponibles:

**📸 CAPTURA 54:** Modal de scraping completo (lista de fuentes)

**Fuentes disponibles:**

| Fuente | País | Categoría |
|--------|------|-----------|
| BBC Home | 🇬🇧 UK | General |
| BBC News | 🇬🇧 UK | Noticias |
| BBC Sport | 🇬🇧 UK | Deportes |
| BBC Business | 🇬🇧 UK | Economía |
| Clarín | 🇦🇷 Argentina | General |
| Clarín Último Momento | 🇦🇷 Argentina | Actualidad |
| Clarín Política | 🇦🇷 Argentina | Política |
| Yahoo Noticias | 🌍 Global | General |
| El Mundo | 🇪🇸 España | General |
| El Mundo Últimas | 🇪🇸 España | Actualidad |
| Infobae Perú | 🇵🇪 Perú | General |
| Infobae México | 🇲🇽 México | General |
| Infobae España | 🇪🇸 España | General |
| El Diario | 🇪🇸 España | General |
| El Diario Política | 🇪🇸 España | Política |

**Diseño:**
- Cards clickeables con efecto hover
- Muestra: Bandera, nombre de fuente, URL
- Hover: Sombra y borde azul

#### 11.4.3 Iniciar Scraping

1. Haga clic en la card de la fuente deseada (ej: "BBC News")
2. El modal cambiará a la vista de **"Progreso de Scraping"**
3. Verá:
   - Mensaje: "Scrapeando [Nombre de Fuente]..."
   - Loader animado (spinner)
   - Barra de progreso
4. El proceso simulado dura aproximadamente 3 segundos

**📸 CAPTURA 55:** Vista de progreso durante el scraping (barra de progreso visible)

#### 11.4.4 Resultados del Scraping

Una vez completado el scraping:

1. El modal mostrará **"¡Scraping Completado!"** con checkmark ✅
2. Información mostrada:
   - "Noticias agregadas: X"
   - Fuente scrapeada
   - Número aleatorio entre 5 y 20 noticias
3. Botón: **"Ver Noticias"**

**📸 CAPTURA 56:** Vista de resultados exitosos del scraping

#### 11.4.5 Ver Noticias Nuevas

1. Haga clic en el botón **"Ver Noticias"**
2. El modal se cerrará
3. La página se recargará
4. Las nuevas noticias aparecerán en el grid principal

**Nota:** En la versión actual, el scraping es **simulado**. En producción, este proceso se conectaría a un backend real que extraería noticias de los sitios web.

#### 11.4.6 Cerrar el Modal

Para cancelar el scraping:

1. Haga clic en el botón **"Cerrar"** (esquina superior derecha)
2. O haga clic fuera del modal
3. El proceso se detendrá (si está en progreso)

---

## 12. DASHBOARD ADMINISTRATIVO

El Dashboard Administrativo es una sección exclusiva para usuarios con rol de **Administrador** (admin@portal.com).

### 12.1 Acceso al Dashboard

**Requisito:** Solo el usuario con email **admin@portal.com** puede acceder.

**Cómo acceder:**

**Opción 1: Desde la barra lateral**
1. Haga clic en el icono **⚙️ Configuración** en la barra lateral
2. Será redirigido al dashboard (si es admin)

**Opción 2: URL directa**
1. Navegue a `#configuracion` o `#dashboard` en la URL
2. Solo mostrará contenido si es administrador

**Si no es administrador:**
- Verá un mensaje: "Acceso denegado. Esta sección es solo para administradores."
- Será redirigido a la página principal después de 2 segundos

**📸 CAPTURA 57:** Mensaje de acceso denegado (usuario no admin)

### 12.2 Vista General del Dashboard

El dashboard muestra estadísticas y visualizaciones de datos del portal.

**📸 CAPTURA 58:** Dashboard completo (vista panorámica)

**Secciones principales:**
1. KPIs (Indicadores clave de rendimiento)
2. Gráficos de análisis
3. Tabla de tiempos de actualización
4. Nube de palabras

### 12.3 KPIs (Indicadores Clave)

El dashboard muestra 4 tarjetas de KPIs en la parte superior:

**📸 CAPTURA 59:** Sección de KPIs completa (4 tarjetas)

#### KPI 1: Total de Noticias 📰

**Información mostrada:**
- Icono: 📰
- Título: "Total de Noticias"
- Número: Cantidad total de noticias en la base de datos
- Ejemplo: "4,108"

**Cálculo:**
```javascript
Total = allNews.length
```

**📸 CAPTURA 60:** Card de "Total de Noticias"

#### KPI 2: Total de Fuentes 🌍

**Información mostrada:**
- Icono: 🌍
- Título: "Total de Fuentes"
- Número: Cantidad de fuentes únicas
- Ejemplo: "15"

**Cálculo:**
```javascript
Total = new Set(allNews.map(n => n.fuente)).size
```

**📸 CAPTURA 61:** Card de "Total de Fuentes"

#### KPI 3: Noticias Hoy ⏰

**Información mostrada:**
- Icono: ⏰
- Título: "Noticias Hoy"
- Número: Noticias publicadas hoy
- Ejemplo: "127"

**Cálculo:**
```javascript
Hoy = allNews.filter(n => n.dateObject es hoy).length
```

**📸 CAPTURA 62:** Card de "Noticias Hoy"

#### KPI 4: % de Crecimiento 📈

**Información mostrada:**
- Icono: 📈
- Título: "% de Crecimiento"
- Número: Porcentaje de crecimiento respecto a ayer
- Color: Verde si ≥0, Rojo si <0
- Ejemplo: "+12.5%" o "-3.2%"

**Cálculo:**
```javascript
Crecimiento = ((noticiasHoy - noticiasAyer) / noticiasAyer) × 100
```

**📸 CAPTURA 63:** Card de "% de Crecimiento" (positivo, verde)

**📸 CAPTURA 64:** Card de "% de Crecimiento" (negativo, rojo)

### 12.4 Gráficos de Análisis

El dashboard incluye dos gráficos interactivos usando **ApexCharts**:

**📸 CAPTURA 65:** Sección de gráficos completa (ambos gráficos)

#### 12.4.1 Gráfico: Noticias por Fuente

**Tipo:** Gráfico de barras horizontales

**Información mostrada:**
- Eje X: Cantidad de noticias
- Eje Y: Nombre de las fuentes
- Muestra: Top 10 fuentes con más noticias
- Colores: Dinámicos (generados aleatoriamente)

**Ejemplo de datos:**
```
BBC:     850 noticias
Clarín:  720 noticias
El Mundo: 650 noticias
...
```

**📸 CAPTURA 66:** Gráfico de "Noticias por Fuente" completo

**Interactividad:**
- Hover: Muestra cantidad exacta
- Responsive: Se adapta al tamaño de pantalla
- Animado: Barras crecen al cargar

#### 12.4.2 Gráfico: Noticias por Categoría

**Tipo:** Gráfico de barras verticales

**Información mostrada:**
- Eje X: Categorías (General, Deportes, etc.)
- Eje Y: Cantidad de noticias
- Muestra: Todas las categorías
- Colores: Mapeados por categoría

**Colores por categoría:**
- General: Azul (#3b82f6)
- Actualidad: Verde (#10b981)
- Deportes: Rojo (#ef4444)
- Economía: Amarillo (#eab308)
- Tecnología: Púrpura (#8b5cf6)
- Cultura: Rosa (#ec4899)
- Ciencia: Índigo (#6366f1)
- Política: Gris (#6b7280)

**📸 CAPTURA 67:** Gráfico de "Noticias por Categoría" completo

**Ejemplo de datos:**
```
General:     1200 noticias
Actualidad:  980 noticias
Deportes:    750 noticias
Economía:    620 noticias
...
```

### 12.5 Tabla de Tiempos de Actualización

**Ubicación:** Debajo de los gráficos

**Información mostrada:**
- **Columna 1:** Fuente (nombre del portal)
- **Columna 2:** Última Actualización (fecha y hora)
- **Columna 3:** Promedio de actualización (frecuencia)

**Estado actual:** Placeholder (sin datos)

**📸 CAPTURA 68:** Tabla de tiempos de actualización (vacía)

**Nota:** Esta funcionalidad está en desarrollo y actualmente no muestra datos reales.

### 12.6 Nube de Palabras

La nube de palabras visualiza los términos más frecuentes en los títulos de las noticias.

**📸 CAPTURA 69:** Nube de palabras completa

#### Características:

**Datos procesados:**
- Extrae palabras de todos los títulos de noticias
- Elimina stopwords (el, la, de, en, y, a, etc.)
- Filtra palabras con menos de 3 caracteres
- Cuenta frecuencias de aparición
- Muestra las **30 palabras más frecuentes**

**Diseño visual:**
- **Tamaño de fuente:** Proporcional a frecuencia
  - Más frecuente: 2.2rem
  - Menos frecuente: 0.7rem
- **Opacidad:** Proporcional a frecuencia
  - Más frecuente: 1.0 (100%)
  - Menos frecuente: 0.6 (60%)
- **Colores:** Aleatorios entre:
  - Azul (#3b82f6)
  - Púrpura (#8b5cf6)
  - Rosa (#ec4899)
  - Verde (#10b981)
  - Rojo (#ef4444)
  - Naranja (#f97316)

**Interactividad:**
- Hover: Las palabras crecen (scale 110%)
- Animación: Transición suave al pasar el mouse

**Ejemplo de palabras comunes:**
- "Gobierno" (120 apariciones)
- "Mundial" (85 apariciones)
- "Economía" (72 apariciones)
- "Presidente" (68 apariciones)
- ...

**📸 CAPTURA 70:** Nube de palabras con hover en una palabra (efecto de escala)

#### Estado Vacío:

Si no hay suficientes datos:
```
No hay suficientes datos para generar
la nube de palabras
```

---

## 13. WIDGET DE CLIMA

**(Ya explicado en sección 11.3 - Funcionalidades Premium)**

Ver sección **11.3 Widget de Clima** para información detallada.

**Capturas requeridas:**
- Widget completo
- Selectors desplegados
- Diferentes condiciones climáticas

---

## 14. SCRAPING MANUAL DE NOTICIAS

**(Ya explicado en sección 11.4 - Funcionalidades Premium)**

Ver sección **11.4 Scraping Manual** para información detallada.

**Capturas requeridas:**
- Botón de scraping
- Modal de fuentes
- Progreso del scraping
- Resultados completados

---

## 15. MODO OSCURO

### 15.1 ¿Qué es el Modo Oscuro?

El modo oscuro invierte los colores de la interfaz para reducir la fatiga visual en ambientes con poca luz.

**Beneficios:**
- 👁️ Reduce fatiga ocular
- 🔋 Ahorra batería (pantallas OLED)
- 🌙 Mejor para uso nocturno
- 🎨 Apariencia moderna y elegante

### 15.2 Activar/Desactivar Modo Oscuro

**Ubicación:** Barra lateral izquierda, parte inferior

**Cómo cambiar:**
1. Ubique el botón de modo oscuro en la barra lateral
2. Icono actual:
   - ☀️ si está en **modo claro**
   - 🌙 si está en **modo oscuro**
3. Haga clic en el icono
4. La interfaz cambiará instantáneamente

**📸 CAPTURA 71:** Botón de modo oscuro (modo claro activo, icono ☀️)

**📸 CAPTURA 72:** Botón de modo oscuro (modo oscuro activo, icono 🌙)

### 15.3 Comparativa Visual

**Modo Claro:**
- Fondo: Blanco (#ffffff)
- Texto: Gris oscuro (#111827)
- Cards: Blanco con sombras sutiles
- Barra lateral: Fondo oscuro (#1f2937)

**Modo Oscuro:**
- Fondo: Gris muy oscuro (#111827)
- Texto: Blanco (#f9fafb)
- Cards: Gris oscuro (#1f2937)
- Barra lateral: Negro profundo (#0f172a)

**📸 CAPTURA 73:** Vista completa en modo claro (página principal)

**📸 CAPTURA 74:** Vista completa en modo oscuro (misma página)

**📸 CAPTURA 75:** Comparación lado a lado (modo claro vs oscuro)

### 15.4 Persistencia del Tema

El tema seleccionado se **guarda automáticamente** en el navegador:

- Al cambiar el tema, se almacena en `localStorage`
- Al volver a abrir la aplicación, se mantiene su preferencia
- El tema es independiente del usuario (guardado por navegador)

**Almacenamiento:**
```javascript
localStorage.setItem('theme', 'dark') // o 'light'
```

---

## 16. PREGUNTAS FRECUENTES

### 16.1 Cuenta y Autenticación

**P: ¿Puedo cambiar mi contraseña?**
R: Actualmente, la función de cambio de contraseña no está disponible. Para cambiar su contraseña, debe crear una nueva cuenta.

**P: ¿Qué hago si olvidé mi contraseña?**
R: Actualmente no hay recuperación de contraseña. Deberá crear una nueva cuenta con otro email.

**P: ¿Puedo usar el mismo email en diferentes navegadores?**
R: No. Las cuentas están guardadas localmente en cada navegador. Si usa Chrome y Firefox, deberá crear cuentas separadas en cada uno.

**P: ¿Mis datos están seguros?**
R: Sus datos se almacenan localmente en su navegador (localStorage). No se envían a ningún servidor externo (excepto las noticias que se consultan desde Supabase).

### 16.2 Planes y Pagos

**P: ¿Cómo cancelo mi suscripción Premium?**
R: Actualmente, la cancelación debe realizarse contactando al soporte técnico.

**P: ¿Puedo cambiar de plan Mensual a Anual?**
R: Sí, puede actualizar su plan en cualquier momento desde la sección "Planes" en el menú de usuario.

**P: ¿El pago es automático cada mes?**
R: En la versión actual, el sistema de pagos es simulado. En producción, los pagos se procesarán automáticamente según su plan.

**P: ¿Aceptan otras monedas además de Soles (S/)?**
R: Actualmente solo se muestran precios en Soles peruanos (S/).

### 16.3 Favoritos

**P: ¿Cuántas noticias puedo guardar en favoritos?**
R: Los usuarios Premium pueden guardar **ilimitadas** noticias en favoritos.

**P: ¿Mis favoritos se sincronizan entre dispositivos?**
R: No. Los favoritos se guardan localmente en cada navegador/dispositivo.

**P: ¿Qué pasa si una noticia favorita es eliminada de la base de datos?**
R: Verá un mensaje indicando que "Las noticias guardadas ya no están disponibles".

**P: ¿Puedo exportar mis favoritos?**
R: Actualmente no hay función de exportación de favoritos.

### 16.4 Noticias y Fuentes

**P: ¿Con qué frecuencia se actualizan las noticias?**
R: Las noticias se actualizan mediante scraping automático. La frecuencia varía según la fuente (generalmente varias veces al día).

**P: ¿Puedo sugerir nuevas fuentes de noticias?**
R: Puede enviar sugerencias al equipo de soporte. Las fuentes se evalúan según confiabilidad y relevancia.

**P: ¿Por qué algunas noticias no tienen imagen?**
R: Si la fuente original no proporciona imagen, el sistema genera una imagen placeholder aleatoria.

**P: ¿Las noticias son editadas o son directas de la fuente?**
R: Las noticias se extraen directamente de las fuentes originales sin modificación (scraping).

### 16.5 Filtros y Búsqueda

**P: ¿Puedo buscar por rango de fechas específico?**
R: Sí, use los filtros de "Fecha Inicio" y "Fecha Fin" en la sección de filtros.

**P: ¿La búsqueda distingue mayúsculas de minúsculas?**
R: No, la búsqueda es insensible a mayúsculas y minúsculas.

**P: ¿Puedo buscar por múltiples palabras?**
R: Sí, escriba todas las palabras separadas por espacios. La búsqueda encontrará noticias que contengan cualquiera de las palabras.

**P: ¿Puedo guardar mis filtros favoritos?**
R: Actualmente no hay función de guardado de filtros. Debe aplicarlos manualmente cada vez.

### 16.6 Scraping Manual

**P: ¿Cuánto tiempo tarda el scraping de una fuente?**
R: En la simulación actual, tarda 3 segundos. En producción, puede variar entre 30 segundos y 2 minutos según la fuente.

**P: ¿Puedo scrapear todas las fuentes a la vez?**
R: No, debe scrapear fuentes de una en una.

**P: ¿El scraping afecta el rendimiento de mi navegador?**
R: No, el scraping se realiza en el servidor backend, no en su navegador.

**P: ¿Las noticias scrapeadas se agregan a la base de datos permanentemente?**
R: En la versión actual (simulación), no. En producción, sí se agregarían permanentemente.

### 16.7 Widget de Clima

**P: ¿De dónde obtiene los datos del clima?**
R: Los datos provienen de la API gratuita Open-Meteo (https://open-meteo.com/).

**P: ¿Con qué frecuencia se actualiza el clima?**
R: El clima se consulta en tiempo real cada vez que cambia de ubicación o recarga la página.

**P: ¿Puedo agregar más ciudades?**
R: Las ciudades están predefinidas. Para agregar más, debe contactar al equipo de desarrollo.

**P: ¿El clima es preciso?**
R: Los datos provienen de modelos meteorológicos profesionales y son generalmente precisos, pero pueden tener ligeras variaciones.

### 16.8 Dashboard Administrativo

**P: ¿Puedo convertirme en administrador?**
R: No, el rol de administrador está restringido a admin@portal.com. No se pueden crear administradores adicionales en la versión actual.

**P: ¿Los gráficos se actualizan automáticamente?**
R: Sí, los gráficos se recalculan cada vez que se cargan nuevas noticias.

**P: ¿Puedo exportar los datos del dashboard?**
R: Actualmente no hay función de exportación de datos.

### 16.9 Técnicas

**P: ¿Funciona en móviles?**
R: Sí, la interfaz es responsive y se adapta a dispositivos móviles y tablets.

**P: ¿Necesito instalar alguna aplicación?**
R: No, es una aplicación web que funciona completamente en el navegador.

**P: ¿Funciona sin conexión a internet?**
R: No, requiere conexión a internet para consultar noticias y datos del clima.

**P: ¿Qué navegadores son compatibles?**
R: Chrome, Firefox, Edge, Safari y Opera en sus versiones recientes.

---

## 17. SOLUCIÓN DE PROBLEMAS

### 17.1 Problemas de Login

**Problema: "Email no registrado"**

**Causas posibles:**
- Email escrito incorrectamente
- Cuenta creada en otro navegador
- Email no registrado aún

**Soluciones:**
1. Verifique la ortografía del email
2. Intente crear una nueva cuenta
3. Verifique que está usando el mismo navegador donde se registró

---

**Problema: "Contraseña incorrecta"**

**Causas posibles:**
- Contraseña escrita incorrectamente
- Mayúsculas/minúsculas incorrectas
- Espacios adicionales

**Soluciones:**
1. Verifique mayúsculas y minúsculas
2. Copie y pegue la contraseña si la guardó
3. Intente crear una nueva cuenta si olvidó la contraseña

---

**Problema: No puedo iniciar sesión después de registrarme**

**Soluciones:**
1. Asegúrese de que el modal se cerró correctamente
2. Recargue la página (F5)
3. Limpie el caché del navegador
4. Intente en modo incógnito

### 17.2 Problemas con Noticias

**Problema: No se cargan las noticias (mensaje "Cargando noticias..." no desaparece)**

**Causas posibles:**
- Problema de conexión a internet
- Supabase inaccesible
- Error en la consulta a la base de datos

**Soluciones:**
1. Verifique su conexión a internet
2. Recargue la página (F5)
3. Limpie el caché del navegador (Ctrl+Shift+Delete)
4. Intente en otro navegador
5. Contacte al soporte si persiste

---

**Problema: Las imágenes no se muestran**

**Causas posibles:**
- Picsum.photos bloqueado
- Bloqueador de anuncios activo
- Conexión lenta

**Soluciones:**
1. Desactive extensiones de bloqueador de anuncios
2. Verifique que Picsum.photos no esté bloqueado
3. Espere unos segundos (las imágenes se cargan lazy)
4. Recargue la página

---

**Problema: Los filtros no funcionan**

**Causas posibles:**
- JavaScript deshabilitado
- Error en el código
- Datos incompatibles

**Soluciones:**
1. Asegúrese de hacer clic en el botón "Filtrar"
2. Intente limpiar filtros y aplicar uno por uno
3. Recargue la página
4. Abra la consola del navegador (F12) y busque errores

### 17.3 Problemas con Favoritos

**Problema: No puedo agregar favoritos (siendo Premium)**

**Causas posibles:**
- localStorage lleno
- Cookies/localStorage deshabilitado
- Error en la sincronización

**Soluciones:**
1. Verifique que las cookies y localStorage estén habilitados
2. Limpie el localStorage (Configuración → Privacidad)
3. Recargue la página
4. Intente en modo incógnito (los favoritos no persistirán)

---

**Problema: Mis favoritos desaparecieron**

**Causas posibles:**
- Cambio de navegador
- Limpieza de caché/cookies
- Sesión de incógnito cerrada
- Otro usuario usó el mismo navegador

**Soluciones:**
1. Verifique que está usando el mismo navegador y cuenta
2. No use modo incógnito si quiere mantener favoritos
3. Evite limpiar cookies si tiene favoritos importantes
4. **Prevención:** Exporte noticias manualmente (copie los enlaces)

### 17.4 Problemas con el Dashboard

**Problema: No puedo acceder al dashboard (no siendo admin)**

**Solución:**
- El dashboard es exclusivo para admin@portal.com
- Cree una cuenta con ese email para acceder
- O solicite acceso al administrador del sistema

---

**Problema: Los gráficos no se muestran**

**Causas posibles:**
- ApexCharts no cargó
- No hay datos suficientes
- Error de JavaScript

**Soluciones:**
1. Recargue la página (F5)
2. Verifique su conexión a internet
3. Limpie el caché del navegador
4. Asegúrese de que hay noticias en la base de datos
5. Abra la consola (F12) y busque errores de ApexCharts

---

**Problema: La nube de palabras está vacía**

**Causas posibles:**
- No hay noticias suficientes
- Todas las palabras son stopwords
- Error en el procesamiento

**Soluciones:**
1. Asegúrese de que hay noticias cargadas
2. Recargue la página
3. Verifique la consola del navegador (F12)

### 17.5 Problemas con el Widget de Clima

**Problema: El clima no carga**

**Causas posibles:**
- Open-Meteo API caída
- Problema de conexión
- Coordenadas incorrectas

**Soluciones:**
1. Verifique su conexión a internet
2. Intente cambiar de ubicación
3. Recargue la página
4. Espere unos minutos y vuelva a intentar
5. Verifique que Open-Meteo esté operativo: https://open-meteo.com/

---

**Problema: El clima muestra datos incorrectos**

**Causas posibles:**
- Caché de API
- Ubicación incorrecta
- Delay en actualización

**Soluciones:**
1. Recargue la página (los datos se consultan en tiempo real)
2. Verifique que la ubicación seleccionada es correcta
3. Compare con otras fuentes del clima

### 17.6 Problemas con el Scraping Manual

**Problema: El scraping se queda "cargando" indefinidamente**

**Causas posibles:**
- Backend no responde
- Timeout de conexión
- Error en el servidor

**Soluciones:**
1. Espere hasta 2 minutos
2. Cierre el modal y vuelva a intentar
3. Recargue la página
4. Contacte al soporte técnico

---

**Problema: El scraping dice "completado" pero no hay noticias nuevas**

**Causa:**
- En la versión actual, el scraping es **simulado**
- No agrega noticias reales a la base de datos

**Nota:**
- Esta es una funcionalidad de demostración
- En producción, se conectará a un backend real

### 17.7 Problemas Generales

**Problema: La aplicación está lenta**

**Causas posibles:**
- Muchas noticias cargadas
- Conexión lenta
- Navegador con muchas pestañas
- Recursos del sistema limitados

**Soluciones:**
1. Cierre pestañas innecesarias
2. Aumente la RAM disponible
3. Limpie el caché del navegador
4. Use filtros para reducir noticias mostradas
5. Reduzca el número de noticias por página (si es posible)

---

**Problema: El modo oscuro no funciona**

**Causas posibles:**
- JavaScript deshabilitado
- Error en el toggle
- Tema guardado incorrectamente

**Soluciones:**
1. Recargue la página
2. Intente hacer clic varias veces en el botón
3. Limpie el localStorage
4. Abra la consola (F12) y escriba:
   ```javascript
   document.documentElement.classList.toggle('dark')
   ```

---

**Problema: La página se ve mal (CSS roto)**

**Causas posibles:**
- Tailwind CSS no cargó
- Conexión interrumpida
- Bloqueador de contenido

**Soluciones:**
1. Verifique su conexión a internet
2. Recargue la página varias veces (Ctrl+F5)
3. Desactive bloqueadores de contenido
4. Limpie el caché del navegador
5. Intente en modo incógnito

### 17.8 Información de Depuración

Para ayudar al soporte técnico, proporcione:

1. **Navegador y versión:** (ej: Chrome 120.0.6099.109)
2. **Sistema operativo:** (ej: Windows 11, macOS Ventura)
3. **Errores de consola:** Presione F12, pestaña "Console", copie mensajes rojos
4. **Pasos para reproducir:** Describa exactamente qué hizo antes del error
5. **Captura de pantalla:** Si es un problema visual

**Cómo abrir la consola del navegador:**
- **Windows/Linux:** Presione F12 o Ctrl+Shift+I
- **macOS:** Presione Cmd+Option+I
- Vaya a la pestaña "Console"

---

## 18. GLOSARIO

**Administrador**
Usuario con email admin@portal.com que tiene acceso al dashboard administrativo.

**ApexCharts**
Librería de JavaScript para crear gráficos interactivos.

**Card (Tarjeta)**
Componente visual rectangular que contiene información de una noticia.

**Categoria**
Clasificación de noticias (General, Deportes, Economía, etc.).

**Dashboard**
Panel administrativo con estadísticas y visualizaciones.

**Favoritos**
Noticias guardadas por el usuario para lectura posterior (solo Premium).

**Filtro**
Herramienta para reducir y organizar noticias según criterios específicos.

**Fuente**
Portal de noticias de donde se obtiene la información (ej: BBC, Clarín).

**Gratuito**
Plan sin costo con funcionalidades limitadas.

**Grid**
Disposición de elementos en filas y columnas.

**Hash**
Parte de la URL después del símbolo # (ej: #home, #favorites).

**Hover**
Acción de pasar el mouse sobre un elemento.

**KPI (Key Performance Indicator)**
Indicador clave de rendimiento (métrica importante).

**localStorage**
Almacenamiento local del navegador para guardar datos.

**Modal**
Ventana emergente que aparece sobre el contenido principal.

**Modo Oscuro (Dark Mode)**
Esquema de colores con fondo oscuro y texto claro.

**Nube de Palabras (Word Cloud)**
Visualización de palabras frecuentes con tamaños proporcionales.

**Paywall**
Barrera que impide el acceso a funciones sin suscripción Premium.

**Premium**
Plan de pago con todas las funcionalidades desbloqueadas.

**Responsive**
Diseño que se adapta a diferentes tamaños de pantalla.

**Scraping**
Proceso de extracción automática de datos de sitios web.

**Sidebar (Barra Lateral)**
Menú de navegación vertical en el lado izquierdo.

**Stopwords**
Palabras comunes sin significado relevante (el, la, de, etc.).

**Supabase**
Plataforma de base de datos PostgreSQL en la nube.

**Tailwind CSS**
Framework CSS basado en clases utilitarias.

**Toggle**
Interruptor para activar/desactivar una función.

**Tooltip**
Mensaje informativo que aparece al pasar el mouse sobre un elemento.

**Widget**
Componente de interfaz con funcionalidad específica (ej: widget de clima).

---

## 📸 RESUMEN DE CAPTURAS REQUERIDAS

A continuación, el listado completo de las 75 capturas que debe tomar para ilustrar este manual:

### INTRODUCCIÓN Y ACCESO (1-7)
1. Pantalla de inicio mostrando tres tipos de usuario
2. Vista completa sin autenticación
3. Modal de autenticación - pestaña "Crear Cuenta"
4. Formulario de registro completado
5. Mensaje de éxito después del registro
6. Formulario de inicio de sesión
7. Header después de login (mostrando avatar)

### INTERFAZ PRINCIPAL (8-15)
8. Barra lateral completa
9. Header completo (usuario premium)
10. Header completo (usuario sin login)
11. Sección de filtros expandida
12. Grid de categorías completo
13. Sección de titulares destacados
14. Grid de noticias completo
15. Controles de paginación

### NAVEGACIÓN DE NOTICIAS (16-19)
16. Una card de noticia en detalle
17. Card con efecto hover
18. Categorías con una seleccionada
19. Noticias filtradas por categoría

### FILTROS Y BÚSQUEDA (20-28)
20. Barra de búsqueda con texto
21. Resultados de búsqueda filtrados
22. Sección de filtros completa
23. Calendario de fecha desplegado
24. Dropdown de países desplegado
25. Dropdown de fuentes desplegado
26. Filtros aplicados (varios criterios)
27. Estado después de limpiar filtros
28. Controles de paginación (página intermedia)

### FAVORITOS (29-35)
29. Card antes de agregar a favoritos
30. Card después de agregar a favoritos
31. Mensaje de restricción (usuarios gratuitos)
32. Página de favoritos completa
33. Página de favoritos vacía
34. Badge de contador de favoritos
35. Paywall de favoritos

### PERFIL (36-40)
36. Menú desplegable de usuario
37. Modal de perfil completo
38. Selector de avatares
39. Editando nombre de usuario
40. Mensaje de éxito al guardar

### PLANES (41-45)
41. Modal de planes completo
42. Card del plan Mensual
43. Modal de planes con botones
44. Vista con anuncios (gratuito)
45. Vista sin anuncios (premium)

### WIDGET DE CLIMA (46-52)
46. Widget de clima completo
47. Selector de tipo de ubicación
48. Dropdown de departamentos (Perú)
49. Dropdown de países
50. Widget mostrando datos (Lima)
51. Widget clima despejado
52. Widget clima lluvioso

### SCRAPING (53-56)
53. Botón de scraping en header
54. Modal de scraping (lista de fuentes)
55. Vista de progreso durante scraping
56. Vista de resultados exitosos

### DASHBOARD (57-70)
57. Mensaje de acceso denegado
58. Dashboard completo (panorámica)
59. Sección de KPIs completa
60. Card "Total de Noticias"
61. Card "Total de Fuentes"
62. Card "Noticias Hoy"
63. Card "Crecimiento" (positivo)
64. Card "Crecimiento" (negativo)
65. Sección de gráficos completa
66. Gráfico "Noticias por Fuente"
67. Gráfico "Noticias por Categoría"
68. Tabla de tiempos (vacía)
69. Nube de palabras completa
70. Nube con hover en palabra

### MODO OSCURO (71-75)
71. Botón modo oscuro (claro activo)
72. Botón modo oscuro (oscuro activo)
73. Vista completa en modo claro
74. Vista completa en modo oscuro
75. Comparación lado a lado

---

## 📞 CONTACTO Y SOPORTE

**Soporte Técnico:**
- Email: soporte@newsportal.ai
- Chat en vivo: Widget Tidio en la esquina inferior derecha

**Redes Sociales:**
- Twitter: @NewsPortalAI
- Facebook: /NewsPortalAI
- LinkedIn: /company/newsportal-ai

**Documentación Adicional:**
- Repositorio GitHub: [Enlace]
- Documentación API: [Enlace]
- Changelog: [Enlace]

---

**Versión del Manual:** 1.0
**Última Actualización:** 28 de Noviembre de 2025
**Autor:** Equipo NewsPortal AI
**Páginas:** 75+ capturas requeridas

---

© 2025 NewsPortal AI. Todos los derechos reservados.
