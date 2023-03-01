const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Camara = require('./Camara')

const Comissao = db.define('Comissao', {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Type: {
    type: DataTypes.ENUM("Permanente", "Temporária"),
    allowNull: false,
  },
  InitialDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  FinalDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
})

Camara.hasMany(Comissao, {
  foreignKey: 'CamaraId'
})

Comissao.belongsTo(Camara, {foreignKey : 'CamaraId'})

module.exports = Comissao