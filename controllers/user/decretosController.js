const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class decretosController {
  async viewdecretos(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    res.render("user/decretos/decretosPage", { camara });
  }
}

module.exports = new decretosController();
