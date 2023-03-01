const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const LicitacaoPublicacao = db.define('LicitacaoPublicacao', {
  Date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Type: {
    type: DataTypes.ENUM("Diário oficial do Estado", "Jornal de grande circulação", "Outros meios de circulação"),
    allowNull: false,
  },
}) 

module.exports = LicitacaoPublicacao