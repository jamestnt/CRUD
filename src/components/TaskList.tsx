import { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../services/taskService';
import { Task } from '../types';
import TaskForm from './TaskForm';
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Grid,
  Box,
  Typography,
  Alert,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setSelectedTask(undefined);
  };

  const isExpired = (fecha_vencimiento?: string) =>
    fecha_vencimiento ? new Date(fecha_vencimiento) < new Date() : false;

  const filteredTasks = tasks.filter((task) =>
    task.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Mis Tareas
      </Typography>
      <TextField
        fullWidth
        label="Buscar tareas"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        margin="normal"
      />
      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
      <Grid container spacing={2}>
        <Grid>
          <Card sx={{ bgcolor: 'background.paper' }}>
            <CardContent>
              <TaskForm
                onTaskCreated={(newTask) => setTasks([...tasks, newTask])}
                task={selectedTask}
                onTaskUpdated={handleTaskUpdated}
              />
            </CardContent>
          </Card>
        </Grid>
        {filteredTasks.map((task) => (
          <Grid>
            <Card sx={{ bgcolor: isExpired(task.fecha_vencimiento) ? '#3f1c1c' : 'background.paper' }}>
              <CardContent>
                <Typography variant="h6">{task.titulo}</Typography>
                {task.descripcion && <Typography variant="body2">{task.descripcion}</Typography>}
                <Typography variant="caption">
                  Fecha: {task.fecha_vencimiento || 'Sin fecha'}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(task)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(task.id)}>
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TaskList;