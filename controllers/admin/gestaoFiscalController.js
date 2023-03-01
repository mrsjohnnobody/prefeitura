const fs = require('fs');

//MODELS
const GestaoFiscal = require("../../models/GestaoFiscal");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class GestaoFiscalController {
    async viewGestaoFiscal(req, res){
        const camara = await getInfoCamaraByUrl(req)
        const gestaofiscal = await GestaoFiscal.findAll({ where: { CamaraId: camara.id} });

        res.render("admin/gestaofiscal/gestaoFiscal", {gestaofiscal, camara});
    }

    async addGestaoFiscal(req, res){
        const camara = await getInfoCamaraByUrl(req)

        const { quadrimestre, ano, dataCadastro } = req.body;
        
        if(!quadrimestre || !ano)
            return console.log("O quadrimestre ou ano são obrigatórios");

        const existsGestaoFiscal = await GestaoFiscal.findOne({ where: { quadrimestre: quadrimestre, ano: ano  } });
        if(existsGestaoFiscal)
            return console.log("Já existe um arquivo cadastrado para este período");

        let gestaoFiscal = {
            nome: 'Relatório de Gestão Fiscal ' + quadrimestre + ' ' + ano,
            quadrimestre: quadrimestre,
            ano: ano,
            dataCadastro: dataCadastro,
            path: req.file.path,
            CamaraId: camara.id
        };

        await GestaoFiscal.create(gestaoFiscal);

        res.redirect("/admin/gestaoFiscal");
    }

    async editGestaoFiscal(req, res){
        const { changeQuadrimestre, changeAno, changeDataCadastro } = req.body;
        const id = req.params.id;

        if(!id)
            return console.log("Item inválido");

        if(!changeQuadrimestre || !changeAno || !changeDataCadastro)
            return console.log("O quadrimestre e ano são obrigatórios");

        let gestaoFiscal = await GestaoFiscal.findByPk(id);
        if(!gestaoFiscal)
            return console.log("O arquivo selecionado não existe na base de dados.");

        gestaoFiscal.nome = 'Relatório de Gestão Fiscal ' + changeQuadrimestre + ' ' + changeAno
        gestaoFiscal.quadrimestre = changeQuadrimestre
        gestaoFiscal.ano = changeAno
        gestaoFiscal.dataCadastro = changeDataCadastro

        if (req.file) gestaoFiscal.path = req.file.path;

        gestaoFiscal = await gestaoFiscal.save();

        res.redirect("/admin/gestaoFiscal");
    }

    async deleteGestaoFiscal(req, res){
        const camara = await getInfoCamaraByUrl(req)

        if (!req.params.id) 
            return console.log("Item inválido"); //return message erro

        const gestãofiscal = await GestaoFiscal.findOne({where: {id: req.params.id, CamaraId: camara.id}});

        if (!gestãofiscal) 
            return console.log("Relatório não encontrado"); //return message erro

        if(gestãofiscal.path)
            fs.unlinkSync(gestãofiscal.path);

        await gestãofiscal.destroy();

        return res.redirect("/admin/gestaoFiscal"); //return message success
    }
}

module.exports = new GestaoFiscalController
