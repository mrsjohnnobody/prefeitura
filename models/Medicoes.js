const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const Camara = require("./Camara");

const Medicoes = db.define("Medicoes", {
  dataMedicao: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  dataInicio: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  dataFinal: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  valorMedicao: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  empresaResponsavel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpjEmpresa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  responsavelTecnicoEmpresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  responsavelTecnicoPrefeitura: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Camara.hasMany(Medicoes, {
  foreignKey: "CamaraId",
});

Medicoes.belongsTo(Camara, { foreignKey: "CamaraId" });

module.exports = Medicoes;
