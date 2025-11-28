
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// --- CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyBwGMwG0xLKigUfBDrclpiO3NuedoyQvvI",
  authDomain: "noticias-c704d.firebaseapp.com",
  projectId: "noticias-c704d",
  storageBucket: "noticias-c704d.firebasestorage.app",
  messagingSenderId: "208977360836",
  appId: "1:208977360836:web:a8e2501cb7b07d04c7d691"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- REFERENCIAS DOM ---
const newsGrid = document.getElementById('news-grid');
const loadingMessage = document.getElementById('loading-message');
const authActions = document.getElementById('auth-actions');
const premiumUpsell = document.getElementById('premium-upsell');
const updateNewsBtn = document.getElementById('update-news-btn');
const mockUpgradeBtn = document.getElementById('mock-upgrade-btn');
const applyFiltersBtn = document.getElementById('apply-filters-btn');
const authSection = document.getElementById('auth-section');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');

// Filtros
const filterPortal = document.getElementById('filter-portal');
const filterCategoria = document.getElementById('filter-categoria');
const filterPais = document.getElementById('filter-pais');
const filterFecha = document.getElementById('filter-fecha');

// --- CONFIGURACIÓN DE MAPEO (CORRECCIÓN EN FRONTEND) ---
const PORTAL_CONFIG = {
  // BBC
  "BBC Home": { cat: "General", fuente: "BBC" },
  "BBC News": { cat: "Actualidad", fuente: "BBC" },
  "BBC Sport": { cat: "Deportes", fuente: "BBC" },
  "BBC Business": { cat: "Economía", fuente: "BBC" },
  "BBC Innovation": { cat: "Tecnología", fuente: "BBC" },
  "BBC Culture": { cat: "Cultura", fuente: "BBC" },
  "BBC Arts": { cat: "Arte", fuente: "BBC" },
  "BBC Travel": { cat: "Viajes", fuente: "BBC" },
  "BBC Eath": { cat: "Ciencia", fuente: "BBC" },

  // Clarin
  "Clarin": { cat: "General", fuente: "Clarín" },
  "Clarin ultimo": { cat: "Última Hora", fuente: "Clarín" },
  "Clarin politica": { cat: "Política", fuente: "Clarín" },
  "Clarin economia": { cat: "Economía", fuente: "Clarín" },
  "Clarin rural": { cat: "Rural", fuente: "Clarín" },
  "Clarin sociedad": { cat: "Sociedad", fuente: "Clarín" },
  "Clarin mundo": { cat: "Internacional", fuente: "Clarín" },
  "Clarin deportes": { cat: "Deportes", fuente: "Clarín" },
  "Clarin espectaculos": { cat: "Espectáculos", fuente: "Clarín" },
  "Clarin 80": { cat: "Especiales", fuente: "Clarín" },

  // Yahoo
  "Yahoo Noticias": { cat: "General", fuente: "Yahoo" },
  "Yahoo Noticias america": { cat: "Internacional", fuente: "Yahoo" },
  "Yahoo Noticias eeuu": { cat: "Internacional", fuente: "Yahoo" },
  "Yahoo Noticias deportes": { cat: "Deportes", fuente: "Yahoo" },

  // El Mundo
  "El Mundo": { cat: "General", fuente: "El Mundo" },
  "El Mundo ultimas": { cat: "Última Hora", fuente: "El Mundo" },
  "El Mundo mundoamerica": { cat: "Internacional", fuente: "El Mundo" },
  "El Mundo metropoli": { cat: "Local", fuente: "El Mundo" },
  "El Mundo cronica": { cat: "Crónica", fuente: "El Mundo" },
  "El Mundo yodona": { cat: "Estilo", fuente: "El Mundo" },
  "El Mundo papel": { cat: "Opinión", fuente: "El Mundo" },
  "El Mundo madrid": { cat: "Local", fuente: "El Mundo" },
  "El Mundo loc": { cat: "Farándula", fuente: "El Mundo" },
  "El Mundo vida": { cat: "Salud/Vida", fuente: "El Mundo" },
  "El Mundo motor": { cat: "Motor", fuente: "El Mundo" },
  "El Mundo ambiente": { cat: "Medio Ambiente", fuente: "El Mundo" },
  "El Mundo encuestas": { cat: "Política", fuente: "El Mundo" },
  "El Mundo lectura": { cat: "Cultura", fuente: "El Mundo" },
  "El Mundo tecnologia": { cat: "Tecnología", fuente: "El Mundo" },

  // Infobae
  "Infobae España": { cat: "Internacional", fuente: "Infobae" },
  "Infobae México": { cat: "Internacional", fuente: "Infobae" },
  "Infobae Perú": { cat: "Nacional", fuente: "Infobae" },
};

