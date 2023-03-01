const axios = require("axios");

//MODELS
const News = require("../../models/News");
const GestaoFiscal = require("../../models/GestaoFiscal");
const Licitacao = require("../../models/Licitacao");
const Contrato = require("../../models/Contrato");
const Sessao = require("../../models/Sessao");

const getInfoCamaraByUrl = require("../../helpers/getInfoCamaraByUrl");

class HomeController {
  async viewHome(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);
      const latestnews = await News.findAll({
        where: { CamaraId: camara.id },
        limit: 3,
      });

      let url = "https://www.googleapis.com/youtube/v3/search";
      let channelId = camara.ApiVideos.replace(
        "https://www.youtube.com/channel/",
        ""
      );

      let videos = null;
      try {
        const response = await axios.get(url, {
          params: {
            pageToken: "",
            key: process.env.GOOGLE_API_KEY,
            channelId: channelId,
            part: "snippet,id",
            maxResults: 8,
            resultsNumber: "",
            order: "date",
          },
        });

        videos = response.data.items;
      } catch (error) {
        videos = [];
      }

      const gestoesFiscais = await GestaoFiscal.findAll({
        where: { CamaraId: camara.id },
        limit: 4,
      });
      const licitacoes = await Licitacao.findAll({
        where: { CamaraId: camara.id },
        limit: 4,
      });
      const contratos = await Contrato.findAll({
        where: { CamaraId: camara.id },
        limit: 4,
      });
      const sessoes = await Sessao.findAll({
        where: { CamaraId: camara.id },
        order: [["Data", "DESC"]],
        limit: 8,
      });

      res.render("user/home/homePage", {
        videos,
        latestnews,
        gestoesFiscais,
        licitacoes,
        contratos,
        sessoes,
        camara,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/user/transparencia");
    }
  }
}

module.exports = new HomeController();
