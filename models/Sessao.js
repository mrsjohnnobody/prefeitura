const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Materia = require('./Materia')
const Camara = require('./Camara')

const Sessao = db.define('Sessao', {
  Data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }, 
  Numero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Situacao: {
    type: DataTypes.ENUM(
      "Aberta",
      "Fechada"
    ),
    allowNull: false,
  },
  Tipo: {
    type: DataTypes.ENUM(
      "Extra-Ordinária",
      "Audiência pública",
      "Solene",
      "Abertura de período legislativo", 
      "Encerramento de período legislativo",
      "Intinerante",
      "Sessão administrativa",
      "Sessão especial",
      "Ordinária"
    ),
    allowNull: false,
  },
})

Sessao.hasMany(Materia, {
    foreignKey: 'SessaoId'
})

Materia.belongsTo(Sessao, {foreignKey : 'SessaoId'})

Camara.hasMany(Sessao, {
  foreignKey: 'CamaraId'
})

Sessao.belongsTo(Camara, {foreignKey : 'CamaraId'})

module.exports = Sessao

