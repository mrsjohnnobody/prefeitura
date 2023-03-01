//MODELS
const { Sequelize } = require("sequelize");
const Parlamentar = require("../../models/Parlamentar");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class MesaDiretoraController {
    async viewMesaDiretora(req, res){
        const camara = await getInfoCamaraByUrl(req)

        let legislaturas = new Array()
        for(var i=1992; i < new Date().getFullYear(); i+=4){
            legislaturas.push(`(${i+1} - ${i+4})`)
        }

        const parlamentares = await Parlamentar.findAll({ 
            where: {
                CamaraId: camara.id,
                occupation: ["PRESIDENTE", "1° VICE-PRESIDENTE", "2° VICE-PRESIDENTE", "1° SECRETÁRIO", "2° SECRETÁRIO", "3° SECRETÁRIO", "4° SECRETÁRIO", "SUPLENTE"],
            } 
        });

        let parlamentarMesaDiretoraOrder  = []
        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == 'PRESIDENTE')
            parlamentarMesaDiretoraOrder.push(parlamentar)
        });

        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == '1° VICE-PRESIDENTE')
                parlamentarMesaDiretoraOrder.push(parlamentar)
        });

        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == '2° VICE-PRESIDENTE')
                parlamentarMesaDiretoraOrder.push(parlamentar)
        });

        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == '1° SECRETÁRIO')
                parlamentarMesaDiretoraOrder.push(parlamentar)
        });

        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == '2° SECRETÁRIO')
                parlamentarMesaDiretoraOrder.push(parlamentar)
        });

        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == '3° SECRETÁRIO')
                parlamentarMesaDiretoraOrder.push(parlamentar)
        });

        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == '4° SECRETÁRIO')
                parlamentarMesaDiretoraOrder.push(parlamentar)
        });

        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == 'SUPLENTE')
                parlamentarMesaDiretoraOrder.push(parlamentar)
        });

        legislaturas.reverse()

        res.render("user/mesaDiretora/mesaDiretoraPage", { parlamentares: parlamentarMesaDiretoraOrder, legislaturas, camara });
    }
}

module.exports = new MesaDiretoraController
