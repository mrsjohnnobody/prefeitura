const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Camara = require('./Camara')

const Dicionario = db.define('Dicionario', {
  Title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Text: {
    type: DataTypes.STRING,
    allowNull: true,
  }
})

Camara.hasMany(Dicionario, {
  foreignKey: 'CamaraId'
})

Dicionario.belongsTo(Camara, {foreignKey : 'CamaraId'})

module.exports = Dicionario