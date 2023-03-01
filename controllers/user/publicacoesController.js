const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class publicacoesController {
  async viewpublicacoes(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    res.render("user/publicacoes/publicacoesPage", { camara });
  }
}

module.exports = new publicacoesController();