const CATEGORIAS = {
  POLITICA: 'Política',
  ECONOMIA: 'Economía',
  DEPORTES: 'Deportes',
  TECNOLOGIA: 'Tecnología',
  ENTRETENIMIENTO: 'Entretenimiento',
  CIENCIA: 'Ciencia',
  SALUD: 'Salud',
  INTERNACIONAL: 'Internacional',
  SOCIEDAD: 'Sociedad',
  CULTURA: 'Cultura',
  CLIMA: 'Clima',
  EDUCACION: 'Educación',
  SEGURIDAD: 'Seguridad',
  NEGOCIOS: 'Negocios',
  GENERAL: 'General'
};

// Palabras clave para cada categoría (expandible)
const PALABRAS_CLAVE = {
  [CATEGORIAS.POLITICA]: [
    'gobierno', 'presidente', 'ministro', 'congreso', 'parlamento', 'elecciones',
    'votación', 'política', 'partido', 'senado', 'diputado', 'alcalde', 'reforma',
    'ley', 'decreto', 'legislación', 'oposición', 'coalición', 'campaña'
  ],

  [CATEGORIAS.ECONOMIA]: [
    'economía', 'inflación', 'banco', 'mercado', 'bolsa', 'dólar', 'euro',
    'inversión', 'comercio', 'exportación', 'importación', 'pib', 'fiscal',
    'impuesto', 'deficit', 'deuda', 'financiero', 'bcr', 'bcrp', 'tipo de cambio'
  ],

  [CATEGORIAS.DEPORTES]: [
    'fútbol', 'deporte', 'partido', 'campeonato', 'liga', 'gol', 'jugador',
    'equipo', 'selección', 'mundial', 'olimpiadas', 'tennis', 'basketball',
    'voleibol', 'natación', 'atletismo', 'torneo', 'copa', 'campeón', 'entrenador'
  ],

  [CATEGORIAS.TECNOLOGIA]: [
    'tecnología', 'smartphone', 'app', 'aplicación', 'software', 'hardware',
    'inteligencia artificial', 'ia', 'robot', 'internet', 'digital', 'cyber',
    'chip', 'procesador', 'google', 'apple', 'microsoft', 'meta', 'tesla',
    'innovación', 'startup', 'gadget'
  ],

  [CATEGORIAS.ENTRETENIMIENTO]: [
    'cine', 'película', 'serie', 'actor', 'actriz', 'música', 'cantante',
    'concierto', 'festival', 'estreno', 'netflix', 'disney', 'espectáculo',
    'farándula', 'celebridad', 'famoso', 'artista', 'show', 'teatro'
  ],

  [CATEGORIAS.CIENCIA]: [
    'ciencia', 'investigación', 'estudio', 'científico', 'descubrimiento',
    'experimento', 'universo', 'espacio', 'nasa', 'astronomía', 'física',
    'química', 'biología', 'laboratorio', 'molécula', 'gen', 'adn'
  ],

  [CATEGORIAS.SALUD]: [
    'salud', 'hospital', 'médico', 'enfermedad', 'tratamiento', 'vacuna',
    'virus', 'paciente', 'clínica', 'medicina', 'covid', 'pandemia',
    'síntoma', 'diagnóstico', 'terapia', 'farmacia', 'oms', 'minsa'
  ],

  [CATEGORIAS.INTERNACIONAL]: [
    'internacional', 'mundial', 'país', 'nación', 'otan', 'onu', 'unión europea',
    'tratado', 'diplomacia', 'embajada', 'frontera', 'conflicto', 'guerra',
    'paz', 'acuerdo internacional', 'cumbre', 'global'
  ],

  [CATEGORIAS.SOCIEDAD]: [
    'sociedad', 'comunidad', 'familia', 'niño', 'mujer', 'violencia', 'protesta',
    'manifestación', 'derechos', 'justicia', 'tribunal', 'juicio', 'caso',
    'denuncia', 'población', 'ciudadano', 'vecino'
  ],

  [CATEGORIAS.CULTURA]: [
    'cultura', 'arte', 'museo', 'exposición', 'pintura', 'escultura', 'literatura',
    'libro', 'autor', 'escritor', 'poesía', 'patrimonio', 'tradición',
    'folclore', 'festival cultural', 'galería'
  ],

  [CATEGORIAS.CLIMA]: [
    'clima', 'temperatura', 'lluvia', 'tormenta', 'huracán', 'ciclón', 'sequía',
    'inundación', 'meteorología', 'pronóstico', 'calor', 'frío', 'viento',
    'nieve', 'granizo', 'cambio climático', 'medio ambiente'
  ],

  [CATEGORIAS.EDUCACION]: [
    'educación', 'universidad', 'colegio', 'escuela', 'estudiante', 'profesor',
    'maestro', 'examen', 'nota', 'admisión', 'matrícula', 'beca', 'clase',
    'curso', 'minedu', 'sunedu', 'aprendizaje'
  ],

  [CATEGORIAS.SEGURIDAD]: [
    'seguridad', 'policía', 'delincuencia', 'robo', 'asalto', 'crimen',
    'delito', 'captura', 'detenido', 'fiscalía', 'investigación policial',
    'patrullaje', 'serenazgo', 'emergencia', 'accidente'
  ],

  [CATEGORIAS.NEGOCIOS]: [
    'empresa', 'negocio', 'emprendimiento', 'startup', 'ceo', 'gerente',
    'venta', 'compra', 'fusión', 'adquisición', 'marca', 'producto',
    'servicio', 'cliente', 'consumidor', 'industria', 'sector'
  ]
};

