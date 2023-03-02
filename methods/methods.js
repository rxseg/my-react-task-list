const express = require("express");
const verifyToken = require("../middleware/middleware");
const router = express.Router();
const taskSchema = require("../models/model");

router.post("/tasklist", verifyToken, (req, res) => {
  const task = taskSchema(req.body);
  task._idUser = req.headers._id;
  task
    .save()
    .then(() =>
      res.status(201).json({ message: "¡Tarea creada exitosamente!" })
    )
    .catch((error) => res.status(400).json({ message: error }));
});
//get all users
router.get("/tasklist", verifyToken, (req, res) => {
  const { _id } = req.headers;
  taskSchema
    .find({ _idUser: `${_id}` })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json({ message: error }));
});
//get by id
router.get("/tasklist/completed", verifyToken, (req, res) => {
  const { _id } = req.headers;
  taskSchema
    .find({ _idUser: `${_id}`, estado: true })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json({ message: error }));
});
//get completed tasks
router.get("/tasklist/incompleted", verifyToken, (req, res) => {
  const { _id } = req.headers;
  taskSchema
    .find({ _idUser: `${_id}`, estado: false })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json({ message: error }));
});
//get incompleted tasks
router.get("/tasklist/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  taskSchema
    .findById(id)
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json({ message: error }));
});
// update an user
router.put("/tasklist/:editar-tarea/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  taskSchema
    .updateOne({ _id: id }, { $set: { nombre, descripcion } })
    .then(() =>
      res.status(200).json({ message: "¡Tarea actualizada exitosamente!" })
    )
    .catch((error) => res.status(400).json({ message: error }));
});
router.put("/tasklist/:editar-estado/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  taskSchema
    .updateOne({ _id: id }, { $set: { estado } })
    .then(() =>
      res.status(200).json({
        message: `${
          estado === true ? "¡Tarea completada!" : "¡Tarea incompleta!"
        }`,
      })
    )
    .catch((error) => res.status(400).json({ message: error }));
});
//delete an user
router.delete("/tasklist/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const datos = await taskSchema.deleteOne({ _id: id });
    res.status(200).json({ message: "¡Tarea eliminada exitosamente!" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
