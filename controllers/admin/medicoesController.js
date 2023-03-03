//MODELS
const Medicoes = require("../../models/Medicoes");
const Obras = require("../../models/Obras");

const getInfoCamaraByUrl = require("../../helpers/getInfoCamaraByUrl");

class MedicoesController {
  async createMedicao(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      const {
        dataMedicao,
        dataInicio,
        dataFinal,
        valorMedicao,
        empresaResponsavel,
        cnpjEmpresa,
        responsavelTecnicoEmpresa,
        responsavelTecnicoPrefeitura,
        obraId,
      } = req.body;

      if (
        !dataMedicao ||
        !dataInicio ||
        !dataFinal ||
        !valorMedicao ||
        !empresaResponsavel ||
        !cnpjEmpresa ||
        !responsavelTecnicoEmpresa ||
        !responsavelTecnicoPrefeitura ||
        !obraId
      ) {
        return res.status(200).json({
          status: "false",
          message: "As informações enviadas são inválidas",
        });
      }

      const existsObra = await Obras.findByPk(obraId);

      if (!existsObra) {
        return res.status(200).json({
          status: "false",
          message: "As informações enviadas são inválidas",
        });
      }

      const medicao = {
        dataMedicao: dataMedicao,
        dataInicio: dataInicio,
        dataFinal: dataFinal,
        valorMedicao: valorMedicao,
        empresaResponsavel: empresaResponsavel,
        cnpjEmpresa: cnpjEmpresa,
        responsavelTecnicoEmpresa: responsavelTecnicoEmpresa,
        responsavelTecnicoPrefeitura: responsavelTecnicoPrefeitura,
        ObraId: obraId,
        CamaraId: camara.id,
      };

      const medicaoReturn = await Medicoes.create(medicao);

      return res.status(200).json({
        status: "success",
        message: "Medicao cadastrada com sucesso",
        medicao: medicaoReturn,
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

  async viewMedicaoId(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      const id = req.params.id;

      if (!id) {
        return res.redirect("/admin/obras");
      }

      const medicaoValidate = await Medicoes.findOne({
        where: { id: req.params.id, CamaraId: camara.id },
      });

      if (!medicaoValidate) {
        return res.redirect("/admin/obras");
      }

      const medicao = await Medicoes.findByPk(id);

      if (!medicao) {
        return res.redirect("/admin/obras");
      }

      res.render("admin/obras/medicaoIdPage", {
        medicao,
        camara,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/home");
    }
  }

  async editMedicao(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        res
          .status(200)
          .json({ status: "false", message: "Medicao não encontrada" });
      }

      let medicao = await Medicoes.findByPk(id);

      if (!medicao) {
        res
          .status(200)
          .json({ status: "false", message: "Medicao não encontrada" });
      }

      if (req.body.dataMedicao && medicao.dataMedicao != req.body.dataMedicao) {
        medicao.dataMedicao = req.body.dataMedicao;
      }

      if (req.body.dataInicio && medicao.dataInicio != req.body.dataInicio) {
        medicao.dataInicio = req.body.dataInicio;
      }

      if (req.body.dataFinal && medicao.dataFinal != req.body.dataFinal) {
        medicao.dataFinal = req.body.dataFinal;
      }

      if (
        req.body.valorMedicao &&
        medicao.valorMedicao != req.body.valorMedicao
      ) {
        medicao.valorMedicao = req.body.valorMedicao;
      }

      if (
        req.body.empresaResponsavel &&
        medicao.empresaResponsavel != req.body.empresaResponsavel
      ) {
        medicao.empresaResponsavel = req.body.empresaResponsavel;
      }

      if (req.body.cnpjEmpresa && medicao.cnpjEmpresa != req.body.cnpjEmpresa) {
        medicao.cnpjEmpresa = req.body.cnpjEmpresa;
      }

      if (
        req.body.responsavelTecnicoEmpresa &&
        medicao.responsavelTecnicoEmpresa != req.body.responsavelTecnicoEmpresa
      ) {
        medicao.responsavelTecnicoEmpresa = req.body.responsavelTecnicoEmpresa;
      }

      if (
        req.body.responsavelTecnicoPrefeitura &&
        medicao.responsavelTecnicoPrefeitura !=
          req.body.responsavelTecnicoPrefeitura
      ) {
        medicao.responsavelTecnicoPrefeitura =
          req.body.responsavelTecnicoPrefeitura;
      }

      medicao = await medicao.save();

      return res
        .status(200)
        .json({ status: "success", message: "Medicao editada com sucesso" });
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

module.exports = new MedicoesController();