function normalizarNoticia(doc) {
  const data = doc.data();
  const rawFuente = data.fuente; // Ej: "BBC Sport"

  // Valores por defecto (si no está en la lista)
  let categoriaFinal = data.categoria || "General";
  let fuenteFinal = rawFuente;

  // Si existe en nuestra configuración, sobrescribimos
  if (PORTAL_CONFIG[rawFuente]) {
    categoriaFinal = PORTAL_CONFIG[rawFuente].cat;
    fuenteFinal = PORTAL_CONFIG[rawFuente].fuente;
  }

  return {
    id: doc.id,
    ...data,
    categoria: categoriaFinal, // Forzamos la categoría correcta
    fuente: fuenteFinal,       // Limpiamos el nombre (Ej: BBC Sport -> BBC)
    fuenteOriginal: rawFuente  // Guardamos el original por si acaso
  };
}

// --- VARIABLE GLOBAL DE USUARIO ---
let currentUserData = null;
let allNews = []; // Cache de todas las noticias

// --- FUNCIONES DE AUTENTICACIÓN ---

function showAuthModal(showRegister = false) {
  authSection.classList.remove('hidden');
  authSection.classList.add('flex');

  if (showRegister) {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  } else {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
  }
  loginError.classList.add('hidden');
  registerError.classList.add('hidden');
}

function hideAuthModal() {
  authSection.classList.add('hidden');
  authSection.classList.remove('flex');
}

function normalizarTexto(texto) {
  if (!texto) return '';
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .trim();
}

function calcularScores(textoNormalizado) {
  const scores = {};

  Object.keys(PALABRAS_CLAVE).forEach(categoria => {
    scores[categoria] = 0;

    PALABRAS_CLAVE[categoria].forEach(palabra => {
      const palabraNorm = normalizarTexto(palabra);

      // Buscar coincidencias exactas (palabra completa)
      const regex = new RegExp(`\\b${palabraNorm}\\b`, 'g');
      const coincidencias = (textoNormalizado.match(regex) || []).length;

      if (coincidencias > 0) {
        // Más peso si aparece en el título (multiplicador)
        scores[categoria] += coincidencias;
      }
    });
  });

  return scores;
}

