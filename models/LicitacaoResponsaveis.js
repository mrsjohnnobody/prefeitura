const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const LicitacaoResponsaveis = db.define('LicitacaoResponsaveis', {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Type: {
    type: DataTypes.ENUM(
        "PREGOEIRO/PRESIDENTE DA COMISSÃO", 
        "RESPONSÁVEL PELA INFORMAÇÃO", 
        "RESPONSÁVEL PELO PARECER TÉCNICO JURÍDICO", 
        "RESPONSÁVEL PELA ADJUDIÇÃO",
        "RESPONSÁVEL PELA HOMOLOGAÇÃO",
    ),
    allowNull: false,
  },
}) 

module.exports = LicitacaoResponsaveis