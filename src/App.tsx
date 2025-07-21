import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from './supabaseClient';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/tasks" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/tasks" /> : <Register />} />
          <Route path="/tasks" element={user ? <TaskList /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={user ? '/tasks' : '/login'} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;