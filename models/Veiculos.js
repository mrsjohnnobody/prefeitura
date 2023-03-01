const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const Camara = require("./Camara");

const Veiculos = db.define("Veiculos", {
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  secretaria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  finalidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM("Não aplicavel", "Automovel"),
    allowNull: false,
  },
  situacao: {
    type: DataTypes.ENUM("Ativo", "Inativa"),
    allowNull: false,
  },
  categoria: {
    type: DataTypes.ENUM("LOCADO", "PROPRIO"),
    allowNull: false,
  },
});

Camara.hasMany(Veiculos, {
  foreignKey: "CamaraId",
});

Veiculos.belongsTo(Camara, { foreignKey: "CamaraId" });

module.exports = Veiculos;
