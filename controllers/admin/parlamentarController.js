//MODELS
const Parlamentar = require("../../models/Parlamentar");

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

//DEPENDENCIES
const moment = require("moment");

class ParlamentarController {
    async viewParlamentares(req, res){
        const camara = await getInfoCamaraByUrl(req)

        const parlamentares = await Parlamentar.findAll({ where: { CamaraId: camara.id } });
        res.render("admin/parlamentar/parlamentaresPage", { parlamentares, camara });
    }

    async addParlamentar(req, res){
        try {
            const camara = await getInfoCamaraByUrl(req)

            const { name, nickname, email, phoneNumber, birthdate, occupation, legislatura } = req.body;
    
            if (!name || !occupation || !legislatura)
                return res.status(200).json({ status: "false", message: "Nome e cargo e legislatura são obrigatórios" });

            if (birthdate && !moment(birthdate, "YYYY-MM-DD", true).isValid())
                return res.status(200).json({ status: "false", message: "Data invalida" });
    
            let parlamentar = {
                name: name,
                nickname: nickname,
                email: email,
                image: "icons/person-x-fill.svg",
                phoneNumber: phoneNumber,
                birthdate: new Date(birthdate),
                occupation: occupation,
                legislatura: legislatura,
                CamaraId: camara.id
            };
    
            if (!birthdate) {
                parlamentar.birthdate = null;
            }
    
            if (req.file) parlamentar.image = req.file.path;
    
            await Parlamentar.create(parlamentar);
    
            return res.status(201).json({ status: "success", message: "Parlamentar adicionado com sucesso", parlamentar });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
        }
    }

    async deleteParlamentar(req, res){
        const camara = await getInfoCamaraByUrl(req)

        const parlamentar = await Parlamentar.findOne({where: {id: req.params.id, CamaraId: camara.id}});

        if (!parlamentar) 
            return console.log("parlamentar não encontrado, erro"); //return message erro

        await parlamentar.destroy();

        return res.redirect("/admin/parlamentares"); //return message success
    }

    async editParlamentar(req, res){
        try {
            const { changeName, changeNickname, changeEmail, changePhoneNumber, changeDate, changeOccupation, changeLegislatura } = req.body;
    
            let parlamentar = await Parlamentar.findByPk(req.params.id);
        
            if (!parlamentar) 
                return res.status(200).json({ status: "false", message: "Parlamentar não encontrado" });
        
            if (changeName) 
                parlamentar.name = changeName;
        
            if (changeNickname) 
                parlamentar.nickname = changeNickname;
        
            if (changeEmail) 
                parlamentar.email = changeEmail;
        
            if (req.file) 
                parlamentar.image = req.file.path;
        
            if (changePhoneNumber) 
                parlamentar.phoneNumber = changePhoneNumber;
        
            if (changeDate) 
                parlamentar.birthdate = new Date(changeDate);
        
            if (changeOccupation) 
                parlamentar.occupation = changeOccupation;

            if (changeLegislatura) 
                parlamentar.legislatura = changeLegislatura;
        
            parlamentar = await parlamentar.save();
    
            return res.status(201).json({ status: "success", message: "Parlamentar editado com sucesso", parlamentar });
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
        }
    }
}

module.exports = new ParlamentarController
