//MODELS
const Portaria = require("../../models/Portaria");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class portariasController {
  async viewportarias(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    const portarias = await Portaria.findAll({ where: { CamaraId: camara.id} });
    res.render("user/portarias/portariasPage", { portarias, camara });
  }
}

module.exports = new portariasController();
