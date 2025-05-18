import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import './Login.css'; // reuse same CSS
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState({ email: false, password: false });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/register', { email, password });
            if (res.status == 201) {
                toast.success(res?.data?.message || 'User Created!');
                navigate('/login');
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Try again later!');
        }
    };

    const isFormValid = email.trim() !== '' && password.trim() !== '';

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleRegister}>
                <h2>Register</h2>

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

                <button type="submit" disabled={!isFormValid}>Register</button>

                <div className="register-link">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