function categorizarNoticia(titulo, resumen = '', categoriaActual = '') {
  // Si ya tiene una categoría válida y no es "General", mantenerla
  if (categoriaActual &&
    categoriaActual !== 'General' &&
    Object.values(CATEGORIAS).includes(categoriaActual)) {
    return categoriaActual;
  }

  // Normalizar textos
  const tituloNorm = normalizarTexto(titulo);
  const resumenNorm = normalizarTexto(resumen);

  // Dar más peso al título (3x) que al resumen
  const textoCompleto = `${tituloNorm} ${tituloNorm} ${tituloNorm} ${resumenNorm}`;

  // Calcular scores
  const scores = calcularScores(textoCompleto);

  // Encontrar la categoría con mayor score
  let mejorCategoria = CATEGORIAS.GENERAL;
  let maxScore = 0;

  Object.entries(scores).forEach(([categoria, score]) => {
    if (score > maxScore) {
      maxScore = score;
      mejorCategoria = categoria;
    }
  });

  // Si no hay coincidencias suficientes, mantener General
  if (maxScore < 1) {
    return CATEGORIAS.GENERAL;
  }

  return mejorCategoria;
}

function categorizarNoticias(noticias) {
  return noticias.map(noticia => {
    const nuevaCategoria = categorizarNoticia(
      noticia.titulo,
      noticia.resumen,
      noticia.categoria
    );

    return {
      ...noticia,
      categoria: nuevaCategoria,
      categoriaOriginal: noticia.categoria // Guardar la original por referencia
    };
  });
}

function generarEstadisticas(noticiasCategorias) {
  const stats = {};

  noticiasCategorias.forEach(noticia => {
    const cat = noticia.categoria;
    if (!stats[cat]) {
      stats[cat] = 0;
    }
    stats[cat]++;
  });

  // Ordenar por cantidad
  const sorted = Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .map(([categoria, cantidad]) => ({ categoria, cantidad }));

  return sorted;
}


console.log('='.repeat(60));
console.log('SISTEMA DE CATEGORIZACIÓN INTELIGENTE DE NOTICIAS');
console.log('='.repeat(60));

// const resultado = recategorizarNoticiasFirebase(noticiasEjemplo);

// console.log('\n📰 Noticias categorizadas:');
// resultado.forEach(noticia => {
//   console.log(`\n[${noticia.categoria}]`);
//   console.log(`Título: ${noticia.titulo}`);
//   console.log(`Categoría anterior: ${noticia.categoriaOriginal}`);
// });

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    categorizarNoticia,
    categorizarNoticias,
    recategorizarNoticiasFirebase,
    CATEGORIAS,
    PALABRAS_CLAVE
  };
}

async function recategorizarNoticiasFirebase(noticias) {
  console.log(`🔄 Iniciando recategorización de ${noticias.length} noticias...`);

  const noticiasCategorias = categorizarNoticias(noticias);

  const stats = generarEstadisticas(noticiasCategorias);

  console.log('📊 Estadísticas de categorización:');
  stats.forEach(({ categoria, cantidad }) => {
    console.log(`   ${categoria}: ${cantidad} noticias`);
  });

  return noticiasCategorias;
}

async function getUserData(uid) {
  try {
    const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    return null;
  }
}

function handleLogout() {
  signOut(auth).catch((error) => {
    console.error("Error al cerrar sesión:", error);
  });
}

// --- EVENT LISTENERS DE AUTENTICACIÓN ---

document.getElementById('close-auth-btn')?.addEventListener('click', hideAuthModal);
document.getElementById('switch-to-register')?.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
});
document.getElementById('switch-to-login')?.addEventListener('click', (e) => {
  e.preventDefault();
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

// Registro
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  registerError.classList.add('hidden');

  try {
    const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      is_premium: false,
      created_at: new Date()
    });

    hideAuthModal();
  } catch (error) {
    console.error("Error de registro:", error);
    registerError.textContent = `Error: ${error.message}`;
    registerError.classList.remove('hidden');
  }
});

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  loginError.classList.add('hidden');

  try {
    await signInWithEmailAndPassword(auth, email, password);
    hideAuthModal();
  } catch (error) {
    console.error("Error de inicio de sesión:", error);
    loginError.textContent = `Error: ${error.message}`;
    loginError.classList.remove('hidden');
  }
});

