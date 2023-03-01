const { Op } = require("sequelize")

//MODELS
const Parlamentar = require("../../models/Parlamentar");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class staticController {
    async viewCamara(req, res){
        const camara = await getInfoCamaraByUrl(req)

        let legislaturas = new Array()

        for(var i=1992; i < new Date().getFullYear(); i+=4){
            legislaturas.push(`(${i+1} - ${i+4})`)
        }

        const parlamentares = await Parlamentar.findAll({
            where: {
                CamaraId: camara.id,
                legislatura: legislaturas.concat().pop()
            }
        });

        let parlamentarMesaDiretoraOrder  = []
        let parlamentarOrder  = []
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

        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == 'VEREADOR')
                parlamentarOrder.push(parlamentar)
        });

        res.render("user/static/camaraPage", { parlamentares: parlamentarOrder, mesaDiretora: parlamentarMesaDiretoraOrder, camara });
    }

    async viewInfoCamara(req, res){
        const camara = await getInfoCamaraByUrl(req)

        res.render("user/static/infoCamaraPage", { camara });
    }

    async viewInfoParlamentar(req, res){
        const camara = await getInfoCamaraByUrl(req)

        res.render("user/static/infoParlamentarPage", { camara });
    }
}

module.exports = new staticController
