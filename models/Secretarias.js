const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const Camara = require("./Camara");
const Secretarios = require("./Secretarios");

const Secretarias = db.define("Secretarias", {
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Secretarias.hasMany(Secretarios, {
  foreignKey: "SecretariaId",
});

Secretarios.belongsTo(Secretarias, { foreignKey: "SecretariaId" });

Camara.hasMany(Secretarias, {
  foreignKey: "CamaraId",
});

Secretarias.belongsTo(Camara, { foreignKey: "CamaraId" });

module.exports = Secretarias;
