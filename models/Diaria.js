const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Camara = require('./Camara')

const Diaria = db.define('Diaria', {
  Numero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DataPortaria: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  DataInicial: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  DataFinal: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  Descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ValorTotal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Quantidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ValorUnitario: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  NomeAgente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CargoAgente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

Camara.hasMany(Diaria, {
  foreignKey: 'CamaraId'
})

Diaria.belongsTo(Camara, {foreignKey : 'CamaraId'})

module.exports = Diaria