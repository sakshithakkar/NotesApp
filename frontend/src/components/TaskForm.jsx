import { useState } from 'react';
import API from '../services/api';
import './TaskForm.css';

const TaskForm = ({ onAdd }) => {
    const [name, setName] = useState('');

    const addTask = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        await API.post('/tasks', { name });
        setName('');
        onAdd();
    };

    return (
        <form onSubmit={addTask} className="task-form">
            <input
                className="task-input"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter a task..."
            />
            <button className="task-button" type="submit">Add</button>
        </form>
    );
};

export default TaskForm;
