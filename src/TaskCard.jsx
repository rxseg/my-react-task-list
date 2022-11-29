import { VscEdit, VscRemove } from "react-icons/vsc";
import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";
export const TaskCard = ({ task, deleteTask, editTask }) => {
  const [checkedItems, setCheckedItems] = useState(false);
  return (
    <div className="in-tasks">
      <div className="junto">
        <Checkbox
          isChecked={checkedItems}
          onChange={(e) => setCheckedItems([e.target.checked, !checkedItems])}
          colorScheme="green"
          defaultChecked
        ></Checkbox>
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
