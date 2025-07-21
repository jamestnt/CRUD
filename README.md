# Prueba Técnica CRUD con Supabase y React

## Requisitos
- Node.js v16+
- npm v8+
- Cuenta en Supabase

## Instalación
1. Clona el repositorio: `git clone <URL>`
2. Instala dependencias: `npm install`
3. Configura las credenciales de Supabase en `src/supabaseClient.ts` con tu `supabaseUrl` y `supabaseKey`
4. Crea la tabla `tareas` en Supabase y habilita RLS (ver SQL en el código)

## Ejecución
- `npm start` para iniciar el proyecto en `http://localhost:3000`

## Despliegue (Opcional)
1. Sube el proyecto a Vercel/Netlify
2. Configura las variables de entorno `REACT_APP_SUPABASE_URL` y `REACT_APP_SUPABASE_KEY`