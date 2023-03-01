const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class veiculosController {
  async viewveiculos(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    res.render("user/veiculos/veiculosPage", { camara } );
  }
}

module.exports = new veiculosController();
