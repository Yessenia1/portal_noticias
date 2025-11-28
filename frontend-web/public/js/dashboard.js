
// /frontend-web/public/js/dashboard.js

// Variable global para almacenar las instancias de los gráficos y destruirlos antes de redibujar
let chartSources = null;
let chartCategories = null;

/**
 * Función principal para actualizar todo el dashboard
 * @param {Array} news - Array de objetos de noticias
 */
function updateDashboard(news) {
    console.log("📊 Actualizando Dashboard con", news.length, "noticias");

    if (!news || news.length === 0) {
        console.warn("⚠️ No hay noticias para mostrar en el dashboard");
        return;
    }

    // 1. Actualizar KPIs
    updateKPIs(news);

    // 2. Renderizar Gráficos
    renderSourceChart(news);
    renderCategoryChart(news);

    // 3. Actualizar Tabla de Tiempos
    updateTimeTable(news);

    // 4. Generar Nube de Palabras
    generateWordCloud(news);
}

/**
 * Calcula y actualiza los indicadores clave (KPIs)
 */
function updateKPIs(news) {
    // Total Noticias
    const totalNews = news.length;
    animateValue("kpi-total-news", 0, totalNews, 1000);

    // Fuentes Activas
    const uniqueSources = [...new Set(news.map(n => n.fuente))].length;
    animateValue("kpi-total-sources", 0, uniqueSources, 1000);

    // Noticias de Hoy
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const newsToday = news.filter(n => {
        const date = n.fecha_publicacion?.toDate?.() || n.fecha_subida?.toDate?.() || new Date(0);
        date.setHours(0, 0, 0, 0);
        return date.getTime() === today.getTime();
    }).length;
    
    animateValue("kpi-news-today", 0, newsToday, 1000);

    // Crecimiento (Simulado por ahora, comparando con "ayer" que sería un random o 0)
    // En un caso real, necesitaríamos datos históricos.
    const growth = Math.floor(Math.random() * 20) + 5; // Simulado entre 5% y 25%
    document.getElementById("kpi-growth").textContent = `+${growth}%`;
}

/**
 * Renderiza el gráfico de barras por fuente
 */
