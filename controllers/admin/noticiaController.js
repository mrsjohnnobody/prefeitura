const fs = require('fs');

//MODELS
const News = require("../../models/News");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

//DEPENDENCIES
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class NewsController {
    async viewNoticias(req, res){
        const camara = await getInfoCamaraByUrl(req)
        const news = await News.findAll({ where: { CamaraId: camara.id } });
        res.render("admin/noticias/noticiasPage", { news, camara});
    }

    async viewNoticiaId(req, res){
        const camara = await getInfoCamaraByUrl(req)

        if(!req.params.id)
            res.redirect("/admin/noticias");

        const news = await News.findOne({where: {id: req.params.id, CamaraId: camara.id}});

        if(!news)
            res.redirect("/admin/noticias");

        res.render("admin/noticias/noticiaIdPage", { news, camara });
    }

    async addNoticia(req, res){
        try {
            const camara = await getInfoCamaraByUrl(req)
            
            const { title, content } = req.body;
    
            if (!title || !content)
                return res.status(200).json({ status: "false", message: "O título da notícia e o conteúdo são obrigatórios" });

            const news = {
                title: title,
                content: content,
                image: req.file.path,
                type: "outro",
                numberOfViews: 0,
                CamaraId: camara.id
            };
            
            await News.create(news);
    
            return res.status(201).json({ status: "success", message: "Notícia cadastrada com sucesso", noticia: news });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
        }
    }

    async deleteNoticia(req, res) {
        try {
            const camara = await getInfoCamaraByUrl(req)

            if(!req.params.id)
                return res.status(200).json({ status: "false", message: "Não foi possível remover esta notícia" });
          
            const news = await News.findOne({where: {id: req.params.id, CamaraId: camara.id}});

            if (!news)
                return res.status(200).json({ status: "false", message: "Não foi possível remover esta notícia" });

            await fs.unlinkSync(news.image);

            await news.destroy();

            return res.status(200).json({ status: "success", message: "Notícia removida com sucesso"});
        } catch (error) {
            console.log(error)
            return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
        }

    }

}

module.exports = new NewsController
