$(document).ready(function() {
    createPrestacaoContas()
    searchPrestacaoContas()
});

function setIdForRemovePrestacaoContas(id){
    
    if(!id)
        return;
    
    $('#btnDeleteModal').off('click'); 

    $("#btnDeleteModal").click(function() {
        loadPageAnimation(true)
        $.ajax({
            type: "GET",
            url: "/admin/deletePrestacaoContas/" + id,
            error: function (error) {

                loadPageAnimation(false)

                $('#deleteModal').modal('hide')
                
                loadToastNotification("Não foi possível remover a prestação de contas", "danger")
            },
            success: function (result) {

                loadPageAnimation(false)
                
                if(result.status === 'success') {
                    $('#deleteModal').modal('hide')
                    
                    loadToastNotification(result.message, "success")

                    $("#prestacaoContasIdItem_" + id).remove()
                }else{
                    $('#deleteModal').modal('hide')

                    loadToastNotification(result.message, "danger")
                }
            }
        });
    })
}

function createPrestacaoContas(){
    $("#prestacaoContasForm").submit(function(event) {

        loadPageAnimation(true)
        $('#addPrestacaoContasModal').modal('hide')

        event.preventDefault();
        var formData = new FormData(this);

        const extension = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '').split('.').pop();
        if(extension != "pdf"){

            loadPageAnimation(false)

            loadToastNotification("Somente arquivos no formato pdf são permitidos", "danger")
            
            return
        }

        var dataInicial = new Date($("#InitialDate").val());
        var dataFinal = new Date($("#FinalDate").val());
        if (!dataInicial || !dataFinal){
            loadPageAnimation(false)
            return loadToastNotification("As datas são obrigatórias", "warning")
        }

        if (dataInicial >= dataFinal){
            loadPageAnimation(false)
            return loadToastNotification("A data inicial não pode ser menor que a data final", "warning")
        } 
             
        if (!$("#parlamentarId option:selected").val()) {
            loadPageAnimation(false)
            return loadToastNotification("É necessário selecionar um parlamentar", "warning")
        }

        $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: "/admin/addPrestacaoContas",
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            error: function (error) {
                loadPageAnimation(false)
                loadToastNotification("Não foi possível adicionar a prestação de contas", "danger")
            },
            success: function (result) { 
                if(result.status === 'success') {
                    loadPageAnimation(false)                    
                    loadToastNotification(result.message, "success")
                                        
                    const Initdate = result.prestacaoContas.Initdate ? new Date(result.prestacaoContas.Initdate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : null
                    const Finaldate = result.prestacaoContas.Finaldate ? new Date(result.prestacaoContas.Finaldate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : null

                    let newRow = `
                        <tr id="prestacaoContasIdItem_${result.prestacaoContas.id}">
                            <th scope="row">
                                ${Initdate}
                                -
                                ${Finaldate}
                            </th>
                            <th scope="row">
                                ${result.prestacaoContas.description}
                            </th>
                            <th scope="row">
                                ${result.prestacaoContas.Parlamentar.name}
                                (${result.prestacaoContas.Parlamentar.nickname})
                            </th>
                            <th scope="row">
                                <a href="/${result.prestacaoContas.path}" target="_blank">
                                <img title="Abrir arquivo" src="/icons/pdf-icon.svg" alt="Arquivo PDF" height="20rem" />
                                </a>
                            </th>
                            <th scope="row">
                                <span style="text-decoration: none; cursor: pointer;" onclick="setIdForRemovePrestacaoContas('${result.prestacaoContas.id}')" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                    <img class="licitacaoBtnEdit" title="Remover item" src="/icons/x-circle-fill.svg" alt="Remover item" height="20rem"> 
                                </span>
                            </th>
                        </tr>
                    `

                    $('#prestacaoContasTable tbody').append(newRow);

                }else{
                    loadPageAnimation(false)                    
                    loadToastNotification(result.message, "danger")
                }
            }
        });

    })
}

function searchPrestacaoContas(){
    $("#searchParlamentary").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#leisTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
}