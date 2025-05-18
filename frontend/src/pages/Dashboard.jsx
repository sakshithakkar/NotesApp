import { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../auth';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import './Dashboard.css'
const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    // Get email from localStorage
    const userEmail = localStorage.getItem('userEmail') || 'User';
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await API.get('/tasks');
            setTasks(res.data);
        } catch(err) {
            console.error('Error while loading tasks', err)
        } finally {
            setLoading(false)
        }
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
                    <div className="logout-btn" onClick={handleLogout}>Logout</div>
                </div>
            </header>

            <main className="dashboard-main">
                {loading ? (
                    <div className="loader">Loading tasks...</div> 
                ) : (
                    <>
                        <TaskForm onAdd={fetchTasks} />
                        <TaskList tasks={tasks} onUpdate={fetchTasks} />
                    </>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
