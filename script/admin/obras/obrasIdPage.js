var MateriasToRemove = [];

$(document).ready(function () {
  changePrincipalInformation();
  createMedicao();
  getFormDataForRequest();
});

function changePrincipalInformation() {
  $("#editObraDataAndamento").click(function (event) {
    event.preventDefault();

    if ($("#obraDataAndamento").attr("disabled")) {
      $("#obraDataAndamento").removeAttr("disabled");
      $("#obraDataAndamento").removeAttr("readonly");
      $("#obraDataAndamento").trigger("focus");
    } else {
      $("#obraDataAndamento").attr("disabled", true);
      $("#obraDataAndamento").attr("readonly", true);
    }
  });

  $("#editObraSecretaria").click(function (event) {
    event.preventDefault();

    if ($("#obraSecretaria").attr("disabled")) {
      $("#obraSecretaria").removeAttr("disabled");
      $("#obraSecretaria").removeAttr("readonly");
      $("#obraSecretaria").trigger("focus");
    } else {
      $("#obraSecretaria").attr("disabled", true);
      $("#obraSecretaria").attr("readonly", true);
    }
  });

  $("#editObraObjeto").click(function (event) {
    event.preventDefault();

    if ($("#obraObjeto").attr("disabled")) {
      $("#obraObjeto").removeAttr("disabled");
      $("#obraObjeto").removeAttr("readonly");
      $("#obraObjeto").trigger("focus");
    } else {
      $("#obraObjeto").attr("disabled", true);
      $("#obraObjeto").attr("readonly", true);
    }
  });

  $("#editObraTipo").click(function (event) {
    event.preventDefault();

    if ($("#obraTipo").attr("disabled")) {
      $("#obraTipo").removeAttr("disabled");
      $("#obraTipo").removeAttr("readonly");
      $("#obraTipo").trigger("focus");
    } else {
      $("#obraTipo").attr("disabled", true);
      $("#obraTipo").attr("readonly", true);
    }
  });

  $("#editObraLocalExecucao").click(function (event) {
    event.preventDefault();

    if ($("#obraLocalExecucao").attr("disabled")) {
      $("#obraLocalExecucao").removeAttr("disabled");
      $("#obraLocalExecucao").removeAttr("readonly");
      $("#obraLocalExecucao").trigger("focus");
    } else {
      $("#obraLocalExecucao").attr("disabled", true);
      $("#obraLocalExecucao").attr("readonly", true);
    }
  });

  $("#editObraValorTotal").click(function (event) {
    event.preventDefault();

    if ($("#obraValorTotal").attr("disabled")) {
      $("#obraValorTotal").removeAttr("disabled");
      $("#obraValorTotal").removeAttr("readonly");
      $("#obraValorTotal").trigger("focus");
    } else {
      $("#obraValorTotal").attr("disabled", true);
      $("#obraValorTotal").attr("readonly", true);
    }
  });

  $("#editObraTotalMed").click(function (event) {
    event.preventDefault();

    if ($("#obraTotalMed").attr("disabled")) {
      $("#obraTotalMed").removeAttr("disabled");
      $("#obraTotalMed").removeAttr("readonly");
      $("#obraTotalMed").trigger("focus");
    } else {
      $("#obraTotalMed").attr("disabled", true);
      $("#obraTotalMed").attr("readonly", true);
    }
  });

  $("#editObraPercentualConcl").click(function (event) {
    event.preventDefault();

    if ($("#obraPercentualConcl").attr("disabled")) {
      $("#obraPercentualConcl").removeAttr("disabled");
      $("#obraPercentualConcl").removeAttr("readonly");
      $("#obraPercentualConcl").trigger("focus");
    } else {
      $("#obraPercentualConcl").attr("disabled", true);
      $("#obraPercentualConcl").attr("readonly", true);
    }
  });
}

function setIdForRedirectModal(id) {
  $("#btnConfirmRedirect").attr("href", `/admin/editMedicao/${id}`);
}

