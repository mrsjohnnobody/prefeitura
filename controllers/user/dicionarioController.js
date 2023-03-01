//MODELS
const Dicionario = require("../../models/Dicionario");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class dicionarioController {
  async viewdicionario(req, res) {
    const camara = await getInfoCamaraByUrl(req)

    let page = 0
    
    let pagination = {
      totalItems: 0,
      currentPage: page,
      totalPage : Math.ceil(await Dicionario.count({where : {CamaraId: camara.id} }) / 10)
    }

    res.render("user/dicionario/dicionarioPage", { pagination, camara })
  }

  async getDicionarioList(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req)

      let page = req.header('page-header')
      
      if(page)
        page = parseInt(page)
      else
        page = 0

      let dicionario = await Dicionario.findAll({
        where: {CamaraId: camara.id},
        offset: (page - 1) * 10, limit: 10 
      })
      
      let pagination = {
        totalItems: dicionario.length,
        currentPage: page,
        totalPage : Math.ceil(await Dicionario.count({where : {CamaraId: camara.id} }) / 10)
      }
  
      return res.status(200).json({ status: "success", dicionario, pagination })

    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
    }
  }
}

module.exports = new dicionarioController();
