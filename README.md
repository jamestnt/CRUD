# Prueba CRUD con Supabase y React

## Despliegue
- Ver en https://crud-jwezujvf4-james-projects-d587118c.vercel.app/tasks
## Instalación
1. Clona el repositorio: `git clone https://github.com/jamestnt/CRUD.git`
2. Instala dependencias: `npm install`
3. Configura las credenciales de Supabase en `src/supabaseClient.ts` con tu `supabaseUrl` y `supabaseKey`
4. Crea la tabla `tareas` en Supabase y habilita RLS (ver SQL en el código)
   CREATE TABLE tareas (
id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
user_id uuid REFERENCES auth.users NOT NULL,
titulo text NOT NULL,
descripcion text,
fecha_vencimiento date,
created_at timestamp with time zone DEFAULT now(),
update_at timestamp with time zone DEFAULT now()
);

-- Solo ver tareas propias
CREATE POLICY "solo_ver_tareas_propias" ON tareas
FOR SELECT USING (auth.uid() = user_id);

-- Solo insertar tareas propias
CREATE POLICY "insertar_tareas_propias" ON tareas
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Solo actualizar tareas propias
CREATE POLICY "actualizar_tareas_propias" ON tareas
FOR UPDATE USING (auth.uid() = user_id);

-- Solo eliminar tareas propias
CREATE POLICY "eliminar_tareas_propias" ON tareas
FOR DELETE USING (auth.uid() = user_id);

## Ejecución
- `npm start` para iniciar el proyecto en `http://localhost:3000`

## Despliegue (Opcional)
1. Configura las variables de entorno `REACT_APP_SUPABASE_URL` y `REACT_APP_SUPABASE_KEY`