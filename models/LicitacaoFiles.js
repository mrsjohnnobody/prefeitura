const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const LicitacaoFiles = db.define('LicitacaoFiles', {
  FileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Extension: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}) 

module.exports = LicitacaoFiles