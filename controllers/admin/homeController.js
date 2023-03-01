//MODELS
const News = require("../../models/News");
const GestaoFiscal = require("../../models/GestaoFiscal");
const Licitacao = require("../../models/Licitacao");
const Contrato = require("../../models/Contrato");
const Sessao = require("../../models/Sessao");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class HomeController {
    async viewHome(req, res){
        try{
            const camara = await getInfoCamaraByUrl(req)
            const latestnews = await News.findAll({ where: { CamaraId: camara.id}, limit: 3 });
            const gestoesFiscais = await GestaoFiscal.findAll({ where: { CamaraId: camara.id}, limit: 4 });
            const licitacoes = await Licitacao.findAll({ where: { CamaraId: camara.id}, limit: 4 });
            const contratos = await Contrato.findAll({ where: { CamaraId: camara.id}, limit: 4 });

            const sessoes = await Sessao.findAll({ 
                where: { CamaraId: camara.id},
                order: [ [ 'Data', 'DESC' ]],
                limit: 8,
            });
    
            res.render("admin/home/homePage", { latestnews, gestoesFiscais, licitacoes, contratos, sessoes, camara });
        }catch(error){
            console.log(error);
            res.redirect("/admin")
        }
    }
}

module.exports = new HomeController
