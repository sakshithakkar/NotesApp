import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { getToken } from './auth';

const App = () => {
  const isLoggedIn = !!getToken();

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
