//MODULES
const fs = require('fs');

// MODELS
const Contrato = require("../../models/Contrato");
const Licitacao = require("../../models/Licitacao");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class ContratoController {
  async viewContratos(req, res) {
    try {
        const camara = await getInfoCamaraByUrl(req)
        const contratos = await Contrato.findAll({ where: { CamaraId: camara.id }});
        const licitacoes = await Licitacao.findAll({ where: { CamaraId: camara.id }});
        res.render("admin/contratos/contratosPage", { contratos, licitacoes, camara });
    } catch (error) {
        //salvar error em table
        res.redirect("/admin/contratos");
    }
  }
  
  async createContrato(req, res) {
    try{
        const camara = await getInfoCamaraByUrl(req)

        const { numero, dataExercicio, nomeContratado, objetivo, valorTotal, licitacaoId } = req.body;
        if(!numero || !dataExercicio || !nomeContratado || !objetivo || !valorTotal || !licitacaoId)
            return res.status(200).json({ status: "false", message: "As informações enviadas são inválidas" })
        
        const contrato = {
            Numero: numero,
            DataExercicio: dataExercicio,
            NomeContratado: nomeContratado,
            Objetivo: objetivo,
            ValorTotal: valorTotal,
            path: req.file.path,
            LicitacaoId: licitacaoId,
            CamaraId: camara.id
        }
        
        const contratoReturn = await Contrato.create(contrato)
  
        return res.status(200).json({ status: "success", message: "Contrato cadastrado com sucesso", contrato: contratoReturn })

    } catch (error) {
        //salvar error em table
        console.log(error)
        res.redirect("/admin/contratos");
    }
  }

  async deleteContrato(req, res) {
    try{
      const camara = await getInfoCamaraByUrl(req)

      if(!req.params.id)
        return res.status(200).json({ status: "false", message: "Não foi possível remover este contrato" });
      
      const contrato = await Contrato.findOne({where: {id: req.params.id, CamaraId: camara.id}});
  
      if (!contrato)
        return res.status(200).json({ status: "false", message: "Não foi possível remover eestesta contrato" })
  
      await fs.unlinkSync(contrato.path);
      
      await contrato.destroy();
  
      return res.status(200).json({ status: "success", message: "Contrato removida com sucesso"});

    } catch (error) {
      //salvar error em table
      res.redirec("/admin/Contrato");
    }
  }
}

module.exports = new ContratoController();