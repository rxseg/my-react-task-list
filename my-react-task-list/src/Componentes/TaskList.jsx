import { TaskCard } from "../TaskCard";
import "../App.css";
export const TaskList = ({ tasks, deleteTask, editTask }) => {
  if (tasks.length === 0) {
    return <h5 className="notarea">No hay tareas aún</h5>;
  }
  return (
    <div className="mapeo">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} deleteTask={deleteTask} editTask={editTask} />
      ))}
    </div>
  );
};
