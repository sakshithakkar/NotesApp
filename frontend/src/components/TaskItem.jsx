import { FaCheckCircle, FaRegCircle, FaTrashAlt } from 'react-icons/fa';
import API from '../services/api';
import './TaskItem.css';

const TaskItem = ({ task, onUpdate, index  }) => {
    const pastelColors = ['#fae0eda6', '#e1eefacf', '#e6fae6', '#fff4e0d4',  '#FFE4E1', '#E0FFFF', '#FFDDEE', '#DDEEFF', '#DDFFDD', '#FFF3DD',];
  // Pick color based on index but offset by 1 to avoid repeating the first color at 5th item
  const color = pastelColors[(index + 2) % pastelColors.length];
  const toggleComplete = async () => {
    await API.put(`/tasks/${task._id}`, { completed: !task.completed });
    onUpdate();
  };

  const deleteTask = async () => {
    await API.delete(`/tasks/${task._id}`);
    onUpdate();
  };

  return (
    <li style={{ backgroundColor: color, padding: '16px', borderRadius: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="task-left" onClick={toggleComplete}>
        {task.completed ? (
          <FaCheckCircle className="task-icon completed" />
        ) : (
          <FaRegCircle className="task-icon" />
        )}
        <span className={`task-text ${task.completed ? 'completed' : ''}`}>
          {task.name}
        </span>
      </div>
      <button className="delete-btn" onClick={deleteTask}>
        <FaTrashAlt />
      </button>
    </li>
  );
};

export default TaskItem;
