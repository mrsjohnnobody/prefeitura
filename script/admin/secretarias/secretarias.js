$(document).ready(function () {
  createSecretaria();
  // pagination();
});

function createSecretaria() {
  try {
    $("#secretariaForm").submit(function (event) {
      loadPageAnimation(true);
      $("#addSecretariaModal").modal("hide");

      event.preventDefault();
      var formData = {
        cnpj: $("#cnpj").val(),
        telefone: $("#telefone").val(),
        email: $("#email").val(),
        horario: $("#horario").val(),
        endereco: $("#endereco").val(),
      };

      $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "/admin/addSecretaria",
        data: formData,
        error: function (error) {
          loadToastNotification(
            "Não foi possível adicionar esta Secretaria",
            "danger"
          );
        },
        success: function (result) {
          if (result.status === "success") {
            loadToastNotification(result.message, "success");
            loadPageAnimation(false);

            let newRow = `
                  <tr id="secretariaIdItem_${result.secretaria.id}">
                    <th scope="row">${result.secretaria.cnpj}</th>                    
                    <th scope="row">${result.secretaria.telefone}</th>
                    <th scope="row">${result.secretaria.email}</th>
                    <th scope="row">${result.secretaria.horario}</th>
                    <th scope="row">${result.secretaria.endereco}</th>
                    <th scope="row">${result.secretaria.secretario}</th>
                    <th scope="row">
                      <a
                        href="/admin/editSecretaria/${result.secretaria.id}"
                        style="text-decoration: none"
                      >
                        <img
                          title="Editar secretaria"
                          src="/icons/pencil-fill.svg"
                          alt="Editar secretaria"
                          height="20rem"
                        />
                      </a>
                      &nbsp;
                      <span
                        style="text-decoration: none; cursor: pointer"
                        onClick="setIdForRemoveSecretaria('${result.secretaria.id}')"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                      >
                        <img
                          title="Excluir secretaria"
                          src="/icons/x-circle-fill.svg"
                          alt="Excluir obra"
                          height="20rem"
                        />
                      </span>
                    </th>
                  </tr>
                `;

            $("#secretariaTable tbody").append(newRow);
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

function setIdForRemoveSecretaria(id) {
  if (!id) {
    return;
  }

  $("#btnDeleteModal").off("click");

  $("#btnDeleteModal").click(function () {
    loadPageAnimation(true);

    $.ajax({
      type: "GET",
      url: "/admin/deleteSecretaria/" + id,
      error: function (error) {
        $("#deleteModal").modal("hide");

        loadToastNotification(
          "Não foi possível remover esta Secretaria",
          "danger"
        );
      },
      success: function (result) {
        if (result.status === "success") {
          $("#deleteModal").modal("hide");

          loadToastNotification(result.message, "success");

          $("#secretariaIdItem_" + id).remove();
        } else {
          $("#deleteModal").modal("hide");

          loadToastNotification(result.message, "danger");
        }
      },
    });

    loadPageAnimation(false);
  });
}
