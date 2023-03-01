const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Camara = require('./Camara')

const Glossario = db.define('Glossario', {
  Title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Text: {
    type: DataTypes.STRING,
    allowNull: true,
  }
})

Camara.hasMany(Glossario, {
  foreignKey: 'CamaraId'
})

Glossario.belongsTo(Camara, {foreignKey : 'CamaraId'})

module.exports = Glossario