const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Camara = require('./Camara')

const Contrato = db.define('Contrato', {
  Numero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Modalidade: {
    type: DataTypes.ENUM(
        "Contrato original", 
        "Aditivo", 
    ),
    allowNull: true,
  },
  DataExercicio: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  InicioVigencia: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  FimVigencia: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  Objetivo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  NomeContratado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ValorTotal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ValorMensal: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

Camara.hasMany(Contrato, {
  foreignKey: 'CamaraId'
})

Contrato.belongsTo(Camara, {foreignKey : 'CamaraId'})

module.exports = Contrato