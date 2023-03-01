const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Camara = require('./Camara')

const Prefeito = db.define('Prefeito', {
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

Camara.hasMany(Prefeito, {
  foreignKey: 'CamaraId'
})

Prefeito.belongsTo(Camara, {foreignKey : 'CamaraId'})

module.exports = Prefeito