const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Camara = require('./Camara')

const Admin = db.define('Admin', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

Camara.hasMany(Admin, {
  foreignKey: 'CamaraId'
})

Admin.belongsTo(Camara, {foreignKey : 'CamaraId'})

module.exports = Admin