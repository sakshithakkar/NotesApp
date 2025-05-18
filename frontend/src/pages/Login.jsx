import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // <-- add Link
import API from '../services/api';
import { setToken } from '../auth';
import './Login.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState({ email: false, password: false });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', { email, password });
            if (res.status == 200) {
                setTimeout(() => {
                    navigate('/', { replace: true }); // use replace
                  }, 300);
                toast.success('Login successful!');
                localStorage.setItem('userEmail', email); // store email locally
                setToken(res.data.token);
           
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Try again later!');
        }
    };

    const isFormValid = email.trim() !== '' && isValidEmail(email) && password.trim() !== '';

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
                {touched.email && email.trim() !== '' && !isValidEmail(email) && (
                    <p className="error-text">Invalid email format</p>
                )}
                <div className="password-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password *"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                        required
                    />
                    <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
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
