const { DataTypes } = require('sequelize')
const sequeliz = require('sequelize')

const db = require('../db/conn')
const Parlamentar = require('./Parlamentar')
const Materia = require('./Materia')
const Prefeito = require('./Prefeito')

const ParlamentarMateria = db.define('ParlamentarMateria', {
})

Parlamentar.hasMany(ParlamentarMateria, {
    foreignKey: 'ParlamentarId'
})

Materia.hasMany(ParlamentarMateria, {
    foreignKey: 'MateriaId'
})

Prefeito.hasMany(ParlamentarMateria, {
    foreignKey: 'PrefeitoId'
})

module.exports = ParlamentarMateria