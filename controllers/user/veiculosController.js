// MODELS
const Veiculos = require("../../models/Veiculos");

const getInfoCamaraByUrl = require("../../helpers/getInfoCamaraByUrl");

class veiculosController {
  async viewVeiculos(req, res) {
    const camara = await getInfoCamaraByUrl(req);

    const veiculos = await Veiculos.findAll({
      where: { CamaraId: camara.id },
    });

    res.render("user/veiculos/veiculosPage", { veiculos, camara });
  }
}

module.exports = new veiculosController();
