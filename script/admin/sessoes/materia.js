$(document).ready(function() {
    createTramite()
});

function setIdForRemoveTramite(id){
    
    if(!id)
        return;
    
    $('#btnDeleteModal').off('click'); 

    $("#btnDeleteModal").click(function() {
        loadPageAnimation(true)
        $.ajax({
            type: "GET",
            url: "/admin/deleteTramite/" + id,
            error: function (error) {

                loadPageAnimation(false)

                $('#deleteModal').modal('hide')
                
                loadToastNotification("Não foi possível remover esta lei", "danger")
            },
            success: function (result) {

                loadPageAnimation(false)
                
                if(result.status === 'success') {
                    $('#deleteModal').modal('hide')
                    
                    loadToastNotification(result.message, "success")

                    $("#tramiteIdItem_" + id).remove()
                }else{
                    $('#deleteModal').modal('hide')

                    loadToastNotification(result.message, "danger")
                }
            }
        });
    })
}

function createTramite(){
    $("#addTramiteForm").submit(function(event) {

        loadPageAnimation(true)
        $('#addTramiteModal').modal('hide')

        event.preventDefault();

        var formData = {
            expediente: $("#expediente").val(),
            fase: $("#fase").val(),
            data: $("#data").val(),
            situacao: $("#situacao").val(),
            materiaId: $("#materiaId").val(),
        };

        $.ajax({
            type: 'POST',
            url: "/admin/addTramite",
            data: formData,
            error: function (error) {
                loadPageAnimation(false)
                loadToastNotification("Não foi possível adicionar o trâmite", "danger")
            },
            success: function (result) { 
                if(result.status === 'success') {
                    loadPageAnimation(false)                    
                    loadToastNotification(result.message, "success")

                    const faseValues= [
                        "selecione",
                        "Arquivado",
                        "Em tramitação", 
                        "Favorável", 
                        "Não favorável", 
                        "Protocolo",
                        "Pedido de visto",
                        "1° votação",
                        "2° votação",
                        "Substitutivas",
                        "Aditivas",
                        "Modificativas",
                        "Aglutinativas",
                        "Apresentação e leitura da matéria",
                        "Pedido de urgência",
                        "votação da ata"
                    ]

                    const expedienteValues = [
                        "selecione",
                        "Ordem do dia", 
                        "Leitura das matérias" 
                    ]

                    const situacaoValues = [
                        "selecione",
                        "Favorável",
                        "Não Favorável", 
                        "Em tramitação" 
                    ]
                                        
                    let newRow = `
                    <tr id="tramiteIdItem_<%=materia.Tramites[i].id %>">
                        <td>
                            ${result.tramite.Data ? new Date(result.tramite.Data).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : null}
                        </td>
                        <td>
                            ${result.sessao.Descricao}
                        </td>
                        <td>
                            ${expedienteValues[result.tramite.Expediente]}
                        </td>
                        <td>
                            ${faseValues[result.tramite.Fase]}
                        </td>
                        <td>
                            ${situacaoValues[result.tramite.Situacao]}
                        </td>
                        <td>
                            <a href="#" style="text-decoration: none;" data-bs-toggle="modal"
                            data-bs-target="#deleteModal" 
                            onclick="setIdForRemoveTramite(${result.tramite.id})">
                            <img title="Excluir Trâmite" src="/icons/x-circle-fill.svg" alt="Excluir Trâmite" height="20rem">
                            </a>
                        </td>
                    </tr>
                    `

                    $('#tramiteTable tbody').append(newRow);

                }else{
                    loadPageAnimation(false)                    
                    loadToastNotification(result.message, "danger")
                }
            }
        });

    })
}