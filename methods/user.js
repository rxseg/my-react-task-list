const express = require("express");
const userRouter = express.Router();
const userSchema = require("../models/users");
const jwt = require("jsonwebtoken");

userRouter.post("/signup", async (req, res) => {
  const { nombre, apellido, email, password } = req.body;
  if (!email)
    return res
      .status(404)
      .json({ msg: "Se requiere email para esta peticion" });
  try {
    const alreadyUser = await userSchema.findOne({
      email: email,
    });
    if (alreadyUser)
      return res
        .status(404)
        .json({ msg: "Ya existe un usuario con ese email" });
    const usuarios = userSchema({
      nombre,
      apellido,
      email,
      password: await userSchema.encryptPassword(password),
    });
    await usuarios.save();
    res.json({ msg: "Usuario creado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hable con el admin" });
  }
});

userRouter.patch("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(404)
      .json({ message: "se requiere email y contraseña para esta peticion" });
  try {
    const usuarios = await userSchema.findOne({
      email: email,
    });
    if (!usuarios)
      return res
        .status(404)
        .json({ message: "Usuario no registrado", usuarios: null });
    const matchPassword = await userSchema.comparePassword(
      req.body.password,
      usuarios.password
    );
    if (!matchPassword)
      return res
        .status(401)
        .json({ token: null, message: "Contraseña Incorrecta" });
    const token = jwt.sign(
      {
        usuarios,
      },
      "roberttokencv",
      { expiresIn: 60 * 60 }
    );
    res.json({ usuarios, message: "Has iniciado sesión correctamente", token });
  } catch (error) {
    res.status(500).json({ message: "hable con el admin" });
  }
});
module.exports = userRouter;
