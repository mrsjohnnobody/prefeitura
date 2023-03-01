const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Camara = require('./Camara')

const Leis = db.define('Leis', {
  number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

Camara.hasMany(Leis, {
  foreignKey: 'CamaraId'
})

Leis.belongsTo(Camara, {foreignKey : 'CamaraId'})

module.exports = Leis