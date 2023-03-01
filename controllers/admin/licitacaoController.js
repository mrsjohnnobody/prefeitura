//MODELS
const Licitacao = require("../../models/Licitacao");
const LicitacaoAndamento = require("../../models/LicitacaoAndamento");
const LicitacaoFiles = require("../../models/LicitacaoFiles");
const LicitacaoPublicacao = require("../../models/LicitacaoPublicacao");
const LicitacaoResponsaveis = require("../../models/LicitacaoResponsaveis");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class LicitacaoController {
    async viewLicitacoes(req, res){
        try{
            const camara = await getInfoCamaraByUrl(req)
            const licitacoes = await Licitacao.findAll({ where: { CamaraId: camara.id} });
            res.render("admin/licitacoes/licitacoesPage", {licitacoes, camara});
        } catch (error) {
            //salvar error em table
            console.log(error)
            return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
        }
    }

    async viewEditLicitacao(req, res){
        try{
            const camara = await getInfoCamaraByUrl(req)

            const id = req.params.id

            if(!id)
                res.redirect('/admin/licitacoes')

            const licitacao = await Licitacao.findOne({
                where: {id: req.params.id, CamaraId: camara.id},
                include: [
                    LicitacaoFiles, 
                    LicitacaoAndamento,
                    LicitacaoPublicacao,
                    LicitacaoResponsaveis
                ],
            });

            res.render("admin/licitacoes/editLicitacaoPage", { licitacao, camara});
            
        }catch (error) {
            //salvar error em table
            console.log(error)
            return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
        }
    }

    async createLicitacao(req, res){
        try{
            const camara = await getInfoCamaraByUrl(req)

            const { number, modality, objective, date } = req.body;
            
            if(!number || !modality || !objective || !date)
                return res.status(200).json({ status: "false", message: "As informações enviadas são inválidas" })
            
            const licitacao = {
                ProcessNumber: number,
                Modality: modality,
                Objective: objective,
                OpeningDate: date,
                Situation : "Nova",
                CamaraId: camara.id
            }
        
            const licitacaoReturn = await Licitacao.create(licitacao)
        
            return res.status(200).json({ status: "success", message: "Licitação cadastrada com sucesso", licitacao: licitacaoReturn })
      
        } catch (error) {
            //salvar error em table
            console.log(error)
            return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
        }
    }

    async deleteLicitacao(req, res) {
        try{
          const camara = await getInfoCamaraByUrl(req)
    
          if(!req.params.id)
            return res.status(200).json({ status: "false", message: "Não foi possível remover esta licitação" });
          
          const licitacao = await Licitacao.findOne({where: {id: req.params.id, CamaraId: camara.id}});
      
          if (!licitacao)
            return res.status(200).json({ status: "false", message: "Não foi possível remover esta licitação" })
      
          //await fs.unlinkSync(lei.path);
          
          await licitacao.destroy();
      
          return res.status(200).json({ status: "success", message: "Licitação removida com sucesso"});
    
        } catch (error) {
          //salvar error em table
          console.log(error)
          return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
        }
    }

    async editLicitacao(req, res) {
        const id = req.params.id
        if(!id)
            res.status(200).json({ status: "false", message: "Licitação não encontrada"});
        
        try{
            let licitacao = await Licitacao.findByPk(id)
            if(!licitacao)
                res.status(200).json({ status: "false", message: "Licitação não encontrada"});

            if(req.body.processNumber && licitacao.ProcessNumber != req.body.processNumber)
                licitacao.ProcessNumber = req.body.processNumber

            if(req.body.type && licitacao.Type != req.body.type)
                licitacao.Type = req.body.type

            if(req.body.openingDate && licitacao.OpeningDate != req.body.openingDate)
                licitacao.OpeningDate = req.body.openingDate

            if(req.body.publicationDate && licitacao.PublicNoticeDate != req.body.publicationDate)
                licitacao.PublicNoticeDate = req.body.publicationDate

            if(req.body.objectInformation && licitacao.Objective != req.body.objectInformation)
                licitacao.Objective = req.body.objectInformation

            licitacao = await licitacao.save();

            if(req.body.LicitacaoPublicacaoListLength > 0){
                for(var i=0; i<req.body.LicitacaoPublicacaoListLength; i++){
                    const publicacao = {
                        Date: req.body.LicitacaoPublicacaoDate[i],
                        Description: req.body.LicitacaoPublicacaoDescription[i],
                        Type: req.body.LicitacaoPublicacaoType[i],
                        LicitacaoId: id
                    }

                    await LicitacaoPublicacao.create(publicacao)
                }
            }

            if(req.body.LicitacaoResponsaveisListLength > 0){
                for(var i=0; i<req.body.LicitacaoResponsaveisListLength; i++){
                    const responsavel = {
                        Type: req.body.LicitacaoResponsaveisType[i],
                        Name: req.body.LicitacaoResponsaveisName[i],
                        LicitacaoId: id
                    }

                    await LicitacaoResponsaveis.create(responsavel)
                }
            }

            if(req.body.LicitacaoAndamentosListLength > 0){
                for(i=0; i<req.body.LicitacaoAndamentosListLength; i++){
                    const andamentos = {
                        DateTime: req.body.LicitacaoAndamentosDateTime[i],
                        Phase:  req.body.LicitacaoAndamentosPhase[i],
                        Situation: req.body.LicitacaoAndamentosSituation[i],
                        Responsible: req.body.LicitacaoAndamentosResponsible[i],
                        LicitacaoId: id
                    }

                    await LicitacaoAndamento.create(andamentos)
                }
            }

            if(req.files){
                req.files.forEach(async element => {
                    const licitacaoFiles = {
                        FileName: element.originalname,
                        Description: element.originalname.replace(".pdf", ""),
                        Path: element.path,
                        Size: (element.size / 1048576).toFixed(2).replace(".",",") + 'MB',
                        Extension: element.mimetype.replace("application/", ""),
                        LicitacaoId: id
                    }
                    
                    await LicitacaoFiles.create(licitacaoFiles)
                });
            }

            if(req.body.PublicacaosToRemoveLength > 0){
                for(i=0; i<req.body.PublicacaosToRemoveLength; i++){
                    const idPublicacao = req.body.PublicacaosToRemove[i]

                    const publicacao = await LicitacaoPublicacao.findByPk(idPublicacao)
                    if(publicacao)
                        publicacao.destroy()
                }
            }

            if(req.body.ResposaveisToRemoveLength > 0){
                for(i=0; i<req.body.ResposaveisToRemoveLength; i++){
                    const idResponsavel = req.body.ResposaveisToRemove[i]

                    const responsavel = await LicitacaoResponsaveis.findByPk(idResponsavel)
                    if(responsavel)
                        responsavel.destroy() 
                }
            }

            if(req.body.AndamentosToRemoveLength > 0){
                for(i=0; i<req.body.AndamentosToRemoveLength; i++){
                    const idAndamentos = req.body.AndamentosToRemove[i]

                    const andamento = await LicitacaoAndamento.findByPk(idAndamentos)
                    if(andamento)
                        andamento.destroy() 
                }
            }

            if(req.body.FilesToRemoveLength > 0){
                for(i=0; i<req.body.FilesToRemoveLength; i++){
                    const idFile = req.body.FilesToRemove[i]

                    const file = await LicitacaoFiles.findByPk(idFile)
                    if(file)
                        file.destroy() 
                }
            }
            
            return res.status(200).json({ status: "success", message: "Licitação editada com sucesso"});
    
        } catch (error) {
            //salvar error em table
            console.log(error)
            return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
        }
    }
}

module.exports = new LicitacaoController
