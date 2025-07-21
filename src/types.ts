export interface Task {
  id: string;
  user_id: string;
  titulo: string;
  descripcion?: string;
  fecha_vencimiento?: string;
  created_at: string;
}