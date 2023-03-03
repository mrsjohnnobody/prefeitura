$(document).ready(function () {
  createObra();
  // pagination();
});

function createObra() {
  try {
    $("#obrasForm").submit(function (event) {
      loadPageAnimation(true);
      $("#addObraModal").modal("hide");

      event.preventDefault();
      var formData = {
        dataAndamento: $("#dataAndamento").val(),
        secretaria: $("#secretaria").val(),
        objeto: $("#objeto").val(),
        tipo: $("#tipo").val(),
        localExecucao: $("#localExecucao").val(),
        valorTotal: $("#valorTotal").val(),
        totalMed: $("#totalMed").val(),
        percentualConcl: $("#percentualConcl").val(),
      };

      $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "/admin/addObra",
        data: formData,
        error: function (error) {
          loadToastNotification(
            "Não foi possível adicionar esta obra",
            "danger"
          );
        },
        success: function (result) {
          if (result.status === "success") {
            loadToastNotification(result.message, "success");
            loadPageAnimation(false);

            let newRow = `
                    <tr id="obraIdItem_${result.obras.id}">
                        <th scope="row">
                            ${result.obras.dataAndamento}
                        </th>
                        <th scope="row">
                            ${result.obras.secretaria}
                        </th>
                        <th scope="row">
                            ${result.obras.objeto}
                        </th>
                        <th scope="row">
                            ${result.obras.tipo}
                        </th>   
                        <th scope="row">
                            ${result.obras.localExecucao}
                        </th>   
                        <th scope="row">
                            ${result.obras.valorTotal}
                        </th>   
                        <th scope="row">
                            ${result.obras.totalMed}
                        </th>   
                        <th scope="row">
                            ${result.obras.percentualConcl}
                        </th>
                        <th scope="row">
                      <a
                        href="/admin/editObra/${result.obras.id}"
                        style="text-decoration: none"
                      >
                        <img
                          title="Editar Sessão"
                          src="/icons/pencil-fill.svg"
                          alt="Editar obra"
                          height="20rem"
                        />
                      </a>
                      &nbsp;
                      <span
                        style="text-decoration: none; cursor: pointer"
                        onClick="setIdForRemoveObra('${result.obras.id}')"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                      >
                        <img
                          title="Excluir sessão"
                          src="/icons/x-circle-fill.svg"
                          alt="Excluir obra"
                          height="20rem"
                        />
                      </span>
                    </th>
                    </tr>
                    `;

            $("#obrasTable tbody").append(newRow);
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
