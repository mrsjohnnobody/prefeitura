var MateriasToRemove = [];

$(document).ready(function () {
  changePrincipalInformation();
  createSecretario();
  getFormDataForRequest();
});

function changePrincipalInformation() {
  $("#editSecretariaCnpj").click(function (event) {
    event.preventDefault();

    if ($("#secretariaCnpj").attr("disabled")) {
      $("#secretariaCnpj").removeAttr("disabled");
      $("#secretariaCnpj").removeAttr("readonly");
      $("#secretariaCnpj").trigger("focus");
    } else {
      $("#secretariaCnpj").attr("disabled", true);
      $("#secretariaCnpj").attr("readonly", true);
    }
  });

  $("#editSecretariaTelefone").click(function (event) {
    event.preventDefault();

    if ($("#secretariaTelefone").attr("disabled")) {
      $("#secretariaTelefone").removeAttr("disabled");
      $("#secretariaTelefone").removeAttr("readonly");
      $("#secretariaTelefone").trigger("focus");
    } else {
      $("#secretariaTelefone").attr("disabled", true);
      $("#secretariaTelefone").attr("readonly", true);
    }
  });

  $("#editSecretariaEmail").click(function (event) {
    event.preventDefault();

    if ($("#secretariaEmail").attr("disabled")) {
      $("#secretariaEmail").removeAttr("disabled");
      $("#secretariaEmail").removeAttr("readonly");
      $("#secretariaEmail").trigger("focus");
    } else {
      $("#secretariaEmail").attr("disabled", true);
      $("#secretariaEmail").attr("readonly", true);
    }
  });

  $("#editSecretariaHorario").click(function (event) {
    event.preventDefault();

    if ($("#secretariaHorario").attr("disabled")) {
      $("#secretariaHorario").removeAttr("disabled");
      $("#secretariaHorario").removeAttr("readonly");
      $("#secretariaHorario").trigger("focus");
    } else {
      $("#secretariaHorario").attr("disabled", true);
      $("#secretariaHorario").attr("readonly", true);
    }
  });

  $("#editSecretariaEndereco").click(function (event) {
    event.preventDefault();

    if ($("#secretariaEndereco").attr("disabled")) {
      $("#secretariaEndereco").removeAttr("disabled");
      $("#secretariaEndereco").removeAttr("readonly");
      $("#secretariaEndereco").trigger("focus");
    } else {
      $("#secretariaEndereco").attr("disabled", true);
      $("#secretariaEndereco").attr("readonly", true);
    }
  });
}

function setIdForRedirectModal(value) {
  $("#btnConfirmRedirect").attr("href", `/admin/editSecretario/${value}`);
}

function createSecretario() {
  $("#addSecretarioForm").submit(function (event) {
    loadPageAnimation(true);
    $("#addSecretarioModal").modal("hide");

    event.preventDefault();

    var formData = {
      nome: $("#nome").val(),
      cargo: $("#cargo").val(),
      tipoNomeacao: $("#tipoNomeacao").val(),
      numeroAto: $("#numeroAto").val(),
      data: $("#data").val(),
      matricula: $("#matricula").val(),
      secretariaId: $("#secretariaId").val(),
    };

    $.ajax({
      type: "POST",
      url: "/admin/addSecretario",
      data: formData,
      error: function (error) {
        loadPageAnimation(false);
        loadToastNotification(
          "Não foi possível adicionar o secretario",
          "danger"
        );
      },
      success: function (result) {
        if (result.status === "success") {
          loadPageAnimation(false);
          loadToastNotification(result.message, "success");

          let newRow = `
                    <tr>
                        <td>
                            ${result.secretario.nome}
                        </td>
                        <td>
                            ${result.secretario.cargo}
                        </td>
                        <td>
                            ${result.secretario.tipoNomeacao}
                        </td>
                        <td>
                            ${result.secretario.numeroAto}
                        </td>
                        <td>
                            ${result.secretario.data}
                        </td>
                        <td>
                            ${result.secretario.matricula}
                        </td>                       
                        <td>
                            <span data-bs-toggle="modal" data-bs-target="#confirmRedirectModal" onclick="setIdForRedirectModal(${result.secretario.id})" style="cursor: pointer">
                                <img title="Editar secretario" src="/icons/pencil-fill.svg" alt="Editar secretario" height="20rem">
                            </span>
                            <a href="#" style="text-decoration: none;" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="setIdForRemoveSecretario(${result.secretario.id})">
                              <img title="Excluir secretario" src="/icons/x-circle-fill.svg" alt="Excluir secretario" height="20rem">
                            </a>
                        </td>
                    </tr>
                    `;

          $("#secretarioTable tbody").append(newRow);
        } else {
          loadPageAnimation(false);
          loadToastNotification(result.message, "danger");
        }
      },
    });
  });
}

function setIdForRemoveSecretario(id) {
  if (!id) return;

  $("#btnDeleteModal").off("click");

  $("#btnDeleteModal").click(function () {
    loadPageAnimation(true);
    $.ajax({
      type: "GET",
      url: "/admin/deleteSecretario/" + id,
      error: function (error) {
        loadPageAnimation(false);

        $("#deleteModal").modal("hide");

        loadToastNotification(
          "Não foi possível remover esse secretario",
          "danger"
        );
      },
      success: function (result) {
        loadPageAnimation(false);

        if (result.status === "success") {
          $("#deleteModal").modal("hide");

          loadToastNotification(result.message, "success");

          $("#secretarioIdItem_" + id).remove();
        } else {
          $("#deleteModal").modal("hide");

          loadToastNotification(result.message, "danger");
        }
      },
    });
  });
}

// function getFormDataForRequest() {
//   $("#btnSendRequest").click(function (event) {
//     var formData = {};

//     //pegando informações principais
//     const dataAndamento = $("#obraDataAndamento").val();
//     const secretaria = $("#obraSecretaria").val();
//     const objeto = $("#obraObjeto").val();
//     const tipo = $("#obraTipo").val();
//     const localExecucao = $("#obraLocalExecucao").val();
//     const valorTotal = $("#obraValorTotal").val();
//     const totalMed = $("#obraTotalMed").val();
//     const percentualConcl = $("#obraPercentualConcl").val();

//     //setando informações principais para serem enviadas na request
//     formData.dataAndamento = dataAndamento;
//     formData.secretaria = secretaria;
//     formData.objeto = objeto;
//     formData.tipo = tipo;
//     formData.localExecucao = localExecucao;
//     formData.valorTotal = valorTotal;
//     formData.totalMed = totalMed;
//     formData.percentualConcl = percentualConcl;

//     const url = `/admin/editObra/` + $("#obraId").val();
//     console.log(formData);
//     $.ajax({
//       type: "POST",
//       url: url,
//       data: formData,
//       error: function (error) {
//         loadPageAnimation(false);
//         loadToastNotification(
//           "Não foi possível editar essa obra, tente novamente mais tarde",
//           "danger"
//         );
//       },
//       success: function (result) {
//         if (result.status === "success") {
//           loadPageAnimation(false);
//           loadToastNotification(result.message, "success");

//           setTimeout(function () {
//             window.location.reload(true);
//           }, 2000);
//         } else {
//           loadPageAnimation(false);
//           loadToastNotification(result.message, "danger");
//         }
//       },
//     });
//   });
// }
