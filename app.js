const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./methods/methods");
const connection = require("./connection/connection");
const routerUser = require("./methods/user");

//Middlewares

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", routerUser);
app.use("/api", router);
//Rutas
app.get("/Home", (req, res) => {
  res.status(200).json("Home");
});
app.get("/AboutUs", (req, res) => {
  res.status(200).send("AboutUs");
});
//Conexion

connection();

app.listen(8080, () => {
  console.log("Server running on port", 8080);
});
