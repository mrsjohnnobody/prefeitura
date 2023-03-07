//MODELS
const Secretarias = require("../../models/Secretarias");
const Secretarios = require("../../models/Secretarios");

const getInfoCamaraByUrl = require("../../helpers/getInfoCamaraByUrl");

class SecretariasController {
  async viewSecretarias(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      const secretaria = await Secretarias.findAll({
        where: { CamaraId: camara.id },
      });

      res.render("admin/secretarias/secretariasPage", { secretaria, camara });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/home");
    }
  }

  async createSecretaria(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      const { cnpj, telefone, email, horario, endereco } = req.body;

      if (!cnpj || !telefone || !email || !horario || !endereco) {
        return res.status(200).json({
          status: "false",
          message: "As informações enviadas são inválidas",
        });
      }

      const secretaria = {
        cnpj: cnpj,
        telefone: telefone,
        email: email,
        horario: horario,
        endereco: endereco,
        CamaraId: camara.id,
      };

      const secretariaReturn = await Secretarias.create(secretaria);

      return res.status(200).json({
        status: "success",
        message: "Secretaria cadastrada com sucesso",
        secretaria: secretariaReturn,
      });
    } catch (error) {
      //salvar error em table
      return res.status(500).json({
        status: "false",
        message:
          "Não foi possível realizar essa operação, tente novamente mais tarde",
      });
    }
  }

  async viewSecretariaId(req, res) {
    const camara = await getInfoCamaraByUrl(req);

    const id = req.params.id;

    if (!id) {
      return res.redirect("/admin/secretarias");
    }

    const secretariaValidate = await Secretarias.findOne({
      where: { id: id, CamaraId: camara.id },
    });

    if (!secretariaValidate) {
      return res.redirect("/admin/obras");
    }

    const secretaria = await Secretarias.findByPk(id, {
      include: [Secretarios],
    });

    if (!secretaria) {
      return res.redirect("/admin/secretarias");
    }

    res.render("admin/secretarias/secretariasIdPage", {
      secretaria,
      camara,
    });
  }

  async editSecretaria(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        res
          .status(200)
          .json({ status: "false", message: "Secretaria não encontrada" });
      }

      let secretaria = await Secretarias.findByPk(id);

      if (!secretaria) {
        res
          .status(200)
          .json({ status: "false", message: "Secretaria não encontrada" });
      }

      if (req.body.cnpj && secretaria.cnpj != req.body.cnpj) {
        secretaria.cnpj = req.body.cnpj;
      }

      if (req.body.telefone && secretaria.telefone != req.body.telefone) {
        secretaria.telefone = req.body.telefone;
      }

      if (req.body.email && secretaria.email != req.body.email) {
        secretaria.email = req.body.email;
      }

      if (req.body.horario && secretaria.horario != req.body.horario) {
        secretaria.horario = req.body.horario;
      }

      if (req.body.endereco && secretaria.endereco != req.body.endereco) {
        secretaria.endereco = req.body.endereco;
      }

      secretaria = await secretaria.save();

      return res
        .status(200)
        .json({ status: "success", message: "Secretaria editada com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "false",
        message:
          "Não foi possível realizar essa operação, tente novamente mais tarde",
      });
    }
  }

  async deleteSecretaria(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      const id = req.params.id;

      if (!id) {
        return res.status(200).json({
          status: "false",
          message: "Não foi possível remover essa secretaria",
        });
      }

      const secretaria = await Secretarias.findOne({
        where: { id: id, CamaraId: camara.id },
      });

      if (!secretaria) {
        return res.status(200).json({
          status: "false",
          message: "Nao foi possivel remover essa secretaria",
        });
      }

      await secretaria.destroy();

      return res.status(200).json({
        status: "success",
        message: "Secretaria removida com sucesso",
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
}

module.exports = new SecretariasController();
