import React from "react";
import { List } from "./List";
import "./List.css";
export const TaskForm = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className="caj1">
        <h4 className="not-task">No hay tareas aun</h4>
      </div>
    );
  }
  return (
    <div className="caj2">
      {tasks.map((task) => (
        <List task={task} key={task.name} />
      ))}
    </div>
  );
};

export default TaskForm;
