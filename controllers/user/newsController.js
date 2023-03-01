//MODELS
const News = require("../../models/News");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class NewsController {
    async viewNews(req, res){
        const camara = await getInfoCamaraByUrl(req)

        const news = await News.findAll({where: {id: req.params.id, CamaraId: camara.id}});
        res.render("user/noticias/noticiasPage", { news, camara });
    }

    async viewNewsById(req, res){
        const camara = await getInfoCamaraByUrl(req)

        const news = await News.findOne({where: {id: req.params.id, CamaraId: camara.id}});

        if (!news) 
            return res.redirect("/user/news");

        const lastedNews = await News.findAll({where : {CamaraId: camara.id}, limit: 5 });

        res.render("user/noticias/noticiaIdPage", { news, lastedNews , camara });
    }
}

module.exports = new NewsController
