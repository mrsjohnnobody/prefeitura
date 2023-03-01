const { Op } = require("sequelize")

//MODELS
const Parlamentar = require("../../models/Parlamentar");
const Materia = require("../../models/Materia");
const ParlamentarMateria = require("../../models/ParlamentarMateria");

const db = require('../../db/conn')
const { QueryTypes } = require('sequelize');

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class ParlamentarController {
    async viewParlamentares(req, res){
        const camara = await getInfoCamaraByUrl(req)

        let legislaturas = new Array()

        for(var i=1992; i < new Date().getFullYear(); i+=4){
            legislaturas.push(`(${i+1} - ${i+4})`)
        }

        const parlamentares = await Parlamentar.findAll({
            where: {
                CamaraId: camara.id,
                legislatura: legislaturas.pop()
            }
        });

        let parlamentarOrder  = []
        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == 'PRESIDENTE')
                parlamentarOrder.push(parlamentar)
        });

        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == '1° VICE-PRESIDENTE')
                parlamentarOrder.push(parlamentar)
        });

        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == '2° VICE-PRESIDENTE')
                parlamentarOrder.push(parlamentar)
        });

        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == '1° SECRETÁRIO')
                parlamentarOrder.push(parlamentar)
        });

        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == '2° SECRETÁRIO')
                parlamentarOrder.push(parlamentar)
        });

        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == '3° SECRETÁRIO')
                parlamentarOrder.push(parlamentar)
        });

        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == '4° SECRETÁRIO')
                parlamentarOrder.push(parlamentar)
        });

        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == 'SUPLENTE')
                parlamentarOrder.push(parlamentar)
        });

        parlamentares.forEach(parlamentar => {
            if(parlamentar.occupation == 'VEREADOR')
                parlamentarOrder.push(parlamentar)
        });

        res.render("user/parlamentar/ParlamentaresPage", { parlamentares: parlamentarOrder, camara });
    }

    async viewHistoricoParlamentares(req, res){
        const camara = await getInfoCamaraByUrl(req)

        let legislaturas = new Array()

        for(var i=1992; i < new Date().getFullYear(); i+=4){
            legislaturas.push(`(${i+1} - ${i+4})`)
        }

        const parlamentaresAtuais = await Parlamentar.findAll({
            where: {
                CamaraId: camara.id,
                legislatura: legislaturas[legislaturas.length -1]
            }
        });

        const parlamentaresAntigos = await Parlamentar.findAll({
            where: {
                CamaraId: camara.id,
                legislatura: {[Op.not]: legislaturas[legislaturas.length -1]}
            }
        });

        res.render("user/parlamentar/parlamentaresHistoricoPage", { parlamentaresAtuais, parlamentaresAntigos, camara });
    }

    async viewParlamentarById(req, res){
        const camara = await getInfoCamaraByUrl(req)

        const parlamentar = await Parlamentar.findByPk(req.params.id);

        if (!parlamentar) 
            return res.redirect("/parlamentares");

        if(parlamentar.CamaraId != camara.id)
            return res.redirect("/parlamentares");

        const countMaterias = await db.query(
            `(SELECT COUNT(*) as count FROM Materia as m INNER JOIN ParlamentarMateria as pm ON m.id = pm.MateriaId WHERE pm.ParlamentarId = ${parlamentar.id})`,
            {
                bind: ['active'],
                type: QueryTypes.SELECT
            }
        )

        let pagination = {
            totalItems: 0,
            currentPage: 0,
            totalPage : Math.ceil(countMaterias[0].count / 5)
        }

        res.render("user/parlamentar/ParlamentarIdPage", { parlamentar, pagination, camara });
    }

    async getParlamentarMateriaInfo(req, res){
        try{
            const camara = await getInfoCamaraByUrl(req)

            const parlamentar = await Parlamentar.findByPk(req.params.id);

            if (!parlamentar) 
                return res.status(200).json({ status: "false", message: "Parlamentar não encontrado" })

            if(parlamentar.CamaraId != camara.id)
                return res.status(200).json({ status: "false", message: "Parlamentar não encontrado" })

            let page = req.header('page-header')
                
            if(page)
                page = parseInt(page)
            else
                page = 0

            const offset = page == 0 ? 0 : (page - 1) * 5
                
            let materias = await Materia.findAll({  
                include: {
                    model: ParlamentarMateria, 
                    where: {
                      ParlamentarId: parlamentar.id
                    }
                },
                offset: offset, 
                limit: 5,
            })

            const countMaterias = await db.query(
                `(SELECT COUNT(*) FROM Materia as m INNER JOIN ParlamentarMateria as pm ON m.id = pm.MateriaId WHERE pm.ParlamentarId = ${parlamentar.id})`,
                {
                    bind: ['active'],
                    type: QueryTypes.SELECT
                }
            )
            
            let pagination = {
              totalItems: materias.length,
              currentPage: page,
              totalPage: Math.ceil(
                countMaterias / 5
              ),
            };

            return res.status(200).json({ status: "success", parlamentar, materias, pagination })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
        }
    }
}

module.exports = new ParlamentarController
