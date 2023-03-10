const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const Camara = require("./Camara");
const Medicoes = require("./Medicoes");

const Obras = db.define("Obras", {
  dataAndamento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  secretaria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  objeto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  localExecucao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valorTotal: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  totalMed: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  percentualConcl: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

Obras.hasMany(Medicoes, {
  foreignKey: "ObraId",
});

Medicoes.belongsTo(Obras, { foreignKey: "ObraId" });

Camara.hasMany(Obras, {
  foreignKey: "CamaraId",
});

Obras.belongsTo(Camara, { foreignKey: "CamaraId" });

module.exports = Obras;
