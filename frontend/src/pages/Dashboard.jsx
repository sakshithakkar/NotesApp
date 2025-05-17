import { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../auth';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import './Dashboard.css'
const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    // Get email from localStorage
    const userEmail = localStorage.getItem('userEmail') || 'User';
    const navigate = useNavigate();

    const fetchTasks = async () => {
        const res = await API.get('/tasks');
        setTasks(res.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleLogout = () => {
        removeToken();
        navigate('/login')
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>My Notes</h1>
                <div className="dashboard-right">
                    <span className="welcome-msg">Welcome {userEmail}, Add your tasks and stay organized today ✨</span>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </header>

            <main className="dashboard-main">
                <TaskForm onAdd={fetchTasks} />
                <TaskList tasks={tasks} onUpdate={fetchTasks} />
            </main>
        </div>
    );
};

export default Dashboard;
