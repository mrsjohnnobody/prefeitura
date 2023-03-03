//MODELS
const Sessao = require("../../models/Sessao");
const SessaoChamada = require("../../models/SessaoChamada");
const Tramite = require("../../models/Tramite");
const Materia = require("../../models/Materia");
const Parlamentar = require("../../models/Parlamentar");
const Prefeito = require("../../models/Prefeito");

const getInfoCamaraByUrl = require("../../helpers/getInfoCamaraByUrl");

class SessaoController {
  async viewSessoes(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      let page = 0;

      let pagination = {
        totalItems: 0,
        currentPage: page,
        totalPage: Math.ceil(
          (await Sessao.count({ where: { CamaraId: camara.id } })) / 10
        ),
      };

      res.render("admin/sessoes/sessoesPage", { pagination, camara });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/home");
    }
  }

  async getSessoesList(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      let page = req.header("page-header");

      if (page) page = parseInt(page);
      else page = 0;

      let sessoes = await Sessao.findAll({
        where: { CamaraId: camara.id },
        offset: (page - 1) * 10,
        limit: 10,
        order: [["Data", "DESC"]],
      });

      let pagination = {
        totalItems: sessoes.length,
        currentPage: page,
        totalPage: Math.ceil(
          (await Sessao.count({ where: { CamaraId: camara.id } })) / 10
        ),
      };

      return res.status(200).json({ status: "success", sessoes, pagination });
    } catch (error) {
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

  async viewSessoesId(req, res) {
    const camara = await getInfoCamaraByUrl(req);

    const id = req.params.id;

    if (!id) return res.redirect("/admin/sessoes");

    const sessaoValidate = await Sessao.findOne({
      where: { id: req.params.id, CamaraId: camara.id },
    });
    if (!sessaoValidate) return res.redirect("/admin/sessoes");

    const sessao = await Sessao.findByPk(id, {
      include: [
        { model: Materia, include: [Tramite] },
        { model: SessaoChamada, include: [Parlamentar] },
      ],
    });

    //preenchido para caso cadastre uma sessao com data inferior 1992 o código não quebre
    let legislaturaSessao = "(1992 - 1996)";

    const anoDaSessao = sessao.Data.substring(0, 4);

    for (var i = 1992; i < new Date().getFullYear(); i += 4) {
      if (anoDaSessao >= i + 1 && anoDaSessao <= i + 4)
        legislaturaSessao = `(${i + 1} - ${i + 4})`;
    }

    const parlamentares = await Parlamentar.findAll({
      where: {
        CamaraId: camara.id,
        legislatura: legislaturaSessao,
      },
    });

    const prefeito = await Prefeito.findOne({
      where: {
        CamaraId: camara.id,
        legislatura: legislaturaSessao,
      },
    });

    if (!sessao) return res.redirect("/admin/sessoes");

    res.render("admin/sessoes/sessaoIdPage", {
      sessao,
      parlamentares,
      prefeito,
      camara,
    });
  }

  async addSessoes(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      const { numero, tipo, data, descricao } = req.body;

      if (!numero || !tipo || !data || !descricao)
        return res
          .status(200)
          .json({
            status: "false",
            message: "As informações enviadas são inválidas",
          });

      const sessao = {
        Numero: numero,
        Tipo: tipo,
        Data: data,
        Descricao: descricao,
        Situacao: 1,
        CamaraId: camara.id,
      };

      const sessaoReturn = await Sessao.create(sessao);

      return res
        .status(201)
        .json({
          status: "success",
          message: "Sessão cadastrada com sucesso",
          sessao: sessaoReturn,
        });
    } catch (error) {
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

  async deleteSessao(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      if (!req.params.id)
        return res
          .status(200)
          .json({
            status: "false",
            message: "Não foi possível remover esta sessão",
          });

      const sessao = await Sessao.findOne({
        where: { id: req.params.id, CamaraId: camara.id },
      });

      if (!sessao)
        return res
          .status(200)
          .json({
            status: "false",
            message: "Não foi possível remover esta sessão",
          });

      await sessao.destroy();

      return res
        .status(200)
        .json({ status: "success", message: "Sessão removida com sucesso" });
    } catch (error) {
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

  async editSessao(req, res) {
    try {
      const id = req.params.id;

      if (!id)
        res
          .status(200)
          .json({ status: "false", message: "Sessão não encontrada" });

      let sessao = await Sessao.findByPk(id);

      if (!sessao)
        res
          .status(200)
          .json({ status: "false", message: "Sessão não encontrada" });

      if (req.body.numero && sessao.Numero != req.body.numero)
        sessao.Numero = req.body.numero;

      if (req.body.tipo && sessao.Tipo != req.body.tipo)
        sessao.Tipo = req.body.tipo;

      if (req.body.situacao && sessao.Situacao != req.body.situacao)
        sessao.Situacao = req.body.situacao;

      if (req.body.data && sessao.Data != req.body.data)
        sessao.Data = req.body.data;

      if (req.body.numero && sessao.Numero != req.body.numero)
        sessao.Numero = req.body.numero;

      if (req.body.descricao && sessao.Descricao != req.body.descricao)
        sessao.Descricao = req.body.descricao;

      sessao = await sessao.save();

      if (req.body.ParlamentaresPresentesLength > 0) {
        for (var i = 0; i < req.body.ParlamentaresPresentesLength; i++) {
          const sessaoChamada = {
            ParlamentarId: req.body.ParlamentaresPresentesParlamentarId[i],
            Situacao: req.body.ParlamentaresPresentesSituacao[i],
            SessaoId: id,
          };

          if (sessaoChamada.Situacao != "selecione") {
            let exitsSessaoChamada = await SessaoChamada.findOne({
              where: {
                ParlamentarId: sessaoChamada.ParlamentarId,
                SessaoId: sessaoChamada.SessaoId,
              },
            });

            if (exitsSessaoChamada) {
              if (exitsSessaoChamada.Situacao != sessaoChamada.Situacao) {
                exitsSessaoChamada.Situacao = sessaoChamada.Situacao;
                await exitsSessaoChamada.save();
              }
            } else {
              await SessaoChamada.create(sessaoChamada);
            }
          }
        }
      }

      return res
        .status(200)
        .json({ status: "success", message: "Sessão editada com sucesso" });
    } catch (error) {
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

module.exports = new SessaoController();
