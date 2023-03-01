const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class perguntasController {
  async viewperguntas(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    res.render("user/perguntas/perguntasPage", { camara });
  }
}

module.exports = new perguntasController();
