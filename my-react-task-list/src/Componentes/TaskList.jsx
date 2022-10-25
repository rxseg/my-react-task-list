import { VscAdd } from "react-icons/vsc";
export const TaskList = () => {
  return (
    <div className="container-texto">
      <input className="texto" placeholder="Add your new todo" />
      <button className="btn"><VscAdd/></button>
    </div>
  );
};
