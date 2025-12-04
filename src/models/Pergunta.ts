import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Pergunta = sequelize.define("Pergunta", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Pergunta;
