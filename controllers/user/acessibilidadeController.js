const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class acessibilidadeController {
  async viewacessibilidade(req, res) {
    const camara = await getInfoCamaraByUrl(req)
    res.render("user/acessibilidade/acessibilidadePage", { camara});
  }
}

module.exports = new acessibilidadeController();
