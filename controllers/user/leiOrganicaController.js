const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class leiOrganicaController {
  async viewleiOrganica(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    res.render("user/leiOrganica/leiOrganicaPage", { camara } );
  }
}

module.exports = new leiOrganicaController();
