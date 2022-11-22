import { useState, useEffect } from "react";

function useTasks() {
  const [tasks, setTasks] = useState([]);

  //FUNCION QUE NO GUARDE DOS DATOS IGUALES
  const handleOnSubmit = (taskName) => {
    if (!tasks.find((task) => task.name === taskName)) {
      setTasks([...tasks, { name: taskName }]);
    }
  };
  //GUARDANDO EL DATO EN UNA VARIABLE
  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);
  //RENDERIZAMOS EL DATO
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return { handleOnSubmit, tasks};
}
export default useTasks;
