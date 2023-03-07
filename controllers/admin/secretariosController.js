//MODELS
const Secretarios = require("../../models/Secretarios");
const Secretarias = require("../../models/Secretarias");

const getInfoCamaraByUrl = require("../../helpers/getInfoCamaraByUrl");

class SecretariosController {
  async createSecretario(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      const {
        nome,
        cargo,
        tipoNomeacao,
        numeroAto,
        data,
        matricula,
        secretariaId,
      } = req.body;

      if (
        !nome ||
        !cargo ||
        !tipoNomeacao ||
        !numeroAto ||
        !data ||
        !matricula ||
        !secretariaId
      ) {
        return res.status(200).json({
          status: "false",
          message: "As informações enviadas são inválidas",
        });
      }

      const existsSecretaria = await Secretarias.findByPk(secretariaId);

      if (!existsSecretaria) {
        return res.status(200).json({
          status: "false",
          message: "As informações enviadas são inválidas",
        });
      }

      const secretario = {
        nome: nome,
        cargo: cargo,
        tipoNomeacao: tipoNomeacao,
        numeroAto: numeroAto,
        data: data,
        matricula: matricula,
        SecretariaId: secretariaId,
        CamaraId: camara.id,
      };

      const secretarioReturn = await Secretarios.create(secretario);

      return res.status(200).json({
        status: "success",
        message: "Secretario cadastrada com sucesso",
        secretario: secretarioReturn,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "false",
        message:
          "Não foi possível realizar essa operação, tente novamente mais tarde",
      });
    }
  }

  async viewSecretarioId(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      const id = req.params.id;

      if (!id) {
        return res.redirect("/admin/secretario");
      }

      const secretarioValidate = await Secretarios.findOne({
        where: { id: req.params.id, CamaraId: camara.id },
      });

      if (!secretarioValidate) {
        return res.redirect("/admin/secretario");
      }

      const secretario = await Secretarios.findByPk(id);

      if (!secretario) {
        return res.redirect("/admin/secretario");
      }

      res.render("admin/secretarias/secretariosIdPage", {
        secretario,
        camara,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/home");
    }
  }
}

module.exports = new SecretariosController();
