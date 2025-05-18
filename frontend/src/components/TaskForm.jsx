import { useState } from 'react';
import API from '../services/api';
import './TaskForm.css';
import { toast } from 'react-toastify';

const TaskForm = ({ onAdd }) => {
    const [name, setName] = useState('');

    const addTask = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            const res = await API.post('/tasks', { name });
            if(res.status == 201) {
                toast.success(res?.data?.message || 'Task Added!');
                setName('');
                onAdd();
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Try again later!');
        }
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
