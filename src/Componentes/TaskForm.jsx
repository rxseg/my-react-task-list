import { VscAdd } from "react-icons/vsc";
import { useState } from "react";

export const TaskForm = ({ createTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length < 3) {
      setError(true);
    } else if (title.length === 0) {
      setError(true);
    } else {
      createTask({ title: title, description: description });
    }
    setTitle("");
    setDescription("");
  };
  return (
    <form className="container-texto" onSubmit={handleSubmit}>
      <input
        className="texto"
        placeholder="Add your new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {error ? (
        <span className="error" role="alert">
          La tarea debe tener al menos 3 o más caractéres
        </span>
      ) : (
        <></>
      )}
      <textarea
        className="textarea"
        placeholder="Add a description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="div-btnadd">
        <button className="btn">Agregar</button>
      </div>
    </form>
  );
};
