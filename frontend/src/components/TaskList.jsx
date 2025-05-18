import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onUpdate }) => (
  tasks.length === 0 ? (
    <div className="no-tasks-msg">
      🎉 You're all caught up! No tasks for now. Add something to get started.
    </div>
  ) : (
    <ul className="task-grid">
      {tasks.map((task, i) => (
        <TaskItem key={task._id} task={task} onUpdate={onUpdate} index={i} />
      ))}
    </ul>
  )
);

export default TaskList;
