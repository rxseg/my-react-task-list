import "./App.css";
import { VscAdd } from "react-icons/vsc";
import { TaskList } from "./Componentes/TaskList";
import { Tasks } from "./Componentes/Tasks";

export const App = () => {
  return (
    <div className="main-container">
      <div className="sub-container">
      <h1>Todo App</h1>
      <TaskList/>
      <Tasks/>
      </div>
    </div>
  );
};
