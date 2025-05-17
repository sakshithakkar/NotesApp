import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onUpdate }) => (
  <ul className="task-grid">
    {tasks.map((task, i) => (
        <TaskItem key={task._id} task={task} onUpdate={onUpdate} index={i} />
    ))}
  </ul>
);

export default TaskList;
