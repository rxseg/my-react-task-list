import { VscEdit, VscRemove } from "react-icons/vsc";

export const TaskCard = ({ task, deleteTask, editTask }) => {
  return (
    <div className="in-tasks">
      <div className="junto">
        <input type="radio" className="radio" />
        <p className="p">{task.title}</p>
        <p className="p2">{task.description}</p>
      </div>
      <div className="btndiv">
        <button className="delete2" onClick={() => deleteTask(task.id)}>
          <VscRemove />
        </button>
        <button className="editar" onClick={() => editTask(task.id)}>
          <VscEdit />
        </button>
      </div>
    </div>
  );
};
