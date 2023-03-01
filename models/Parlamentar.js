const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Camara = require('./Camara')

const Parlamentar = db.define('Parlamentar', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  legislatura: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

Camara.hasMany(Parlamentar, {
  foreignKey: 'CamaraId'
})

Parlamentar.belongsTo(Camara, {foreignKey : 'CamaraId'})

module.exports = Parlamentar