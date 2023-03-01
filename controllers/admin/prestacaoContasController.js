//MODULES
const fs = require('fs');

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

// MODELS
const PrestacaoContas = require("../../models/PrestacaoContas");
const Parlamentar = require("../../models/Parlamentar");

class PrestacaoContasController {
  async viewPrestacaoContas(req, res) {
    try {
        const camara = await getInfoCamaraByUrl(req)

        const prestacaoContas = await PrestacaoContas.findAll({
          where: { CamaraId: camara.id },
          include: [
            {
              model: Parlamentar,
              required: true,
            },
          ],
        });

        const parlamentares = await Parlamentar.findAll({ raw: true });

        res.render("admin/prestacaoContas/prestacaoContasPage", { prestacaoContas, parlamentares, camara});
    } catch (error) {
        //salvar error em table
        console.log(error)
        res.redirect("/admin/home");
    }
  }
  
  async addPrestacaoContas(req, res) {
    try{
        const camara = await getInfoCamaraByUrl(req)

        const { InitialDate, FinalDate, parlamentarId } = req.body;
        if(!InitialDate || !FinalDate || !parlamentarId)
            return res.status(200).json({ status: "false", message: "As informações enviadas são inválidas" })
        
        const InitialDateObject = new Date(InitialDate); 
        const FinalDateObject = new Date(FinalDate);
        const totalMeses = (FinalDateObject.getMonth() + 12 * FinalDateObject.getFullYear()) - (InitialDateObject.getMonth() + 12 * InitialDateObject.getFullYear())
        let description = 'ANUAL'

        if(totalMeses <= 1)
          description = 'MENSAL'
        else if(totalMeses == 2)
          description = 'BIMESTRAL'
        else if(totalMeses == 3)
          description = 'TRIMESTRAL'
        else if(totalMeses == 4)
          description = 'Quadrimestral'
        else if(totalMeses == 6)
          description = 'Semestral'

        description +- (' -' + InitialDateObject.getFullYear())
        let prestacaoContas = {
            Initdate: InitialDate,
            Finaldate: FinalDate,
            ParlamentarId: parlamentarId,
            path: req.file.path,
            description: description,
            CamaraId: camara.id,
        }
        
        prestacaoContas = await PrestacaoContas.create(prestacaoContas)

        prestacaoContas = await PrestacaoContas.findByPk(
          prestacaoContas.id, 
          { include: [{model: Parlamentar, required: true}] 
        })

        return res.status(200).json({ status: "success", message: "Contrato cadastrado com sucesso", prestacaoContas: prestacaoContas })

    } catch (error) {
        //salvar error em table
        console.log(error)
        return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
    }
  }

  async deletePrestacaoContas(req, res) {
    try{
      const camara = await getInfoCamaraByUrl(req)

      if(!req.params.id)
      return res.status(200).json({ status: "false", message: "Não foi possível remover essa prestação de contas" });
      
      const prestacaoContas = await PrestacaoContas.findOne({where: {id: req.params.id, CamaraId: camara.id}});
  
      if (!prestacaoContas)
        return res.status(200).json({ status: "false", message: "Não foi possível remover essa prestação de contas" });

      await fs.unlinkSync(prestacaoContas.path);
      
      await prestacaoContas.destroy();
  
      return res.status(200).json({ status: "success", message: "Prestação de contas removida com sucesso"});

    } catch (error) {
      //salvar error em table
      console.log(error)
      return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
    }
  }
}

module.exports = new PrestacaoContasController();