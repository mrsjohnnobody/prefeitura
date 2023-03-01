const Glossario = require("../../models/Glossario");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class glossarioController {
  async viewglossario(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    let page = 0
    
    let pagination = {
      totalItems: 0,
      currentPage: page,
      totalPage : Math.ceil(await Glossario.count({where : {CamaraId: camara.id} }) / 10)
    }

    res.render("user/glossario/glossarioPage", { pagination, camara })
  }

  async getGlossarioList(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req)

      let page = req.header('page-header')
      
      if(page)
        page = parseInt(page)
      else
        page = 0

      let glossario = await Glossario.findAll({ 
        where: {CamaraId: camara.id},
        offset: (page - 1) * 10, limit: 10 
      })
      
      let pagination = {
        totalItems: glossario.length,
        currentPage: page,
        totalPage : Math.ceil(await Glossario.count({where : {CamaraId: camara.id} }) / 10)
      }
  
      return res.status(200).json({ status: "success", glossario, pagination })

    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
    }
  }
}

module.exports = new glossarioController();
