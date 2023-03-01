//MODELS
const GestaoFiscal = require("../../models/GestaoFiscal");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class GestaoFiscalController {
  async viewGestaoFiscal(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    const gestaofiscal = await GestaoFiscal.findAll({
      where: {CamaraId: camara.id},
      order: [["ano", "DESC"]],
    });

    res.render("user/gestaoFiscal/gestaoFiscalPage", { gestaofiscal, camara } );
  }
}

module.exports = new GestaoFiscalController();
