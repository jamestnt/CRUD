import { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/taskService';
import { Task } from '../types';
import { TextField, Button, Alert, Box } from '@mui/material';

interface Props {
  onTaskCreated: (task: Task) => void;
  onTaskUpdated?: (task: Task) => void;
  task?: Task;
}

const TaskForm: React.FC<Props> = ({ onTaskCreated, onTaskUpdated, task }) => {
  const [titulo, setTitulo] = useState(task?.titulo || '');
  const [descripcion, setDescripcion] = useState(task?.descripcion || '');
  const [fechaVencimiento, setFechaVencimiento] = useState(task?.fecha_vencimiento || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setTitulo(task?.titulo || '');
    setDescripcion(task?.descripcion || '');
    setFechaVencimiento(task?.fecha_vencimiento || '');
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (task) {
        const updatedTask = await updateTask(task.id, { titulo, descripcion, fecha_vencimiento: fechaVencimiento });
        onTaskUpdated?.(updatedTask);
      } else {
        const newTask = await createTask({ titulo, descripcion, fecha_vencimiento: fechaVencimiento });
        onTaskCreated(newTask);
      }
      setTitulo('');
      setDescripcion('');
      setFechaVencimiento('');
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setTitulo('');
    setDescripcion('');
    setFechaVencimiento('');
    setError('');
    onTaskUpdated?.(task!);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        label="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <TextField
        fullWidth
        label="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        multiline
        rows={4}
      />
      <TextField
        fullWidth
        label="Fecha de vencimiento"
        type="date"
        value={fechaVencimiento}
        onChange={(e) => setFechaVencimiento(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          fullWidth
          variant="contained"
          type="submit"
        >
          {task ? 'Actualizar' : 'Crear'}
        </Button>
        {task && (
          <Button
            fullWidth
            variant="outlined"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        )}
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

export default TaskForm;