// Simulación de upgrade premium
mockUpgradeBtn.addEventListener('click', async () => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
    await setDoc(doc(db, "users", user.uid), {
      is_premium: true,
    }, { merge: true });

    alert("¡Felicidades! Has activado el Plan Premium (Simulación).");
    hideAuthModal();
  } catch (error) {
    alert("Error al simular el upgrade.");
    console.error("Error al actualizar plan:", error);
  }
});

// --- FUNCIONES DE UI ---

function updateUIForUser(user, userData) {
  authActions.innerHTML = '';

  if (user) {
    currentUserData = userData;

    authActions.innerHTML = `
            <span class="text-gray-800 text-sm hidden sm:inline-block">Hola, ${user.email}</span>
            ${userData?.is_premium ? '<span class="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full shadow-sm">PREMIUM</span>' : '<span class="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-full shadow-sm">GRATIS</span>'}
            <button id="logout-btn" class="text-gray-600 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">Salir</button>
        `;
    document.getElementById('logout-btn').addEventListener('click', handleLogout);

    const isPremium = userData?.is_premium || false;
    updateNewsBtn.disabled = !isPremium;
    document.getElementById('premium-tag').textContent = isPremium ? 'Actualizar' : 'Premium';
    premiumUpsell.classList.toggle('hidden', isPremium);
    mockUpgradeBtn.classList.toggle('hidden', isPremium);

  } else {
    currentUserData = null;
    authActions.innerHTML = `<button id="login-btn-nav-re" class="text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors shadow">Iniciar Sesión</button>`;
    document.getElementById('login-btn-nav-re').addEventListener('click', () => showAuthModal(false));

    updateNewsBtn.disabled = true;
    document.getElementById('premium-tag').textContent = 'Premium';
    premiumUpsell.classList.remove('hidden');
    mockUpgradeBtn.classList.remove('hidden');
  }

  loadNews();
}

// --- FUNCIONES DE NOTICIAS ---

function renderNews(newsItems) {
  newsGrid.innerHTML = '';

  if (newsItems.length === 0) {
    newsGrid.innerHTML = '<p class="md:col-span-3 text-center text-gray-500 text-lg">No se encontraron noticias con los filtros aplicados.</p>';
    return;
  }

  newsItems.forEach(n => {
    const date = n.fecha_publicacion?.toDate?.() || n.fecha_subida?.toDate?.() || new Date();
    const formattedDate = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

    const newsCard = `
            <article class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                ${n.imagen ? `
                <div class="w-full h-48 overflow-hidden bg-gray-100">
                    <img src="${n.imagen}" alt="${n.titulo}" class="w-full h-full object-cover hover:scale-110 transition-transform duration-300" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'w-full h-full flex items-center justify-center text-gray-400\\'>Sin Imagen</div>'">
                </div>
                ` : '<div class="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">Sin Imagen</div>'}
                
                <div class="p-6">
                    <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <span class="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                            📡 ${n.fuente || 'Desconocido'}
                        </span>
                        <span class="text-xs text-gray-500 flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            ${formattedDate}
                        </span>
                    </div>
                    
                    <div class="flex gap-2 mb-3">
                        ${n.categoria ? `<span class="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded">📂 ${n.categoria}</span>` : ''}
                        ${n.pais ? `<span class="inline-block px-2 py-1 text-xs font-medium text-green-600 bg-green-50 rounded">🌍 ${n.pais}</span>` : ''}
                    </div>
                    
                    <h2 class="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                        ${n.titulo}
                    </h2>
                    <p class="text-gray-600 mb-4 line-clamp-3">
                        ${n.resumen || 'Haz clic para leer el resumen completo en el portal original.'}
                    </p>
                    <a href="${n.enlace}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition-colors">
                        Leer más
                        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </a>
                </div>
            </article>
        `;
    newsGrid.innerHTML += newsCard;
  });
}

