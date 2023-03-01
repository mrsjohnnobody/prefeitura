const { DataTypes } = require('sequelize')
const sequeliz = require('sequelize')

const db = require('../db/conn')
const Parlamentar = require('./Parlamentar')
const Comissao = require('./Comissao')


const ParlamentarComissao = db.define('ParlamentarComissao', {
})

Parlamentar.hasMany(ParlamentarComissao, {
    foreignKey: 'ParlamentarId'
})

Comissao.hasMany(ParlamentarComissao, {
    foreignKey: 'ComissaoId'
})

module.exports = ParlamentarComissao