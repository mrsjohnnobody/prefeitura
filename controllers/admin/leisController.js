//MODULES
const fs = require('fs');

// MODELS
const Leis = require("../../models/Leis");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl');

class leisController {
  async viewleis(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req)

      const leis = await Leis.findAll({
        where: { CamaraId: camara.id },
        order: [
          ["date", "DESC"]
        ]
      })

      res.render("admin/leis/leisPage", { leis, camara });
    } catch (error) {
      //salvar error em table
      res.redirec("/admin/home");
    }
  }

  async deleteLei(req, res) {
    try{
      const camara = await getInfoCamaraByUrl(req)

      if(!req.params.id)
        return res.status(200).json({ status: "false", message: "Não foi possível remover esta lei" });
      
      const lei = await Leis.findOne({where: {id: req.params.id, CamaraId: camara.id}});
  
      if (!lei)
        return res.status(200).json({ status: "false", message: "Não foi possível remover esta lei" })
  
      await fs.unlinkSync(lei.path);
      
      await lei.destroy();
  
      return res.status(200).json({ status: "success", message: "Lei removida com sucesso"});

    } catch (error) {
      //salvar error em table
      return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
    }
  }

  async createLei(req, res) {
    try{
      const camara = await getInfoCamaraByUrl(req)

      const { number, description, date } = req.body;
      console.log(number, description, date);
      if(!number || !description || !date)
        return res.status(200).json({ status: "false", message: "As informações enviadas são inválidas" })
  
      const lei = {
        number: number,
        description: description,
        date: date,
        path: req.file.path,
        CamaraId: camara.id 
      }
  
      const leiReturn = await Leis.create(lei)
  
      return res.status(200).json({ status: "success", message: "Lei cadastrada com sucesso", lei: leiReturn })

    } catch (error) {
      //salvar error em table
      return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
    }
  }
}

module.exports = new leisController();