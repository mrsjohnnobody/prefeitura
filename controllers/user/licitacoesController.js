//MODELS
const Licitacao = require("../../models/Licitacao");
const LicitacaoAndamento = require("../../models/LicitacaoAndamento");
const LicitacaoFiles = require("../../models/LicitacaoFiles");
const LicitacaoPublicacao = require("../../models/LicitacaoPublicacao");
const LicitacaoResponsaveis = require("../../models/LicitacaoResponsaveis");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class licitacoesController {
  async viewlicitacoes(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    const licitacoes = await Licitacao.findAll({where : {CamaraId: camara.id}});
    res.render("user/licitacoes/licitacoesPage", { licitacoes, camara });
  }

  async viewLicitacaoById(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    const id = req.params.id;
    if(!id)
      return res.redirect("/user/licitacoes");

    const licitacao = await Licitacao.findByPk(
      id,
      { include: [
          LicitacaoFiles, 
          LicitacaoAndamento,
          LicitacaoPublicacao,
          LicitacaoResponsaveis
      ] },
    );

    if(licitacao.CamaraId != camara.id)
      return res.redirect("/user/licitacoes");
    
    return res.render("user/licitacoes/licitacaoByIdPage", { licitacao, camara });
  }
}

module.exports = new licitacoesController();
