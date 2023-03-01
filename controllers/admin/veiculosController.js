//MODELS
const Veiculos = require("../../models/Veiculos");

const getInfoCamaraByUrl = require("../../helpers/getInfoCamaraByUrl");

class VeiculosController {
  async viewVeiculos(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      const veiculos = await Veiculos.findAll({
        where: { CamaraId: camara.id },
      });

      res.render("admin/veiculos/veiculosPage", { veiculos, camara });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/home");
    }
  }

  async createVeiculo(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      const {
        marca,
        modelo,
        placa,
        secretaria,
        finalidade,
        tipo,
        situacao,
        categoria,
      } = req.body;

      console.log(
        marca,
        modelo,
        placa,
        secretaria,
        finalidade,
        tipo,
        situacao,
        categoria
      );

      if (
        !marca ||
        !modelo ||
        !placa ||
        !modelo ||
        !secretaria ||
        !finalidade ||
        !tipo ||
        !situacao ||
        !categoria
      ) {
        return res.status(200).json({
          status: "false",
          message: "As informações enviadas são inválidas",
        });
      }

      const veiculo = {
        marca: marca,
        modelo: modelo,
        placa: placa,
        secretaria: secretaria,
        finalidade: finalidade,
        tipo: tipo,
        situacao: situacao,
        categoria: categoria,
        CamaraId: camara.id,
      };

      const veiculoReturn = await Veiculos.create(veiculo);

      return res.status(200).json({
        status: "success",
        message: "Veiculo cadastrado com sucesso",
        veiculo: veiculoReturn,
      });
    } catch (error) {
      //salvar error em table
      return res.status(500).json({
        status: "false",
        message:
          "Não foi possível realizar essa operação, tente novamente mais tarde",
      });
    }
  }
}

module.exports = new VeiculosController();
