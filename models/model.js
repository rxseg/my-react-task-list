const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usuarios = require("./users");

const tasklistsSchema = new Schema(
  {
    nombre: String,
    descripcion: String,
    estado: Boolean,
    _idUser: { type: Schema.ObjectId, ref: usuarios },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("tasklists", tasklistsSchema);
