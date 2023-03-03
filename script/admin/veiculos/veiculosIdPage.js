var MateriasToRemove = [];

$(document).ready(function () {
  changePrincipalInformation();
  getFormDataForRequest();
});

function changePrincipalInformation() {
  $("#editVeiculosMarca").click(function (event) {
    event.preventDefault();

    if ($("#veiculosMarca").attr("disabled")) {
      $("#veiculosMarca").removeAttr("disabled");
      $("#veiculosMarca").removeAttr("readonly");
      $("#veiculosMarca").trigger("focus");
    } else {
      $("#veiculosMarca").attr("disabled", true);
      $("#veiculosMarca").attr("readonly", true);
    }
  });

  $("#editVeiculosModelo").click(function (event) {
    event.preventDefault();

    if ($("#veiculosModelo").attr("disabled")) {
      $("#veiculosModelo").removeAttr("disabled");
      $("#veiculosModelo").removeAttr("readonly");
      $("#veiculosModelo").trigger("focus");
    } else {
      $("#veiculosModelo").attr("disabled", true);
      $("#veiculosModelo").attr("readonly", true);
    }
  });

  $("#editVeiculosPlaca").click(function (event) {
    event.preventDefault();

    if ($("#veiculosPlaca").attr("disabled")) {
      $("#veiculosPlaca").removeAttr("disabled");
      $("#veiculosPlaca").removeAttr("readonly");
      $("#veiculosPlaca").trigger("focus");
    } else {
      $("#veiculosPlaca").attr("disabled", true);
      $("#veiculosPlaca").attr("readonly", true);
    }
  });

  $("#editVeiculosSecretaria").click(function (event) {
    event.preventDefault();

    if ($("#veiculosSecretaria").attr("disabled")) {
      $("#veiculosSecretaria").removeAttr("disabled");
      $("#veiculosSecretaria").removeAttr("readonly");
      $("#veiculosSecretaria").trigger("focus");
    } else {
      $("#veiculosSecretaria").attr("disabled", true);
      $("#veiculosSecretaria").attr("readonly", true);
    }
  });

  $("#editVeiculosFinalidade").click(function (event) {
    event.preventDefault();

    if ($("#veiculosFinalidade").attr("disabled")) {
      $("#veiculosFinalidade").removeAttr("disabled");
      $("#veiculosFinalidade").removeAttr("readonly");
      $("#veiculosFinalidade").trigger("focus");
    } else {
      $("#veiculosFinalidade").attr("disabled", true);
      $("#veiculosFinalidade").attr("readonly", true);
    }
  });

  $("#editVeiculosTipo").click(function (event) {
    event.preventDefault();

    if ($("#veiculosTipo").attr("disabled")) {
      $("#veiculosTipo").removeAttr("disabled");
      $("#veiculosTipo").removeAttr("readonly");
      $("#veiculosTipo").trigger("focus");
    } else {
      $("#veiculosTipo").attr("disabled", true);
      $("#veiculosTipo").attr("readonly", true);
    }
  });

  $("#editVeiculosSituacao").click(function (event) {
    event.preventDefault();

    if ($("#veiculosSituacao").attr("disabled")) {
      $("#veiculosSituacao").removeAttr("disabled");
      $("#veiculosSituacao").removeAttr("readonly");
      $("#veiculosSituacao").trigger("focus");
    } else {
      $("#veiculosSituacao").attr("disabled", true);
      $("#veiculosSituacao").attr("readonly", true);
    }
  });
}

function getFormDataForRequest() {
  $("#btnSendRequest").click(function (event) {
    var formData = {};

    //pegando informações principais
    const marca = $("#veiculosMarca").val();
    const modelo = $("#veiculosModelo").val();
    const placa = $("#veiculosPlaca").val();
    const secretaria = $("#veiculosSecretaria").val();
    const finalidade = $("#veiculosFinalidade").val();
    const tipo = $("#veiculosTipo").val();
    const situacao = $("#veiculosSituacao").val();

    //setando informações principais para serem enviadas na request
    formData.marca = marca;
    formData.modelo = modelo;
    formData.placa = placa;
    formData.secretaria = secretaria;
    formData.finalidade = finalidade;
    formData.tipo = tipo;
    formData.situacao = situacao;

    const url = `/admin/editVeiculos/` + $("#veiculoId").val();
    console.log(formData);
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      error: function (error) {
        loadPageAnimation(false);
        loadToastNotification(
          "Não foi possível editar esse veiculo, tente novamente mais tarde",
          "danger"
        );
      },
      success: function (result) {
        if (result.status === "success") {
          loadPageAnimation(false);
          loadToastNotification(result.message, "success");

          setTimeout(function () {
            window.location.reload(true);
          }, 2000);
        } else {
          loadPageAnimation(false);
          loadToastNotification(result.message, "danger");
        }
      },
    });
  });
}
