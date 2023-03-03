$(document).ready(function () {
  createVeiculo();
  // searchLei();
});

function setIdForRemoveVeiculo(id) {
  if (!id) return;

  $("#btnDeleteModal").off("click");

  $("#btnDeleteModal").click(function () {
    loadPageAnimation(true);
    $.ajax({
      type: "GET",
      url: "/admin/deleteVeiculo/" + id,
      error: function (error) {
        loadPageAnimation(false);

        $("#deleteModal").modal("hide");

        loadToastNotification(
          "Não foi possível remover esse veiculo",
          "danger"
        );
      },
      success: function (result) {
        loadPageAnimation(false);

        if (result.status === "success") {
          $("#deleteModal").modal("hide");

          loadToastNotification(result.message, "success");

          $("#veiculosIdItem_" + id).remove();
        } else {
          $("#deleteModal").modal("hide");

          loadToastNotification(result.message, "danger");
        }
      },
    });
  });
}

function createVeiculo() {
  try {
    $("#veiculosForm").submit(function (event) {
      loadPageAnimation(true);
      $("#addVeiculoModal").modal("hide");

      event.preventDefault();
      var formData = {
        marca: $("#marca").val(),
        modelo: $("#modelo").val(),
        placa: $("#placa").val(),
        secretaria: $("#secretaria").val(),
        finalidade: $("#finalidade").val(),
        tipo: $("#tipo").val(),
        situacao: $("#situacao").val(),
        categoria: $("#categoria").val(),
      };

      $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "/admin/addVeiculo",
        data: formData,
        error: function (error) {
          loadToastNotification(
            "Não foi possível adicionar este veiculo",
            "danger"
          );
        },
        success: function (result) {
          if (result.status === "success") {
            loadToastNotification(result.message, "success");
            loadPageAnimation(false);

            let newRow = `
                    <tr id="veiculoIdItem_${result.veiculos.id}">
                        <th scope="row">
                            ${result.veiculos.marca}
                        </th>
                        <th scope="row">
                            ${result.veiculos.modelo}
                        </th>
                        <th scope="row">
                            ${result.veiculos.placa}
                        </th>
                        <th scope="row">
                            ${result.veiculos.secretaria}
                        </th>   
                        <th scope="row">
                            ${result.veiculos.finalidade}
                        </th>   
                        <th scope="row">
                            ${result.veiculos.tipo}
                        </th>   
                        <th scope="row">
                            ${result.veiculos.situacao}
                        </th>   
                        <th scope="row">
                            ${result.veiculos.categoria}
                        </th>                       
                       
                    </tr>
                    `;

            $("#veiculosTable tbody").append(newRow);
          } else {
            loadToastNotification(result.message, "danger");
          }
        },
      });
    });

    loadPageAnimation(false);
  } catch (error) {
    loadToastNotification(result.message, "danger");
    loadPageAnimation(false);
  }
}

// function searchLei() {
//   $("#searchParlamentary").on("keyup", function () {
//     var value = $(this).val().toLowerCase();
//     $("#leisTable tr").filter(function () {
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
//     });
//   });
// }

function setIdForRedirectModal(value) {
  $("#btnConfirmRedirect").attr("href", `/admin/editVeiculos/${value}`);
}
