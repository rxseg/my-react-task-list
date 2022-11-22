import React, { useState, useEffect } from "react";
import "./Task.css";

export const Task = () => {
  const [log, setLog] = useState(0);
  const handleOnClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    let tarea = JSON.parse(localStorage.getItem("tasks"));
    if (tarea === null) {
      setLog(0);
    } else {
      setLog(tarea.length);
    }
  }, [log]);

  return (
    <div className="cajita">
      <section className="pendiente">
        <h3 className="parrafo"> Tienes {log} tareas pendientes </h3>
      </section>
      <div className="boton">
        <button onClick={handleOnClick} className="btn">
          Limpiar
        </button>
      </div>
    </div>
  );
};
export default Task;
