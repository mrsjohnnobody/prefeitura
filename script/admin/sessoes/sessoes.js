$(document).ready(function () {
  pagination();
  createSessao();
});

function createSessao() {
  try {
    $("#sessaoForm").submit(function (event) {
      loadPageAnimation(true);
      $("#addSessaoModal").modal("hide");

      event.preventDefault();
      var formData = {
        numero: $("#numero").val(),
        tipo: $("#tipo").val(),
        data: $("#data").val(),
        descricao: $("#descricao").val(),
        situacao: $("#situacao").val(),
      };

      $.ajax({
        type: "POST",
        url: "/admin/addSessao",
        data: formData,
        error: function (error) {
          loadToastNotification(
            "Não foi possível cadastrar a sessão",
            "danger"
          );
        },
        success: function (result) {
          if (result.status === "success") {
            loadToastNotification(result.message, "success");

            let newRow = `
                            <tr id="sessaoIdItem_${result.sessao.id}">
                                <td>
                                    ${result.sessao.Numero}
                                </td>
                                <td scope="row">
                                    ${result.sessao.Tipo}
                                </td>
                                <td>
                                    ${
                                      result.sessao.Data != "0000-00-00"
                                        ? new Date(
                                            result.sessao.Data
                                          ).toLocaleDateString("pt-BR", {
                                            timeZone: "UTC",
                                          })
                                        : ""
                                    }
                                </td>
                                <td>
                                    ${result.sessao.Descricao}
                                </td>
                                <td class="d-flex justify-content-center">
                                    ${result.sessao.Situacao}
                                </td>
                                <td scope="row">
                                    <a href="/admin/editSessao/${
                                      result.sessao.id
                                    }" style="text-decoration: none;">
                                        <img title="Editar Sessão" src="/icons/pencil-fill.svg" alt="Editar Sessão" height="20rem">
                                    </a>
                                    &nbsp;
                                    <span style="text-decoration: none; cursor: pointer;" onClick="setIdForRemoveSessao('${
                                      result.sessao.id
                                    }')" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                        <img title="Excluir sessão" src="/icons/x-circle-fill.svg" alt="Excluir sessão" height="20rem">
                                    </span>
                                </td>
                            </tr>
                        `;

            $("#sessoesTable tbody").append(newRow);
          } else {
            loadToastNotification(result.message, "danger");
          }
        },
      });

      loadPageAnimation(false);
    });
  } catch (error) {
    loadToastNotification("Não foi possível cadastrar a sessão", "danger");
    loadPageAnimation(false);
  }
}

function setIdForRemoveSessao(id) {
  if (!id) return;

  $("#btnDeleteModal").off("click");

  $("#btnDeleteModal").click(function () {
    loadPageAnimation(true);

    $.ajax({
      type: "GET",
      url: "/admin/deleteSessao/" + id,
      error: function (error) {
        $("#deleteModal").modal("hide");

        loadToastNotification("Não foi possível remover esta sessão", "danger");
      },
      success: function (result) {
        if (result.status === "success") {
          $("#deleteModal").modal("hide");

          loadToastNotification(result.message, "success");

          $("#sessaoIdItem_" + id).remove();
        } else {
          $("#deleteModal").modal("hide");

          loadToastNotification(result.message, "danger");
        }
      },
    });

    loadPageAnimation(false);
  });
}

function pagination() {
  $("#pagination").twbsPagination({
    totalPages: parseInt($("#totalPage").val()),
    visiblePages: 4,
    onPageClick: function (event, page) {
      event.preventDefault();

      var formData = { page: page };

      $.ajax({
        type: "GET",
        url: "/admin/sessoesList",
        data: formData,
        headers: { "page-header": page },
        error: function (error) {
          loadPageAnimation(false);
          loadToastNotification(
            "Não foi possível carregar a lista de sessões, tente novamente mais tarde",
            "danger"
          );
        },
        success: function (result) {
          if (result.status === "success") {
            $(".sessaoItem").remove();

            result.sessoes.forEach((sessao) => {
              $("#sessoesItems").append(`
                            <tr id="sessaoIdItem_${
                              sessao.id
                            }" class="sessaoItem">
                                <td>
                                    ${sessao.Numero}
                                </td>
                                <td scope="row">
                                    ${sessao.Tipo}
                                </td>
                                <td>
                                    ${
                                      sessao.Data != "0000-00-00"
                                        ? new Date(
                                            sessao.Data
                                          ).toLocaleDateString("pt-BR", {
                                            timeZone: "UTC",
                                          })
                                        : ""
                                    }
                                </td>
                                <td>
                                    ${sessao.Descricao}
                                </td>
                                <td class="d-flex justify-content-center">
                                    ${sessao.Situacao}
                                </td>
                                <td scope="row">
                                    <a href="/admin/editSessao/${
                                      sessao.id
                                    }" style="text-decoration: none;">
                                        <img title="Editar Sessão" src="/icons/pencil-fill.svg" alt="Editar Sessão" height="20rem">
                                    </a>
                                    &nbsp;
                                    <span style="text-decoration: none; cursor: pointer;" onClick="setIdForRemoveSessao('${
                                      sessao.id
                                    }')" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                        <img title="Excluir sessão" src="/icons/x-circle-fill.svg" alt="Excluir sessão" height="20rem">
                                    </span>
                                </td>
                            </tr>
                            `);
            });

            $(window).scrollTop(0);
          } else {
            loadToastNotification(result.message, "danger");
          }

          loadPageAnimation(false);
        },
      });
    },
  });
}