function createMedicao() {
  $("#addMedicaoForm").submit(function (event) {
    loadPageAnimation(true);
    $("#addMedicaoModal").modal("hide");

    event.preventDefault();

    var formData = {
      dataMedicao: $("#dataMedicao").val(),
      dataInicio: $("#dataInicio").val(),
      dataFinal: $("#dataFinal").val(),
      valorMedicao: $("#valorMedicao").val(),
      empresaResponsavel: $("#empresaResponsavel").val(),
      cnpjEmpresa: $("#cnpjEmpresa").val(),
      responsavelTecnicoEmpresa: $("#responsavelTecnicoEmpresa").val(),
      responsavelTecnicoPrefeitura: $("#responsavelTecnicoPrefeitura").val(),
      obraId: $("#obraId").val(),
    };

    $.ajax({
      type: "POST",
      url: "/admin/addMedicao",
      data: formData,
      error: function (error) {
        loadPageAnimation(false);
        loadToastNotification("Não foi possível adicionar a medicao", "danger");
      },
      success: function (result) {
        if (result.status === "success") {
          loadPageAnimation(false);
          loadToastNotification(result.message, "success");

          let newRow = `
                    <tr>
                        <td>
                            ${result.medicao.dataMedicao}
                        </td>
                        <td>
                            ${result.medicao.dataInicio}
                        </td>
                        <td>
                            ${result.medicao.dataFinal}
                        </td>
                        <td>
                            ${result.medicao.valorMedicao}
                        </td>
                        <td>
                            ${result.medicao.empresaResponsavel}
                        </td>
                        <td>
                            ${result.medicao.cnpjEmpresa}
                        </td>
                        <td>
                            ${result.medicao.responsavelTecnicoEmpresa}
                        </td>
                        <td>
                            ${result.medicao.responsavelTecnicoPrefeitura}                    
                        </td>
                        <td>
                            <span data-bs-toggle="modal" data-bs-target="#confirmRedirectModal" onclick="setIdForRedirectModal(${result.medicao.id})" style="cursor: pointer">
                                <img title="Editar matéria" src="/icons/pencil-fill.svg" alt="Editar matéria" height="20rem">
                            </span>
                            <a href="#" style="text-decoration: none;" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="setIdForRemoveMateria(${result.medicao.id})">
                              <img title="Excluir Matéria" src="/icons/x-circle-fill.svg" alt="Excluir Matéria" height="20rem">
                            </a>
                        </td>
                    </tr>
                    `;

          $("#materiaTable tbody").append(newRow);
        } else {
          loadPageAnimation(false);
          loadToastNotification(result.message, "danger");
        }
      },
    });
  });
}

function setIdForRemoveMedicao(id) {
  if (!id) return;

  $("#btnDeleteModal").off("click");

  $("#btnDeleteModal").click(function () {
    loadPageAnimation(true);
    $.ajax({
      type: "GET",
      url: "/admin/deleteMedicao/" + id,
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

          $("#medicaoIdItem_" + id).remove();
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
    const dataAndamento = $("#obraDataAndamento").val();
    const secretaria = $("#obraSecretaria").val();
    const objeto = $("#obraObjeto").val();
    const tipo = $("#obraTipo").val();
    const localExecucao = $("#obraLocalExecucao").val();
    const valorTotal = $("#obraValorTotal").val();
    const totalMed = $("#obraTotalMed").val();
    const percentualConcl = $("#obraPercentualConcl").val();

    //setando informações principais para serem enviadas na request
    formData.dataAndamento = dataAndamento;
    formData.secretaria = secretaria;
    formData.objeto = objeto;
    formData.tipo = tipo;
    formData.localExecucao = localExecucao;
    formData.valorTotal = valorTotal;
    formData.totalMed = totalMed;
    formData.percentualConcl = percentualConcl;

    const url = `/admin/editObra/` + $("#obraId").val();
    console.log(formData);
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      error: function (error) {
        loadPageAnimation(false);
        loadToastNotification(
          "Não foi possível editar essa obra, tente novamente mais tarde",
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
