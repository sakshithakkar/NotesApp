import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // <-- add Link
import API from '../services/api';
import { setToken } from '../auth';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await API.post('/auth/login', { email, password });
    localStorage.setItem('userEmail', email); // store email locally
    setToken(res.data.token);
    navigate('/');
  };

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          required
        />
         {touched.email && email.trim() === '' && (
          <p className="error-text">Email is required</p>
        )}
        <input
          type="password"
          placeholder="Password *"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          required
        />
         {touched.password && password.trim() === '' && (
          <p className="error-text">Password is required</p>
        )}

        <button type="submit" disabled={!isFormValid}>Submit</button>

        <div className="register-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
