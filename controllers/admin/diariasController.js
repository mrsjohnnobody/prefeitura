//MODULES
const fs = require('fs');

// MODELS
const Diaria = require("../../models/Diaria");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class PrestacaoContasController {
  
  async viewDiarias(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req)

      let page = 0
        
      let pagination = {
        totalItems: 0,
        currentPage: page,
        totalPage : Math.ceil(await Diaria.count({where : {CamaraId: camara.id} }) / 10)
      }

      if(pagination.totalPage == 0 )
        pagination.totalPage = 1

      res.render("admin/diarias/diariasPage", { pagination, camara });
    } catch (error) {
        //salvar error em table
        console.log(error)
        res.redirect("/admin/home");
    }
  }

  async getDiariasList(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req)

      let page = req.header('page-header')
      
      if(page)
        page = parseInt(page)
      else
        page = 0
          
      let diarias = await Diaria.findAll({  
        where: {CamaraId: camara.id},
        offset: (page - 1) * 10, limit: 10,
        order: [ [ 'DataPortaria', 'DESC' ]],
      })
        
      let pagination = {
        totalItems: diarias.length,
        currentPage: page,
        totalPage : Math.ceil(await Diaria.count({where : {CamaraId: camara.id} }) / 10)
      }
    
      return res.status(200).json({ status: "success", diarias, pagination })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
    }
  }
  
  async addDiaria(req, res) {
    try{
      const camara = await getInfoCamaraByUrl(req)

      const { nomeAgente, cargoAgente, numero, valorTotal, dataPortaria, dataInicial, dataFinal, descricao, quantidade, valorUnitario } = req.body

      if(!nomeAgente || !cargoAgente || !numero || !valorTotal)
          return res.status(200).json({ status: "false", message: "As informações enviadas são inválidas" })

      const diaria =  {
          Numero: numero,
          NomeAgente: nomeAgente,
          CargoAgente: cargoAgente,
          DataPortaria: dataPortaria,
          DataInicial: dataInicial,
          DataFinal: dataFinal,
          Descricao: descricao,	
          ValorTotal: valorTotal,	
          ValorUnitario: valorUnitario,	
          Quantidade: quantidade,	
          Path: req.file ? req.file.path : null,
          CamaraId: camara.id
      }
      
      const diariaReturn = await Diaria.create(diaria)

      return res.status(200).json({ status: "success", message: "Diária cadastrada com sucesso", diaria: diariaReturn})

    } catch (error) {
        //salvar error em table
        console.log(error)
        return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
    }
  }

  async deleteDiaria(req, res) {
    try{
      const camara = await getInfoCamaraByUrl(req)

      if(!req.params.id)
        return res.status(200).json({ status: "false", message: "Não foi possível remover esta diária" });
      
      const diaria = await Diaria.findOne({where: {id: req.params.id, CamaraId: camara.id}});
  
      if (!diaria)
        return res.status(200).json({ status: "false", message: "Não foi possível remover esta diária" })

      if(diaria.path)
        fs.unlinkSync(diaria.path);
  
      await diaria.destroy();
  
      return res.status(200).json({ status: "success", message: "Diária removida com sucesso"});

    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
    }
  }

  async viewDiariaId(req, res) {
    try{
      const camara = await getInfoCamaraByUrl(req)

      if(!req.params.id)
        return res.redirect('/admin/diarias')
      
      const diaria = await Diaria.findOne({where: {id: req.params.id, CamaraId: camara.id}});
  
      if (!diaria)
        return res.redirect('/admin/diarias')
  
      res.render("admin/diarias/diariaIdPage", { diaria, camara });

    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
    }
  }

}

module.exports = new PrestacaoContasController();