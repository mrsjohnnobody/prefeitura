const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const Camara = require("./Camara");

const Secretarios = db.define("Secretarios", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoNomeacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroAto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  matricula: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Camara.hasMany(Secretarios, {
  foreignKey: "CamaraId",
});

Secretarios.belongsTo(Camara, { foreignKey: "CamaraId" });

module.exports = Secretarios;
