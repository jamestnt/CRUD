import supabase from '../supabaseClient';
import { Task } from '../types';

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const createTask = async (task: Omit<Task, 'id' | 'user_id' | 'created_at'>) => {
  const user = await getUser();
  const { data, error } = await supabase
    .from('tareas')
    .insert([{ ...task, user_id: user?.id }])
    .select();
  if (error) throw error;
  return data[0] as Task;
};

export const getTasks = async () => {
  const user = await getUser();
  const { data, error } = await supabase
    .from('tareas')
    .select('*')
    .eq('user_id', user?.id);
  if (error) throw error;
  return data as Task[];
};

export const updateTask = async (id: string, updates: Partial<Task>) => {
  const user = await getUser();
  const { data, error } = await supabase
    .from('tareas')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user?.id)
    .select();
  if (error) throw error;
  return data[0] as Task;
};

export const deleteTask = async (id: string) => {
  const user = await getUser();
  const { error } = await supabase
    .from('tareas')
    .delete()
    .eq('id', id)
    .eq('user_id', user?.id);
  if (error) throw error;
};