function renderSourceChart(news) {
    const sourceCounts = {};
    news.forEach(n => {
        const source = n.fuente || "Desconocido";
        sourceCounts[source] = (sourceCounts[source] || 0) + 1;
    });

    // Ordenar y tomar top 10
    const sortedSources = Object.entries(sourceCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const options = {
        series: [{
            name: 'Noticias',
            data: sortedSources.map(i => i[1])
        }],
        chart: {
            type: 'bar',
            height: 350,
            toolbar: { show: false },
            fontFamily: 'Inter, sans-serif'
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
                distributed: true
            }
        },
        colors: ['#3b82f6', '#10b981', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#84cc16', '#06b6d4', '#0ea5e9'],
        dataLabels: { enabled: false },
        xaxis: {
            categories: sortedSources.map(i => i[0]),
        },
        theme: {
            mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        }
    };

    const chartEl = document.querySelector("#chart-sources");
    if (chartEl) {
        if (chartSources) chartSources.destroy();
        chartSources = new ApexCharts(chartEl, options);
        chartSources.render();
    }
}

/**
 * Renderiza el gráfico de donut por categoría
 */
function renderCategoryChart(news) {
    const catCounts = {};
    news.forEach(n => {
        const cat = n.categoria || "General";
        catCounts[cat] = (catCounts[cat] || 0) + 1;
    });

    const sortedCats = Object.entries(catCounts).sort((a, b) => b[1] - a[1]);

    const options = {
        series: sortedCats.map(i => i[1]),
        chart: {
            type: 'donut',
            height: 350,
            fontFamily: 'Inter, sans-serif'
        },
        labels: sortedCats.map(i => i[0]),
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#64748b'],
        plotOptions: {
            pie: {
                donut: {
                    size: '70%'
                }
            }
        },
        legend: {
            position: 'bottom'
        },
        theme: {
            mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        }
    };

    const chartEl = document.querySelector("#chart-categories");
    if (chartEl) {
        if (chartCategories) chartCategories.destroy();
        chartCategories = new ApexCharts(chartEl, options);
        chartCategories.render();
    }
}

/**
 * Actualiza la tabla de tiempos de actualización
 */
function updateTimeTable(news) {
    const tbody = document.getElementById("update-time-tbody");
    if (!tbody) return;

    // Agrupar por fuente para encontrar la más reciente
    const sourceStats = {};
    
    news.forEach(n => {
        const source = n.fuente || "Desconocido";
        const date = n.fecha_publicacion?.toDate?.() || n.fecha_subida?.toDate?.() || new Date(0);
        
        if (!sourceStats[source] || date > sourceStats[source]) {
            sourceStats[source] = date;
        }
    });

    tbody.innerHTML = Object.entries(sourceStats)
        .sort((a, b) => b[1] - a[1]) // Más recientes primero
        .map(([source, date]) => {
            const timeAgo = getTimeAgo(date);
            return `
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">${source}</td>
                    <td class="px-4 py-3 text-gray-500 dark:text-gray-400">${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full ${timeAgo.includes('min') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                            ${timeAgo}
                        </span>
                    </td>
                </tr>
            `;
        }).join('');
}

/**
 * Genera una nube de palabras simple basada en los títulos
 */
function generateWordCloud(news) {
    const container = document.getElementById("word-cloud");
    if (!container) return;

    // Palabras a ignorar (stopwords muy básicas en español)
    const stopWords = new Set(['de', 'la', 'el', 'en', 'y', 'a', 'los', 'del', 'se', 'las', 'por', 'un', 'para', 'con', 'no', 'una', 'su', 'al', 'lo', 'como', 'más', 'pero', 'sus', 'le', 'ya', 'o', 'fue', 'este', 'ha', 'sí', 'porque', 'esta', 'son', 'entre', 'está', 'cuando', 'muy', 'sin', 'sobre', 'también', 'me', 'hasta', 'hay', 'donde', 'quien', 'desde', 'todo', 'nos', 'durante', 'todos', 'uno', 'les', 'ni', 'contra', 'otros', 'ese', 'eso', 'ante', 'ellos', 'e', 'esto', 'mí', 'antes', 'algunos', 'qué', 'unos', 'yo', 'otro', 'otras', 'otra', 'él', 'tanto', 'esa', 'estos', 'mucho', 'quienes', 'nada', 'muchos', 'cual', 'poco', 'ella', 'estar', 'estas', 'algunas', 'algo', 'nosotros', 'mi', 'mis', 'tú', 'te', 'ti', 'tu', 'tus', 'ellas', 'nosotras', 'vosotros', 'vosotras', 'os', 'mío', 'mía', 'míos', 'mías', 'tuyo', 'tuya', 'tuyos', 'tuyas', 'suyo', 'suya', 'suyos', 'suyas', 'nuestro', 'nuestra', 'nuestros', 'nuestras', 'vuestro', 'vuestra', 'vuestros', 'vuestras', 'esos', 'esas', 'estoy', 'estás', 'está', 'estamos', 'estáis', 'están', 'esté', 'estés', 'estemos', 'estéis', 'estén', 'estaré', 'estarás', 'estará', 'estaremos', 'estaréis', 'estarán', 'estaría', 'estarías', 'estaríamos', 'estaríais', 'estarían', 'estaba', 'estabas', 'estábamos', 'estabais', 'estaban', 'estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron', 'hubiera', 'hubieras', 'hubiéramos', 'hubierais', 'hubieran', 'hubiese', 'hubieses', 'hubiésemos', 'hubieseis', 'hubiesen', 'habiendo', 'estado', 'estada', 'estados', 'estadas', 'soy', 'eres', 'es', 'somos', 'sois', 'son', 'sea', 'seas', 'seamos', 'seáis', 'sean', 'seré', 'serás', 'será', 'seremos', 'seréis', 'serán', 'sería', 'serías', 'seríamos', 'seríais', 'serían', 'era', 'eras', 'éramos', 'erais', 'eran', 'fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron', 'fuera', 'fueras', 'fuéramos', 'fuerais', 'fueran', 'fuese', 'fueses', 'fuésemos', 'fueseis', 'fuesen', 'sintiendo', 'sentido', 'sentida', 'sentidos', 'sentidas', 'siente', 'sentid', 'tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen', 'tenga', 'tengas', 'tengamos', 'tengáis', 'tengan', 'tendré', 'tendrás', 'tendrá', 'tendremos', 'tendréis', 'tendrán', 'tendría', 'tendrías', 'tendríamos', 'tendríais', 'tendrían', 'tenía', 'tenías', 'teníamos', 'teníais', 'tenían', 'tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvisteis', 'tuvieron', 'tuviera', 'tuvieras', 'tuviéramos', 'tuvierais', 'tuvieran', 'tuviese', 'tuvieses', 'tuviésemos', 'tuvieseis', 'tuviesen', 'teniendo', 'tenido', 'tenida', 'tenidos', 'tenidas', 'tened']);

    const wordCounts = {};
    news.forEach(n => {
        const words = (n.titulo || "").toLowerCase().split(/\s+/);
        words.forEach(w => {
            const cleanWord = w.replace(/[^a-záéíóúñ]/g, "");
            if (cleanWord.length > 3 && !stopWords.has(cleanWord)) {
                wordCounts[cleanWord] = (wordCounts[cleanWord] || 0) + 1;
            }
        });
    });

    const sortedWords = Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15);

    container.innerHTML = sortedWords.map(([word, count], index) => {
        const size = Math.max(0.8, Math.min(2.5, 0.8 + (count * 0.1)));
        const opacity = Math.max(0.5, Math.min(1, 0.5 + (count * 0.05)));
        const colors = ['text-blue-500', 'text-indigo-500', 'text-purple-500', 'text-pink-500', 'text-teal-500'];
        const color = colors[index % colors.length];
        
        return `<span class="${color} font-bold hover:scale-110 transition cursor-default" style="font-size: ${size}rem; opacity: ${opacity}">${word}</span>`;
    }).join('');
}

// --- Utilidades ---

function animateValue(id, start, end, duration) {
    if (start === end) return;
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const obj = document.getElementById(id);
    
    if (!obj) return;

    const timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, Math.max(stepTime, 20)); // Mínimo 20ms para evitar bloqueo
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " años";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " meses";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " días";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " min";
    return Math.floor(seconds) + " seg";
}

// Exponer globalmente
window.updateDashboard = updateDashboard;