// Función para poblar los selectores de filtro
function populateFilters(newsItems) {
  // Obtener valores únicos
  const portales = [...new Set(newsItems.map(n => n.fuente).filter(Boolean))].sort();
  const categorias = [...new Set(newsItems.map(n => n.categoria).filter(Boolean))].sort();
  const paises = [...new Set(newsItems.map(n => n.pais).filter(Boolean))].sort();

  // Limpiar y repoblar portal
  filterPortal.innerHTML = '<option value="">Portal (Todos)</option>';
  portales.forEach(portal => {
    filterPortal.innerHTML += `<option value="${portal}">${portal}</option>`;
  });

  // Limpiar y repoblar categoría
  filterCategoria.innerHTML = '<option value="">Categoría (Todas)</option>';
  categorias.forEach(cat => {
    filterCategoria.innerHTML += `<option value="${cat}">${cat}</option>`;
  });

  // Limpiar y repoblar país - AHORA DINÁMICO
  filterPais.innerHTML = '<option value="">País (Todos)</option>';
  paises.forEach(pais => {
    filterPais.innerHTML += `<option value="${pais}">${pais}</option>`;
  });

  console.log(`✅ Filtros poblados: ${portales.length} portales, ${categorias.length} categorías, ${paises.length} países`);
}

// Función para aplicar filtros localmente
function applyFilters() {
  const portal = filterPortal.value;
  const categoria = filterCategoria.value;
  const pais = filterPais.value;
  const fecha = filterFecha.value;

  let filtered = [...allNews];

  // Filtrar por portal
  if (portal) {
    filtered = filtered.filter(n => n.fuente === portal);
  }

  // Filtrar por categoría
  if (categoria) {
    filtered = filtered.filter(n => n.categoria === categoria);
  }

  // Filtrar por país
  if (pais) {
    filtered = filtered.filter(n => n.pais === pais);
  }

  // Filtrar por fecha
  if (fecha) {
    const selectedDate = new Date(fecha);
    selectedDate.setHours(0, 0, 0, 0);

    filtered = filtered.filter(n => {
      const newsDate = n.fecha_publicacion?.toDate?.() || n.fecha_subida?.toDate?.();
      if (!newsDate) return false;

      newsDate.setHours(0, 0, 0, 0);
      return newsDate.getTime() === selectedDate.getTime();
    });
  }

  console.log(`Filtros aplicados: ${filtered.length} de ${allNews.length} noticias`);
  renderNews(filtered);
}

async function loadNews() {
  loadingMessage.classList.remove('hidden');
  newsGrid.innerHTML = '';

  try {
    let newsQuery = collection(db, "noticias");
    let queryConstraints = [orderBy("fecha_subida", "desc")];

    // DESHABILITADO TEMPORALMENTE: Sin restricción premium para pruebas
    // const isPremium = currentUserData?.is_premium || false;

    // if (!isPremium) {
    //     queryConstraints.push(limit(20));
    // } else {
    //     queryConstraints.push(limit(100));
    // }

    // Para pruebas: cargar todas las noticias sin límite
    queryConstraints.push(limit(100));

    newsQuery = query(newsQuery, ...queryConstraints);

    const querySnapshot = await getDocs(newsQuery);
    // Aplicamos la normalización aquí mismo al recibir los datos
    allNews = querySnapshot.docs.map(doc => normalizarNoticia(doc));

    console.log(`✅ Se cargaron ${allNews.length} noticias y se normalizaron categorías.`);

    console.log(`✅ Se cargaron ${allNews.length} noticias desde Firebase`);
    console.log(`Ejemplo de noticia:`, allNews[0]);

    // Poblar los filtros con los datos obtenidos
    populateFilters(allNews);

    // Exponer noticias globalmente para el dashboard
    window.allNews = allNews;

    // Mostrar todas las noticias inicialmente
    renderNews(allNews);

    // Actualizar Dashboard si existe la función
    if (typeof window.updateDashboard === 'function') {
      window.updateDashboard(allNews);
    }

  } catch (e) {
    console.error("Error al cargar las noticias: ", e);
    newsGrid.innerHTML = `<p class="md:col-span-3 text-center text-red-500 text-lg">Error al conectar con la base de datos: ${e.message}</p>`;
  }

  loadingMessage.classList.add('hidden');
}

