import { VscAdd } from "react-icons/vsc";
import { useState } from "react";

export const TaskForm = ({ createTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    createTask({ title, description });
  };
  return (
    <form className="container-texto" onSubmit={handleSubmit}>
      <input
        className="texto"
        placeholder="Add your new todo"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn">
        <VscAdd />
      </button>
      <textarea
        className="textarea"
        placeholder="Add a description"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
    </form>
  );
};
