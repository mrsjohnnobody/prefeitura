//MODELS
const Comissao = require("../../models/Comissao");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class CommissionController {
    async viewCommission(req, res){
        const camara = await getInfoCamaraByUrl(req)

        const comissao = await Comissao.findAll({ where: { CamaraId: camara.id } });
        res.render("user/comissoes/comissoesPage", { comissao, camara });
    }
}

module.exports = new CommissionController
