export const Tasks = () => {
  return (
    <div className="tasks">
      <div className="in-tasks">
        <input type="radio" className="radio" />
        <p className="p">Hacer mis actividades</p>
      </div>
      <div className="in-tasks">
        <input type="radio" className="radio" />
        <p className="p">Hacer mis actividades</p>
      </div>
      <div className="in-tasks">
        <input type="radio" className="radio" />
        <del>
          <p className="p">Hacer mis actividades</p>
        </del>
      </div>
      <div className="in-tasks">
        <input type="radio" className="radio" />
        <del>
          <p className="p">Hacer mis actividades</p>
        </del>
      </div>
      <button className="delete">Delete</button>
    </div>
  );
};
