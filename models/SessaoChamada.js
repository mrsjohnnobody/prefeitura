const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Parlamentar = require('./Parlamentar')
const Sessao = require('./Sessao')

const SessaoChamada = db.define('SessaoChamada', {
    Situacao: {
        type: DataTypes.ENUM(
            "Presente", 
            "Ausente",
            "Licença", 
        ),
        allowNull: false,
    },
})

Parlamentar.hasMany(SessaoChamada, {
    foreignKey: 'ParlamentarId'
})

Sessao.hasMany(SessaoChamada, {
    foreignKey: 'SessaoId'
})

SessaoChamada.belongsTo(Parlamentar, {foreignKey : 'ParlamentarId'})

module.exports = SessaoChamada
