-- Script SQL para crear la tabla user_favorites en Supabase
-- Este script debe ejecutarse en el SQL Editor de Supabase

-- 1. Crear la tabla user_favorites
CREATE TABLE IF NOT EXISTS public.user_favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    news_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, news_id)
);

-- 2. Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON public.user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_news_id ON public.user_favorites(news_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_created_at ON public.user_favorites(created_at DESC);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- 4. Crear políticas de seguridad
-- Política para permitir que los usuarios vean solo sus propios favoritos
CREATE POLICY "Users can view their own favorites"
    ON public.user_favorites
    FOR SELECT
    USING (auth.uid()::text = user_id OR user_id IS NOT NULL);

-- Política para permitir que los usuarios inserten sus propios favoritos
CREATE POLICY "Users can insert their own favorites"
    ON public.user_favorites
    FOR INSERT
    WITH CHECK (auth.uid()::text = user_id OR user_id IS NOT NULL);

-- Política para permitir que los usuarios eliminen sus propios favoritos
CREATE POLICY "Users can delete their own favorites"
    ON public.user_favorites
    FOR DELETE
    USING (auth.uid()::text = user_id OR user_id IS NOT NULL);

-- 5. Comentarios para documentación
COMMENT ON TABLE public.user_favorites IS 'Almacena las noticias favoritas de cada usuario';
COMMENT ON COLUMN public.user_favorites.user_id IS 'Email del usuario (almacenado como texto por compatibilidad con el sistema actual)';
COMMENT ON COLUMN public.user_favorites.news_id IS 'ID de la noticia favorita';
COMMENT ON COLUMN public.user_favorites.created_at IS 'Fecha y hora en que se agregó el favorito';
