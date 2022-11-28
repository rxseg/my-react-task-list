import React from "react";
import { Link } from "react-router-dom";

function SobreNosotros() {
  return (
    <div className="link-div">
      <h1>Sobre Nosotros</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
        fugit vel earum, deleniti repellat illum, ratione quidem nemo dicta sit
        voluptates ipsam asperiores nihil dolorem labore obcaecati rerum minima?
        Accusantium.
      </p>
      <div className="div-task">
        <Link to="/Home">
          <button className="button-task">Volver</button>
        </Link>
      </div>
    </div>
  );
}

export default SobreNosotros;
