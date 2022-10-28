import "./App.css";
import { TaskList } from "./Componentes/TaskList";
import { TaskForm } from "./Componentes/TaskForm";
import { tasks as data } from "./tareas";
import { useState, useEffect } from "react";
import { VscReplace } from "react-icons/vsc";

export const App = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(data);
  }, []);
  const createTask = (task) => {
    setTasks([
      ...tasks,
      {
        title: task.title,
        id: tasks.length,
        description: task.description,
      },
    ]);
  };
  const deleteTask = (TaskId) => {
    setTasks(tasks.filter((task) => task.id !== TaskId));
  };

  const editTask = (id) => {
    let newEditItem = tasks.find((element) => {
      return element.id === id;
    });
    newEditItem = prompt("Modify task");
    let newTask = localStorage.getItem("tasks");
    if (newEditItem.value !== "") {
      let resultado = JSON.parse(newTask);
      resultado.splice(newEditItem, 1, { title: newEditItem, id: newEditItem });

      console.log(resultado);
      setTasks(resultado);
      console.log(resultado.title);
    }
  };

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="main-container">
      <div className="sub-container">
        <h1>Todo App</h1>
        <TaskForm createTask={createTask} />
        <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
      </div>
    </div>
  );
};
