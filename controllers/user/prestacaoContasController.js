//MODELS
const PrestacaoContas = require("../../models/PrestacaoContas");
const Parlamentar = require("../../models/Parlamentar");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class prestacaoContasController {
  async viewprestacaoContas(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    const prestacaoContas = await PrestacaoContas.findAll({
      where: {CamaraId: camara.id},
      include: [{ model: Parlamentar, required: true }] 
    });

    res.render("user/prestacaoContas/prestacaoContasPage", { prestacaoContas, camara});
  }
}

module.exports = new prestacaoContasController();
