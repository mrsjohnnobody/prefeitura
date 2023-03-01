const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class diariasController {
  async viewdiarias(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    res.render("user/diarias/diariasPage", { camara });
  }
}

module.exports = new diariasController();
