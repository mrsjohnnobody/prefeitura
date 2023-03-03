// MODELS
const Obras = require("../../models/Obras");
const Medicoes = require("../../models/Medicoes");

const getInfoCamaraByUrl = require("../../helpers/getInfoCamaraByUrl");

class obrasController {
  async viewObras(req, res) {
    const camara = await getInfoCamaraByUrl(req);

    const obras = await Obras.findAll({
      where: { CamaraId: camara.id },
    });

    res.render("user/obras/obrasPage", { obras, camara });
  }

  async viewObrasId(req, res) {
    const camara = await getInfoCamaraByUrl(req);

    const id = req.params.id;

    if (!id) {
      return res.redirect("/user/obras");
    }

    const obras = await Obras.findByPk(id, { include: [Medicoes] });

    if (!obras) {
      return res.redirect("/user/obras");
    }

    if (obras.CamaraId != camara.id) {
      return res.redirect("/user/obras");
    }

    res.render("user/obras/obrasIdPage", { obras, camara });
  }
}

module.exports = new obrasController();
