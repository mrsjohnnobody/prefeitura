const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Tramite = db.define('Tramite', {
  Expediente: {
    type: DataTypes.ENUM(
        "Ordem do dia", 
        "Leitura das matérias" 
    ),
    allowNull: false,
  },
  Fase: {
    type: DataTypes.ENUM(
      "Arquivado",
      "Em tramitação", 
      "Favorável", 
      "Não favorável", 
      "Protocolo",
      "Pedido de visto",
      "1° votação",
      "2° votação",
      "Substitutivas",
      "Aditivas",
      "Modificativas",
      "Aglutinativas",
      "Apresentação e leitura da matéria",
      "Pedido de urgência",
      "votação da ata"
    ),
    allowNull: false,
  },
  Situacao: {
    type: DataTypes.ENUM(
        "Favorável",
        "Não Favorável", 
        "Em tramitação" 
    ),
    allowNull: false,
  },
  Data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
})

module.exports = Tramite