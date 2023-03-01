// MODELS
const Leis = require("../../models/Leis");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class leisController {
  async viewleis(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    const leis = await Leis.findAll({  
      where: {CamaraId: camara.id},
      order: [["date", "DESC"]]
    })

    res.render("user/leis/leisPage", { leis, camara });
  }
}

module.exports = new leisController();
