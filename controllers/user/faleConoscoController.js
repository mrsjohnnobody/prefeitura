const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class faleConoscoController {
  async viewfaleConosco(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    res.render("user/faleConosco/faleConoscoPage", { camara} );
  }
}

module.exports = new faleConoscoController();
