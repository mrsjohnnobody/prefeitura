const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Camara = db.define('Camara', {
  CorPrimaria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CorSecundaria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  LogoPath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  IconePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  HorarioFuncionamento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Telefone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Instagram: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Facebook: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Youtube: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ApiLocalizacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ApiVideos: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Lema: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = Camara