const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class ouvidoriaController {
  async viewouvidoria(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    res.render("user/ouvidoria/ouvidoriaPage", { camara } );
  }
}

module.exports = new ouvidoriaController();
