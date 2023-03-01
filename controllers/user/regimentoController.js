const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class regimentoController {
  async viewregimento(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    res.render("user/regimento/regimentoPage", { camara });
  }
}

module.exports = new regimentoController();
