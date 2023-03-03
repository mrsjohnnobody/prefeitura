//MODELS
const Obras = require("../../models/Obras");
const Medicoes = require("../../models/Medicoes");

const getInfoCamaraByUrl = require("../../helpers/getInfoCamaraByUrl");

class ObrasController {
  async viewObras(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      const obras = await Obras.findAll({
        where: { CamaraId: camara.id },
        order: [["dataAndamento", "DESC"]],
      });

      res.render("admin/obras/obrasPage", { obras, camara });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/home");
    }
  }

  async createObras(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      const {
        dataAndamento,
        secretaria,
        objeto,
        tipo,
        localExecucao,
        valorTotal,
        totalMed,
        percentualConcl,
      } = req.body;

      console.log(
        dataAndamento,
        secretaria,
        objeto,
        tipo,
        localExecucao,
        valorTotal,
        totalMed,
        percentualConcl
      );

      if (
        !dataAndamento ||
        !secretaria ||
        !objeto ||
        !tipo ||
        !localExecucao ||
        !valorTotal ||
        !totalMed ||
        !percentualConcl
      ) {
        return res.status(200).json({
          status: "false",
          message: "As informações enviadas são inválidas",
        });
      }

      const obra = {
        dataAndamento: dataAndamento,
        secretaria: secretaria,
        objeto: objeto,
        tipo: tipo,
        localExecucao: localExecucao,
        valorTotal: valorTotal,
        totalMed: totalMed,
        percentualConcl: percentualConcl,
        CamaraId: camara.id,
      };

      const obraReturn = await Obras.create(obra);

      return res.status(200).json({
        status: "success",
        message: "Obra cadastrada com sucesso",
        obra: obraReturn,
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

  async viewObrasId(req, res) {
    const camara = await getInfoCamaraByUrl(req);

    const id = req.params.id;

    if (!id) {
      return res.redirect("/admin/obras");
    }

    const obraValidate = await Obras.findOne({
      where: { id: id, CamaraId: camara.id },
    });

    if (!obraValidate) {
      return res.redirect("/admin/obras");
    }

    const obras = await Obras.findByPk(id, { include: [Medicoes] });

    if (!obras) {
      return res.redirect("/admin/obras");
    }

    res.render("admin/obras/obrasIdPage", {
      obras,
      camara,
    });
  }

  async editObras(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        res
          .status(200)
          .json({ status: "false", message: "Obra não encontrada" });
      }

      let obra = await Obras.findByPk(id);

      if (!obra) {
        res
          .status(200)
          .json({ status: "false", message: "Obra não encontrada" });
      }

      if (
        req.body.dataAndamento &&
        obra.dataAndamento != req.body.dataAndamento
      ) {
        obra.dataAndamento = req.body.dataAndamento;
      }

      if (req.body.secretaria && obra.secretaria != req.body.secretaria) {
        obra.secretaria = req.body.secretaria;
      }

      if (req.body.objeto && obra.objeto != req.body.objeto) {
        obra.objeto = req.body.objeto;
      }

      if (req.body.tipo && obra.tipo != req.body.tipo) {
        obra.tipo = req.body.tipo;
      }

      if (
        req.body.localExecucao &&
        obra.localExecucao != req.body.localExecucao
      ) {
        obra.localExecucao = req.body.localExecucao;
      }

      if (req.body.valorTotal && obra.valorTotal != req.body.valorTotal) {
        obra.valorTotal = req.body.valorTotal;
      }

      if (req.body.totalMed && obra.totalMed != req.body.totalMed) {
        obra.totalMed = req.body.totalMed;
      }

      if (
        req.body.percentualConcl &&
        obra.percentualConcl != req.body.percentualConcl
      ) {
        obra.percentualConcl = req.body.percentualConcl;
      }

      obra = await obra.save();

      return res
        .status(200)
        .json({ status: "success", message: "Obra editada com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "false",
        message:
          "Não foi possível realizar essa operação, tente novamente mais tarde",
      });
    }
  }

  async deleteObra(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      const id = req.params.id;

      if (!id) {
        return res.status(200).json({
          status: "false",
          message: "Não foi possível remover essa obra",
        });
      }

      const obra = await Obras.findOne({
        where: { id: id, CamaraId: camara.id },
      });

      if (!obra) {
        return res.status(200).json({
          status: "false",
          message: "Nao foi possivel remover essa obra",
        });
      }

      await obra.destroy();

      return res
        .status(200)
        .json({ status: "success", message: "Obra removida com sucesso" });
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

module.exports = new ObrasController();
