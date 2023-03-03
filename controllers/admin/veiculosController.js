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

  async viewVeiculosId(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      const id = req.params.id;

      if (!id) {
        return res.redirect("/admin/veiculos");
      }

      const veiculosValidate = await Veiculos.findOne({
        where: { id: req.params.id, CamaraId: camara.id },
      });

      if (!veiculosValidate) {
        return res.redirect("/admin/veiculos");
      }

      const veiculos = await Veiculos.findByPk(id);

      if (!veiculos) {
        return res.redirect("/admin/veiculos");
      }

      res.render("admin/veiculos/veiculosIdPage", {
        veiculos,
        camara,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/home");
    }
  }

  async deleteVeiculo(req, res) {
    try {
      const camara = await getInfoCamaraByUrl(req);

      const id = req.params.id;

      if (!id) {
        return res.status(200).json({
          status: "false",
          message: "Não foi possível remover esse veiculo",
        });
      }

      const veiculo = await Veiculos.findOne({
        where: { id: id, CamaraId: camara.id },
      });

      if (!veiculo) {
        return res.status(200).json({
          status: "false",
          message: "Nao foi possivel remover esse veiculo",
        });
      }

      await veiculo.destroy();

      return res
        .status(200)
        .json({ status: "success", message: "Veiculo removido com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "false",
        message:
          "Não foi possível realizar essa operação, tente novamente mais tarde",
      });
    }
  }

  async editVeiculos(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        res
          .status(200)
          .json({ status: "false", message: "Veiculo não encontrado" });
      }

      let veiculo = await Veiculos.findByPk(id);

      if (!veiculo) {
        res
          .status(200)
          .json({ status: "false", message: "Veiculo não encontrado" });
      }

      if (req.body.marca && veiculo.marca != req.body.marca) {
        veiculo.marca = req.body.marca;
      }

      if (req.body.modelo && veiculo.modelo != req.body.modelo) {
        veiculo.modelo = req.body.modelo;
      }

      if (req.body.placa && veiculo.placa != req.body.placa) {
        veiculo.placa = req.body.placa;
      }

      if (req.body.secretaria && veiculo.secretaria != req.body.secretaria) {
        veiculo.secretaria = req.body.secretaria;
      }

      if (req.body.finalidade && veiculo.finalidade != req.body.finalidade) {
        veiculo.finalidade = req.body.finalidade;
      }

      if (req.body.tipo && veiculo.tipo != req.body.tipo) {
        veiculo.tipo = req.body.tipo;
      }

      if (req.body.situacao && veiculo.situacao != req.body.situacao) {
        veiculo.situacao = req.body.situacao;
      }

      if (req.body.categoria && veiculo.categoria != req.body.categoria) {
        veiculo.categoria = req.body.categoria;
      }

      veiculo = await veiculo.save();

      return res
        .status(200)
        .json({ status: "success", message: "Veiculo editado com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "false",
        message:
          "Não foi possível realizar essa operação, tente novamente mais tarde",
      });
    }
  }
}

module.exports = new VeiculosController();
