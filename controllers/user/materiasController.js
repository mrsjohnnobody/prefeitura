//MODELS
const Sessao = require("../../models/Sessao");
const Tramite = require("../../models/Tramite");
const Materia = require("../../models/Materia");
const Parlamentar = require("../../models/Parlamentar");
const ParlamentarMateria = require("../../models/ParlamentarMateria");
const Prefeito = require("../../models/Prefeito");

const db = require('../../db/conn')
const { QueryTypes } = require('sequelize');

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class MateriasController {
  async viewEditMateriaById(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req)

      if (!req.params.id) return res.redirect("/user/sessoes");

      const materia = await Materia.findByPk(req.params.id, {
        include: [Tramite],
      });

      if (!materia) return res.redirect("/user/sessoes");

      const sessao = await Sessao.findByPk(materia.SessaoId);

      if (!sessao) return res.redirect("/user/sessoes");

      if(sessao.CamaraId != camara.id)
        return res.redirect("/user/sessoes");

      const autores = await db.query(
        `(SELECT parlamentars.id as ParlamentarId, parlamentars.name as ParlamentarName, parlamentars.nickname as ParlamentarNickname, prefeitos.id as PrefeitoId, prefeitos.name as PrefeitoName, prefeitos.nickname as PrefeitoNickname FROM ParlamentarMateria as pm LEFT JOIN Parlamentars as parlamentars ON parlamentars.id = pm.ParlamentarId LEFT JOIN Prefeitos as prefeitos ON prefeitos.id = pm.PrefeitoId WHERE pm.MateriaId = ${materia.id})`,
        {
          bind: ['active'],
          type: QueryTypes.SELECT
        }
      )

      res.render("user/sessoes/materiaIdPage", { materia, sessao, autores, camara });
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  }
}

module.exports = new MateriasController();
