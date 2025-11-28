# 📝 Instrucciones para Configurar la Tabla de Favoritos en Supabase

## 🔴 Error Actual
```
Could not find the table 'public.user_favorites' in the schema cache
```

Este error ocurre porque la tabla `user_favorites` no existe en tu base de datos de Supabase.

---

## ✅ Solución: Crear la Tabla en Supabase

### **Paso 1: Acceder a Supabase Dashboard**

1. Ve a: https://supabase.com/dashboard
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto: **bziuhbswzpcqduitponw**

### **Paso 2: Abrir el SQL Editor**

1. En el menú lateral izquierdo, haz clic en **"SQL Editor"** (ícono de código)
2. Haz clic en el botón **"New query"** o **"+ New Query"**

### **Paso 3: Ejecutar el Script SQL**

1. Copia TODO el contenido del archivo `create_user_favorites_table.sql`
2. Pégalo en el editor SQL de Supabase
3. Haz clic en el botón **"Run"** (Ejecutar) en la esquina inferior derecha

### **Paso 4: Verificar la Creación**

1. Ve a la sección **"Table Editor"** en el menú lateral
2. Deberías ver la nueva tabla **"user_favorites"** en la lista
3. La tabla debe tener las siguientes columnas:
   - `id` (UUID, Primary Key)
   - `user_id` (Text)
   - `news_id` (Text)
   - `created_at` (Timestamp)

---

## 📊 Estructura de la Tabla `user_favorites`

| Columna      | Tipo         | Descripción                          |
|-------------|--------------|--------------------------------------|
| `id`        | UUID         | ID único del favorito (auto-generado)|
| `user_id`   | TEXT         | Email del usuario                    |
| `news_id`   | TEXT         | ID de la noticia favorita            |
| `created_at`| TIMESTAMPTZ  | Fecha de creación del favorito       |

**Restricción Única:** Un usuario no puede guardar la misma noticia dos veces (UNIQUE constraint en `user_id` + `news_id`)

---

## 🔐 Seguridad (RLS - Row Level Security)

La tabla incluye políticas de seguridad para:
- ✅ Los usuarios solo pueden ver sus propios favoritos
- ✅ Los usuarios solo pueden insertar sus propios favoritos
- ✅ Los usuarios solo pueden eliminar sus propios favoritos

---

## 🧪 Probar el Sistema de Favoritos

Después de crear la tabla:

1. **Recarga tu aplicación web** (F5 o Ctrl+R)
2. **Inicia sesión** con cualquier email
3. **Activa el plan Premium** (botón "Premium" → simular pago)
4. **Haz clic en cualquier corazón ❤️** de una noticia
5. **Verifica que funciona:**
   - El corazón se pone rojo
   - El contador en el header se actualiza
   - Click en el corazón del header muestra tus favoritos

---

## 🐛 Troubleshooting

### Si sigues viendo el error después de crear la tabla:

1. **Verifica que la tabla existe:**
   ```sql
   SELECT * FROM public.user_favorites LIMIT 1;
   ```

2. **Verifica los permisos RLS:**
   - Ve a Table Editor → user_favorites → Policies
   - Deben aparecer 3 políticas (SELECT, INSERT, DELETE)

3. **Recarga el schema cache:**
   - En Supabase, ve a Settings → API
   - Haz clic en "Refresh" o "Reload Schema"

4. **Verifica la URL y API Key en index.html:**
   ```javascript
   const supabaseUrl = 'https://bziuhbswzpcqduitponw.supabase.co';
   const supabaseKey = 'eyJhbGci...'; // Tu API Key
   ```

---

## 📝 Ejemplo de Datos en la Tabla

Después de agregar favoritos, la tabla se verá así:

| id | user_id | news_id | created_at |
|----|---------|---------|------------|
| uuid-1 | usuario@email.com | abc123 | 2025-01-21 10:30:00 |
| uuid-2 | usuario@email.com | def456 | 2025-01-21 10:35:00 |
| uuid-3 | otro@email.com | abc123 | 2025-01-21 11:00:00 |

---

## ⚡ Comandos SQL Útiles

### Ver todos los favoritos:
```sql
SELECT * FROM public.user_favorites ORDER BY created_at DESC;
```

### Contar favoritos por usuario:
```sql
SELECT user_id, COUNT(*) as total_favoritos
FROM public.user_favorites
GROUP BY user_id
ORDER BY total_favoritos DESC;
```

### Eliminar todos los favoritos (CUIDADO):
```sql
DELETE FROM public.user_favorites;
```

### Ver favoritos de un usuario específico:
```sql
SELECT * FROM public.user_favorites
WHERE user_id = 'usuario@email.com';
```

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que el script SQL se ejecutó sin errores
2. Revisa la consola del navegador (F12) para mensajes de error
3. Verifica que tu plan de Supabase tiene suficientes recursos
4. Revisa que no hay errores de autenticación en Supabase

---

¡Listo! Una vez ejecutado el script SQL, el sistema de favoritos debería funcionar perfectamente. ❤️
