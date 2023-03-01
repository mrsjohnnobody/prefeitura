const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const LicitacaoAndamento = db.define('LicitacaoAndamento', {
  Responsible: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Phase: {
    type: DataTypes.ENUM(
        "Pregão eletrônico", 
        "Dispensa eletrônica", 
        "Concorrência eletrônica", 
        "Regime dif. de compras"
    ),
    allowNull: false,
  },
  DateTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Situation: {
    type: DataTypes.ENUM(
        "Aberta", 
        "Anulada", 
        "Cancelada", 
        "Deserta",
        "Fechada",
        "Suplente",
        "Titular"
    ),
    allowNull: false,
  },
})

module.exports = LicitacaoAndamento