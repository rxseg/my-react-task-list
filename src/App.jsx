import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Componentes/Home";
import SobreNosotros from "./Componentes/SobreNosotros";
import Task from "./Task";

export const App = () => {
  return (
    <>
      <nav className="nav-menu">
        <Link to="/Home" className="link-nav">
          <h2 className="h2-nav">HOME</h2>
        </Link>
        <Link to="/TaskList" className="link-nav">
          <h2 className="h2-nav">LISTA DE TAREAS</h2>
        </Link>
        <Link to="/AboutUs" className="link-nav">
          <h2 className="h2-nav">SOBRE NOSOTROS</h2>
        </Link>
      </nav>
      <Routes>
        <Route path="/Home" element={<Home />}></Route>
      </Routes>
      <Routes>
        <Route path="/TaskList" element={<Task />}></Route>
      </Routes>
      <Routes>
        <Route path="/AboutUs" element={<SobreNosotros />}></Route>
      </Routes>
    </>
  );
};
