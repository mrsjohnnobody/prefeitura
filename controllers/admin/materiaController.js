//MODELS
const Sessao = require("../../models/Sessao");
const Tramite = require("../../models/Tramite");
const Materia = require("../../models/Materia");
const Parlamentar = require("../../models/Parlamentar");
const ParlamentarMateria = require("../../models/ParlamentarMateria");
const Prefeito = require("../../models/Prefeito");

const getInfoCamaraByUrl = require("../../helpers/getInfoCamaraByUrl");

const db = require("../../db/conn");
const { QueryTypes } = require("sequelize");

class MateriaController {
  async viewEditMateriaById(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      if (!req.params.id) return res.redirect("/admin/sessoes");

      const materia = await Materia.findOne({
        where: { id: req.params.id, CamaraId: camara.id },
        include: [Tramite],
      });

      if (!materia) return res.redirect("/admin/sessoes");

      const sessao = await Sessao.findByPk(materia.SessaoId);

      if (!sessao) return res.redirect("/admin/sessoes");

      const autores = await db.query(
        `(SELECT parlamentars.id as ParlamentarId, parlamentars.name as ParlamentarName, parlamentars.nickname as ParlamentarNickname, prefeitos.id as PrefeitoId, prefeitos.name as PrefeitoName, prefeitos.nickname as PrefeitoNickname FROM ParlamentarMateria as pm LEFT JOIN Parlamentars as parlamentars ON parlamentars.id = pm.ParlamentarId LEFT JOIN Prefeitos as prefeitos ON prefeitos.id = pm.PrefeitoId WHERE pm.MateriaId = ${materia.id})`,
        {
          bind: ["active"],
          type: QueryTypes.SELECT,
        }
      );

      res.render("admin/sessoes/materiaIdPage", {
        materia,
        sessao,
        autores,
        camara,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/home");
    }
  }

  async deleteTramite(req, res) {
    try {
      if (!req.params.id)
        return res
          .status(200)
          .json({
            status: "false",
            message: "Não foi possível remover este trâmite",
          });

      const tramite = await Tramite.findByPk(req.params.id);

      if (!tramite)
        return res
          .status(200)
          .json({
            status: "false",
            message: "Não foi possível remover este trâmite",
          });

      await tramite.destroy();

      return res
        .status(200)
        .json({ status: "success", message: "Trâmite removido com sucesso" });
    } catch (error) {
      //salvar error em table
      return res
        .status(500)
        .json({
          status: "false",
          message:
            "Não foi possível realizar essa operação, tente novamente mais tarde",
        });
    }
  }

  async createTramite(req, res) {
    try {
      const { expediente, fase, situacao, materiaId, data } = req.body;

      if (!expediente || !fase || !situacao || !materiaId || !data)
        return res
          .status(200)
          .json({
            status: "false",
            message: "As informações enviadas são inválidas",
          });

      const exitsMateria = await Materia.findByPk(materiaId);

      if (!exitsMateria)
        return res
          .status(200)
          .json({
            status: "false",
            message: "As informações enviadas são inválidas",
          });

      const tramite = {
        Expediente: expediente,
        Fase: fase,
        Situacao: situacao,
        MateriaId: materiaId,
        Data: data,
      };

      const sessao = await Sessao.findByPk(exitsMateria.SessaoId);

      const tramiteReturn = await Tramite.create(tramite);

      return res
        .status(200)
        .json({
          status: "success",
          message: "Trâmite cadastrado com sucesso",
          tramite: tramiteReturn,
          sessao,
        });
    } catch (error) {
      //salvar error em table
      return res
        .status(500)
        .json({
          status: "false",
          message:
            "Não foi possível realizar essa operação, tente novamente mais tarde",
        });
    }
  }

  async deleteMateria(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      if (!req.params.id)
        return res
          .status(200)
          .json({
            status: "false",
            message: "Não foi possível remover esta matéria",
          });

      const materia = await Materia.findOne({
        where: { id: req.params.id, CamaraId: camara.id },
      });

      if (!materia)
        return res
          .status(200)
          .json({
            status: "false",
            message: "Não foi possível remover esta matéria",
          });

      await materia.destroy();

      return res
        .status(200)
        .json({ status: "success", message: "Matéria removido com sucesso" });
    } catch (error) {
      //salvar error em table
      return res
        .status(500)
        .json({
          status: "false",
          message:
            "Não foi possível realizar essa operação, tente novamente mais tarde",
        });
    }
  }

  async createMateria(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      const { parlamentarId, data, numero, tipo, resumo, sessaoId } = req.body;

      if (!parlamentarId || !data || !numero || !tipo || !resumo || !sessaoId)
        return res
          .status(200)
          .json({
            status: "false",
            message: "As informações enviadas são inválidas",
          });

      const exitsSessao = await Sessao.findByPk(sessaoId);

      if (!exitsSessao)
        return res
          .status(200)
          .json({
            status: "false",
            message: "As informações enviadas são inválidas",
          });

      const materia = {
        Data: data,
        Numero: numero,
        Tipo: tipo,
        Resumo: resumo,
        SessaoId: sessaoId,
        CamaraId: camara.id,
      };

      const materiaReturn = await Materia.create(materia);

      parlamentarId.forEach(async (id) => {
        if (id.includes("prefeito_")) {
          await ParlamentarMateria.create({
            PrefeitoId: id.replace("prefeito_", ""),
            MateriaId: materiaReturn.id,
          });
        } else {
          await ParlamentarMateria.create({
            ParlamentarId: id,
            MateriaId: materiaReturn.id,
          });
        }
      });

      return res
        .status(200)
        .json({
          status: "success",
          message: "Matéria cadastrada com sucesso",
          materia: materiaReturn,
        });
    } catch (error) {
      //salvar error em table
      console.log(error);
      return res
        .status(500)
        .json({
          status: "false",
          message:
            "Não foi possível realizar essa operação, tente novamente mais tarde",
        });
    }
  }
}

module.exports = new MateriaController();
