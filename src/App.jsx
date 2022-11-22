import Header from "./components/Header";
import "./App.css";
import { TaskForm } from "./components/TaskForm";
import Task from "./components/Task";
import useTasks from '../src/hooks/useTasks';
//AQUI INICIA TODO
function App() {

  const { handleOnSubmit, tasks}= useTasks();
  //TABLA
  return (
    <div className="container">
      <Header handleOnSubmit={handleOnSubmit} />
      <TaskForm tasks={tasks} />
      <Task />
    </div>
  );
}

export default App;
//FINALIZA TODO