// --- EVENT LISTENERS ---

applyFiltersBtn.addEventListener('click', applyFilters);

// También aplicar filtros al cambiar cualquier selector
filterPortal.addEventListener('change', applyFilters);
filterCategoria.addEventListener('change', applyFilters);
filterPais.addEventListener('change', applyFilters);
filterFecha.addEventListener('change', applyFilters);

updateNewsBtn.addEventListener('click', async () => {
  // Comentado para pruebas
  // if (!currentUserData?.is_premium) {
  //     alert("Esta función es solo para usuarios Premium. Simula un upgrade para probar.");
  //     return;
  // }

  updateNewsBtn.disabled = true;
  updateNewsBtn.textContent = 'Actualizando...';

  try {
    const response = await fetch('http://127.0.0.1:5000/api/actualizar', { method: 'POST' });
    const result = await response.json();

    if (response.ok) {
      alert(result.message);
    } else {
      alert(`Error en el servidor de scraping: ${result.message}`);
    }
  } catch (e) {
    alert("Error de conexión con el servidor de scraping (Flask). ¿Está corriendo?");
    console.error("Error de fetch:", e);
  }

  updateNewsBtn.textContent = 'Actualizar Ahora';
  updateNewsBtn.disabled = false;

  setTimeout(loadNews, 5000);
});

// --- INICIO DE LA APP ---

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userData = await getUserData(user.uid);
    updateUIForUser(user, userData);
  } else {
    updateUIForUser(null, null);
  }
});

// Event listener para el botón de login en el navbar
document.getElementById('login-btn-nav')?.addEventListener('click', () => showAuthModal(false));

// --- NAVEGACIÓN ---

function navigateTo(sectionId) {
  // Ocultar todas las secciones
  document.getElementById('main-content').classList.add('hidden');
  document.getElementById('favorites-content').classList.add('hidden');
  document.getElementById('admin-content').classList.add('hidden');

  // Mostrar la sección seleccionada
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.remove('hidden');
  }

  // Actualizar estado visual de los botones de navegación
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('text-primary-blue', 'bg-blue-50', 'dark:bg-blue-900/20');
    link.classList.add('text-gray-600', 'dark:text-gray-400');
  });

  // Encontrar el link activo y resaltarlo
  let activeLink;
  if (sectionId === 'main-content') activeLink = document.getElementById('nav-home');
  if (sectionId === 'favorites-content') activeLink = document.getElementById('nav-favorites');
  if (sectionId === 'admin-content') {
    activeLink = document.getElementById('nav-configuracion') || document.getElementById('nav-dashboard-admin');
  }

  if (activeLink) {
    activeLink.classList.remove('text-gray-600', 'dark:text-gray-400');
    activeLink.classList.add('text-primary-blue', 'bg-blue-50', 'dark:bg-blue-900/20');
  }

  // Si vamos al dashboard, actualizarlo
  if (sectionId === 'admin-content' && typeof window.updateDashboard === 'function') {
    window.updateDashboard(window.allNews || []);
  }
}

// Event Listeners para Navegación
document.getElementById('nav-home')?.addEventListener('click', (e) => {
  e.preventDefault();
  navigateTo('main-content');
});

document.getElementById('nav-favorites')?.addEventListener('click', (e) => {
  e.preventDefault();
  navigateTo('favorites-content');
});

document.getElementById('nav-configuracion')?.addEventListener('click', (e) => {
  e.preventDefault();
  navigateTo('admin-content');
});

document.getElementById('nav-dashboard-admin')?.addEventListener('click', (e) => {
  e.preventDefault();
  navigateTo('admin-content');
});

// Manejar hash en la URL al cargar
window.addEventListener('load', () => {
  const hash = window.location.hash;
  if (hash === '#favorites') navigateTo('favorites-content');
  else if (hash === '#configuracion' || hash === '#dashboard') navigateTo('admin-content');
  else navigateTo('main-content');
});