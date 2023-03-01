const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Parlamentar = require('./Parlamentar')
const Tramite = require('./Tramite')
const Camara = require('./Camara')

const Materia = db.define('Materia', {
  Data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }, 
  Numero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Resumo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Tipo: {
    type: DataTypes.ENUM(
      "ATA",
      "Convocações", 
      "Edital de convocação", 
      "Emendas", 
      "Indicação",
      "Moções",
      "Ofícios Expedidos",
      "Ofícios Recebidos",
      "Parecer Prévio - Contas de Governo",
      "Pedido de Providências",
      "Projeto de Decreto Legislativo",
      "Projeto de Indicativo",
      "Projeto de Lei - Executivo",
      "Projeto de Lei - Legislativo",
      "Projeto de resolução",
      "Proposta de Emendas",
      "Requerimentos",
      "Resolução",
    ),
    allowNull: false,
  },
})

Materia.hasMany(Tramite, {
    foreignKey: 'MateriaId'
})

Tramite.belongsTo(Materia, {foreignKey : 'MateriaId'})

Camara.hasMany(Materia, {
  foreignKey: 'CamaraId'
})

Materia.belongsTo(Camara, {foreignKey : 'CamaraId'})

module.exports = Materia