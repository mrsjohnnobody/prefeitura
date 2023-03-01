//MODELS

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class TransparenciaController {
    async viewTransparencia(req, res){
        const camara = await getInfoCamaraByUrl(req)

        res.render("user/transparencia/transparenciaPage", { camara });
    }
}

module.exports = new TransparenciaController
