const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const LicitacaoFiles = require('./LicitacaoFiles')
const LicitacaoPublicacao = require('./LicitacaoPublicacao')
const LicitacaoResponsaveis = require('./LicitacaoResponsaveis')
const LicitacaoAgendamento = require('./LicitacaoAndamento')
const Contrato = require('./Contrato')
const Camara = require('./Camara')

const Licitacao = db.define('Licitacao', {
  ProcessNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Modality: {
    type: DataTypes.ENUM("Concorrencia", "Tomada de preços", "Convite", "Concurso", "Concurso", "Pregão", "Chamada pública"),
    allowNull: false,
  },
  Objective: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Type: {
    type: DataTypes.ENUM(
      "Menor preço", 
      "Maior lance ou oferta", 
      "Melhor técnica", 
      "Técnica e preço"
      ),
    allowNull: true,
  },
  OpeningDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  PublicNoticeDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  Situation: {
    type: DataTypes.ENUM(
        "Nova", 
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

Licitacao.hasMany(LicitacaoFiles, {
  foreignKey: 'LicitacaoId'
})

Licitacao.hasMany(LicitacaoPublicacao, {
  foreignKey: 'LicitacaoId'
})

Licitacao.hasMany(LicitacaoResponsaveis, {
  foreignKey: 'LicitacaoId'
})

Licitacao.hasMany(LicitacaoAgendamento, {
  foreignKey: 'LicitacaoId'
})

Licitacao.hasMany(Contrato, {
  foreignKey: 'LicitacaoId'
})

Camara.hasMany(Licitacao, {
  foreignKey: 'CamaraId'
})

Licitacao.belongsTo(Camara, {foreignKey : 'CamaraId'})

module.exports = Licitacao
