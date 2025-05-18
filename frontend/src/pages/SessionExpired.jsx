import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SessionExpired.css'; 

const SessionExpired = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="session-expired-container">
      <h2>Session Expired</h2>
      <p>Redirecting to login...</p>
    </div>
  );
};

export default SessionExpired;
