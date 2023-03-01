const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class dadosAbertosController {
  async viewdadosAbertos(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    res.render("user/dadosAbertos/dadosAbertosPage", { camara });
  }
}

module.exports = new dadosAbertosController();
