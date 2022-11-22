import { AiOutlinePlus } from "react-icons/ai";
import React from "react";
import "./Header.css";
import { useState } from "react";

export const Header = (props) => {
  console.log(props);
  const [lista, setLista] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    props.handleOnSubmit(lista);
    setLista("");
    /*  window.location.reload(); */
  };

  //inicio para agregar tarea
  return (
    <div className="Header">
      <h1>LISTA DE TAREAS</h1>
      <form onSubmit={onSubmit} className="formu">
        <input
          type="text"
          placeholder="Agregar nueva tarea"
          value={lista}
          onChange={(e) => {
            setLista(e.target.value);
          }}
        />
        <button className="button-btn">Agregar</button>
      </form>
    </div>
  );
};

export default Header;
