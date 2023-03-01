const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class legislaturaController {
  async viewlegislatura(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    const legislatura = [];
    res.render("user/legislatura/legislaturaPage", { legislatura, camara });
  }
}

module.exports = new legislaturaController();
