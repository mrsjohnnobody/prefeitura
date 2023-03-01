const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class mapaSiteController {
  async viewmapaSite(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    res.render("user/mapaSite/mapaSitePage", { camara});
  }
}

module.exports = new mapaSiteController();
