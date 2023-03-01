const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class eSicController {
  async vieweSic(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    res.render("user/eSic/eSicPage", { camara } );
  }
}

module.exports = new eSicController();
