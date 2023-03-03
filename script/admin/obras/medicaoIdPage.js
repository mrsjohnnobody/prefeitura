var MateriasToRemove = [];

$(document).ready(function () {
  changePrincipalInformation();
  getFormDataForRequest();
});

function changePrincipalInformation() {
  $("#editMedicaoDataMedicao").click(function (event) {
    event.preventDefault();

    if ($("#medicaoDataMedicao").attr("disabled")) {
      $("#medicaoDataMedicao").removeAttr("disabled");
      $("#medicaoDataMedicao").removeAttr("readonly");
      $("#medicaoDataMedicao").trigger("focus");
    } else {
      $("#medicaoDataMedicao").attr("disabled", true);
      $("#medicaoDataMedicao").attr("readonly", true);
    }
  });

  $("#editMedicaoDataInicio").click(function (event) {
    event.preventDefault();

    if ($("#medicaoDataInicio").attr("disabled")) {
      $("#medicaoDataInicio").removeAttr("disabled");
      $("#medicaoDataInicio").removeAttr("readonly");
      $("#medicaoDataInicio").trigger("focus");
    } else {
      $("#medicaoDataInicio").attr("disabled", true);
      $("#medicaoDataInicio").attr("readonly", true);
    }
  });

  $("#editMedicaoDataFinal").click(function (event) {
    event.preventDefault();

    if ($("#medicaoDataFinal").attr("disabled")) {
      $("#medicaoDataFinal").removeAttr("disabled");
      $("#medicaoDataFinal").removeAttr("readonly");
      $("#medicaoDataFinal").trigger("focus");
    } else {
      $("#medicaoDataFinal").attr("disabled", true);
      $("#medicaoDataFinal").attr("readonly", true);
    }
  });

  $("#editMedicaoValorMedicao").click(function (event) {
    event.preventDefault();

    if ($("#medicaoValorMedicao").attr("disabled")) {
      $("#medicaoValorMedicao").removeAttr("disabled");
      $("#medicaoValorMedicao").removeAttr("readonly");
      $("#medicaoValorMedicao").trigger("focus");
    } else {
      $("#medicaoValorMedicao").attr("disabled", true);
      $("#medicaoValorMedicao").attr("readonly", true);
    }
  });

  $("#editMedicaoEmpresaResponsavel").click(function (event) {
    event.preventDefault();

    if ($("#medicaoEmpresaResponsavel").attr("disabled")) {
      $("#medicaoEmpresaResponsavel").removeAttr("disabled");
      $("#medicaoEmpresaResponsavel").removeAttr("readonly");
      $("#medicaoEmpresaResponsavel").trigger("focus");
    } else {
      $("#medicaoEmpresaResponsavel").attr("disabled", true);
      $("#medicaoEmpresaResponsavel").attr("readonly", true);
    }
  });

  $("#editMedicaoCnpjEmpresa").click(function (event) {
    event.preventDefault();

    if ($("#medicaoCnpjEmpresa").attr("disabled")) {
      $("#medicaoCnpjEmpresa").removeAttr("disabled");
      $("#medicaoCnpjEmpresa").removeAttr("readonly");
      $("#medicaoCnpjEmpresa").trigger("focus");
    } else {
      $("#medicaoCnpjEmpresa").attr("disabled", true);
      $("#medicaoCnpjEmpresa").attr("readonly", true);
    }
  });

  $("#editMedicaoResponsavelTecnicoEmpresa").click(function (event) {
    event.preventDefault();

    if ($("#medicaoResponsavelTecnicoEmpresa").attr("disabled")) {
      $("#medicaoResponsavelTecnicoEmpresa").removeAttr("disabled");
      $("#medicaoResponsavelTecnicoEmpresa").removeAttr("readonly");
      $("#medicaoResponsavelTecnicoEmpresa").trigger("focus");
    } else {
      $("#medicaoResponsavelTecnicoEmpresa").attr("disabled", true);
      $("#medicaoResponsavelTecnicoEmpresa").attr("readonly", true);
    }
  });

  $("#editMedicaoResponsavelTecnicoPrefeitura").click(function (event) {
    event.preventDefault();

    if ($("#medicaoResponsavelTecnicoPrefeitura").attr("disabled")) {
      $("#medicaoResponsavelTecnicoPrefeitura").removeAttr("disabled");
      $("#medicaoResponsavelTecnicoPrefeitura").removeAttr("readonly");
      $("#medicaoResponsavelTecnicoPrefeitura").trigger("focus");
    } else {
      $("#medicaoResponsavelTecnicoPrefeitura").attr("disabled", true);
      $("#medicaoResponsavelTecnicoPrefeitura").attr("readonly", true);
    }
  });
}

function setIdForRemoveMateria(id) {
  if (!id) return;

  $("#btnDeleteModal").off("click");

  $("#btnDeleteModal").click(function () {
    loadPageAnimation(true);
    $.ajax({
      type: "GET",
      url: "/admin/deleteMateria/" + id,
      error: function (error) {
        loadPageAnimation(false);

        $("#deleteModal").modal("hide");

        loadToastNotification(
          "Não foi possível remover esta matéria",
          "danger"
        );
      },
      success: function (result) {
        loadPageAnimation(false);

        if (result.status === "success") {
          $("#deleteModal").modal("hide");

          loadToastNotification(result.message, "success");

          $("#materiaIdItem_" + id).remove();
        } else {
          $("#deleteModal").modal("hide");

          loadToastNotification(result.message, "danger");
        }
      },
    });
  });
}

function getFormDataForRequest() {
  $("#btnSendRequest").click(function (event) {
    var formData = {};

    //pegando informações principais
    const dataMedicao = $("#medicaoDataMedicao").val();
    const dataInicio = $("#medicaoDataInicio").val();
    const dataFinal = $("#medicaoDataFinal").val();
    const valorMedicao = $("#medicaoValorMedicao").val();
    const empresaResponsavel = $("#medicaoEmpresaResponsavel").val();
    const cnpjEmpresa = $("#medicaoCnpjEmpresa").val();
    const responsavelTecnicoEmpresa = $(
      "#medicaoResponsavelTecnicoEmpresa"
    ).val();
    const responsavelTecnicoPrefeitura = $(
      "#medicaoResponsavelTecnicoPrefeitura"
    ).val();

    //setando informações principais para serem enviadas na request
    formData.dataMedicao = dataMedicao;
    formData.dataInicio = dataInicio;
    formData.dataFinal = dataFinal;
    formData.valorMedicao = valorMedicao;
    formData.empresaResponsavel = empresaResponsavel;
    formData.cnpjEmpresa = cnpjEmpresa;
    formData.responsavelTecnicoEmpresa = responsavelTecnicoEmpresa;
    formData.responsavelTecnicoPrefeitura = responsavelTecnicoPrefeitura;

    const url = `/admin/editMedicao/` + $("#medicaoId").val();
    console.log(formData);
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      error: function (error) {
        loadPageAnimation(false);
        loadToastNotification(
          "Não foi possível editar essa medicao, tente novamente mais tarde",
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
