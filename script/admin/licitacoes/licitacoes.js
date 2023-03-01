$(document).ready(function() {
    createLicitacao()
});

function createLicitacao(){
    $("#licitacaoForm").submit(function(event) {
        loadPageAnimation(true)
        $('#addLicitacaoModal').modal('hide')

        event.preventDefault();

        var formData = {
            number: $("#number").val(),
            modality: $("#modality").val(),
            objective: $("#objective").val(),
            date: $("#date").val(),
        };

        $.ajax({
            type: 'POST',
            url: "/admin/addLicitacao",
            data: formData,
            error: function (error) {
                loadPageAnimation(false)
                loadToastNotification("Não foi possível cadastrar esta licitação, tente novamente mais tarde", "danger")
            },
            success: function (result) { 
                if(result.status === 'success') {
                    loadPageAnimation(false)                    
                    loadToastNotification(result.message, "success")

                    const modalityValues = [
                        "selecione",
                        "Concorrencia", 
                        "Tomada de preços",
                        "Convite", 
                        "Concurso", 
                        "Concurso",
                        "Pregão", 
                        "Chamada pública"
                    ]

                    const typeValues= [
                        "selecione",
                        "Menor preço", 
                        "Maior lance ou oferta", 
                        "Melhor técnica", 
                        "Técnica e preço"
                    ]

                    const situationValues = [
                        "selecione",
                        "Nova", 
                        "Aberta", 
                        "Anulada", 
                        "Cancelada", 
                        "Deserta",
                        "Fechada",
                        "Suplente",
                        "Titular"
                    ]
                                        
                    let newRow = `
                        <tr>
                            <a href="#">
                            <th scope="row">
                                ${result.licitacao.ProcessNumber}
                            </th>
                            <th scope="row">
                                ${modalityValues[result.licitacao.Modality]}
                            </th>
                            <th scope="row">
                                ${result.licitacao.Objective}
                            </th>
                            <th scope="row">
                                ${result.licitacao.OpeningDate ? new Date(result.licitacao.OpeningDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : null}
                            </th>
                            <th scope="row">
                                Nova
                            </th>
                            <th scope="row">
                                <a href="/admin/editLicitacao/${result.licitacao.id}" style="text-decoration: none;">
                                    <img title="Editar Licitação" src="/icons/pencil-fill.svg" alt="Editar Licitação" height="20rem">
                                </a>
                                &nbsp;
                                <a href="#" style="text-decoration: none;" onClick="setIdForRemoveLei('${result.licitacao.id}')">
                                    <img title="Excluir licitação" src="/icons/x-circle-fill.svg" alt="Excluir licitação" height="20rem">
                                </a>
                            </th>
                        </tr>
                    `

                    $('#licitacaoTable tbody').append(newRow);

                }else{
                    loadPageAnimation(false)                    
                    loadToastNotification(result.message, "danger")
                }
            }
        });

    })
}

function setIdForRemoveLei(id){
    
    if(!id)
        return;

    $('#btnDeleteModal').off('click'); 

    $("#btnDeleteModal").click(function() {
        loadPageAnimation(true)
        $.ajax({
            type: "GET",
            url: "/admin/deleteLicitacao/" + id,
            error: function (error) {

                loadPageAnimation(false)

                $('#deleteModal').modal('hide')
                
                loadToastNotification("Não foi possível remover esta licitação", "danger")
            },
            success: function (result) {

                loadPageAnimation(false)
                
                if(result.status === 'success') {
                    $('#deleteModal').modal('hide')
                    
                    loadToastNotification(result.message, "success")

                    $("#leiIdItem_" + id).remove()
                }else{
                    $('#deleteModal').modal('hide')

                    loadToastNotification(result.message, "danger")
                }
            }
        });
    })
}