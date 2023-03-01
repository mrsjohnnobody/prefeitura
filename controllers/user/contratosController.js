const Contrato = require("../../models/Contrato");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class contratosController {
  async viewcontratos(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    const contratos = await Contrato.findAll({ where: { CamaraId: camara.id }});
    res.render("user/contratos/contratosPage", { contratos, camara });
  }
}

module.exports = new contratosController();
