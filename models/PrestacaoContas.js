const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const Parlamentar = require('./Parlamentar')
const Camara = require('./Camara')

const PrestacaoContas = db.define('PrestacaoContas', {
  year: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Initdate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  Finaldate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

Parlamentar.hasMany(PrestacaoContas, {
  foreignKey: 'ParlamentarId'
})

PrestacaoContas.belongsTo(Parlamentar, {foreignKey : 'ParlamentarId'})

Camara.hasMany(PrestacaoContas, {
  foreignKey: 'CamaraId'
})

PrestacaoContas.belongsTo(Camara, {foreignKey : 'CamaraId'})

module.exports = PrestacaoContas