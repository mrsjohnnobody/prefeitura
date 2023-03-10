var MateriasToRemove = []

$(document).ready(function() {
    changePrincipalInformation()
    createMateria()
    getFormDataForRequest()
});

function changePrincipalInformation(){
    $("#editSessaoNumero").click(function(event){
        event.preventDefault();

        if($("#sessaoNumero").attr('disabled')){
            $('#sessaoNumero').removeAttr("disabled")
            $('#sessaoNumero').removeAttr("readonly")
            $("#sessaoNumero").trigger('focus');
        }else{
            $('#sessaoNumero').attr("disabled", true)
            $('#sessaoNumero').attr("readonly", true)
        }
    });

     $("#editSessaoTipo").click(function(event){
        event.preventDefault();

        if($("#tipo").attr('disabled')){
            $('#tipo').removeAttr("disabled")
            $('#tipo').removeAttr("readonly")
            $("#tipo").trigger('focus');
        }else{
            $('#tipo').attr("disabled", true)
            $('#tipo').attr("readonly", true)
        }
    });

    $("#editSessaoSituacao").click(function(event){
        event.preventDefault();

        if($("#situacao").attr('disabled')){
            $('#situacao').removeAttr("disabled")
            $('#situacao').removeAttr("readonly")
            $("#situacao").trigger('focus');
        }else{
            $('#situacao').attr("disabled", true)
            $('#situacao').attr("readonly", true)
        }
    });

     $("#editSessaoData").click(function(event){
        event.preventDefault();

        if($("#sessaoData").attr('disabled')){
            $('#sessaoData').removeAttr("disabled")
            $('#sessaoData').removeAttr("readonly")
            $("#sessaoData").trigger('focus');        
        }else{
            $('#sessaoData').attr("disabled", true)
            $('#sessaoData').attr("readonly", true) 
        }
    });

     $("#editSessaoDescricao").click(function(event){
        event.preventDefault();

        if($("#sessaoDescricao").attr('disabled')){
            $('#sessaoDescricao').removeAttr("disabled")
            $('#sessaoDescricao').removeAttr("readonly")
            $("#sessaoDescricao").trigger('focus');
        }else{
            $('#sessaoDescricao').attr("disabled", true)
            $('#sessaoDescricao').attr("readonly", true)
        }
    });
}

function setIdForRedirectModal(value) {
    $("#btnConfirmRedirect").attr("href", `/admin/editMateria/${value}`)
}

function createMateria(){
    $("#addMateriaForm").submit(function(event) {

        loadPageAnimation(true)
        $('#addMateriaModal').modal('hide')

        event.preventDefault();

        var formData = {
            parlamentarId: $("#materiaAutor").val(),
            data: $("#materiaData").val(),
            numero: $("#materiaNumero").val(),
            tipo: $("#materiaTipo").val(),
            resumo: $("#materiaResumo").val(),
            sessaoId: $("#sessaoId").val(),
        };

        $.ajax({
            type: 'POST',
            url: "/admin/addMateria",
            data: formData,
            error: function (error) {
                loadPageAnimation(false)
                loadToastNotification("N??o foi poss??vel adicionar a mat??ria", "danger")
            },
            success: function (result) { 
                if(result.status === 'success') {
                    loadPageAnimation(false)                    
                    loadToastNotification(result.message, "success")

                    const tipoValues= [
                        "selecione",
                        "ATA",
                        "Convoca????es", 
                        "Edital de convoca????o", 
                        "Emendas", 
                        "Indica????o",
                        "Mo????es",
                        "Of??cios Expedidos",
                        "Of??cios Recebidos",
                        "Parecer Pr??vio - Contas de Governo",
                        "Pedido de Provid??ncias",
                        "Projeto de Decreto Legislativo",
                        "Projeto de Indicativo",
                        "Projeto de Lei - Executivo",
                        "Projeto de Lei - Legislativo",
                        "Projeto de resolu????o",
                        "Proposta de Emendas",
                        "Requerimentos",
                        "Resolu????o",
                    ]
                                        
                    let newRow = `
                    <tr>
                        <td>
                            ${tipoValues[result.materia.Tipo]}
                        </td>
                        <td>
                            ${result.materia.Numero}
                        </td>
                        <td>
                            ${result.materia.Resumo}
                        </td>
                        <td>
                            
                        </td>
                        <td>
                            <span data-bs-toggle="modal" data-bs-target="#confirmRedirectModal" onclick="setIdForRedirectModal(${result.materia.id})" style="cursor: pointer">
                                <img title="Editar mat??ria" src="/icons/pencil-fill.svg" alt="Editar mat??ria" height="20rem">
                            </span>
                            <a href="#" style="text-decoration: none;" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="setIdForRemoveMateria(${result.materia.id})">
                              <img title="Excluir Mat??ria" src="/icons/x-circle-fill.svg" alt="Excluir Mat??ria" height="20rem">
                            </a>
                        </td>
                    </tr>
                    `

                    $('#materiaTable tbody').append(newRow);

                }else{
                    loadPageAnimation(false)                    
                    loadToastNotification(result.message, "danger")
                }
            }
        });

    })
}

function setIdForRemoveMateria(id){
    
    if(!id)
        return;
    
    $('#btnDeleteModal').off('click'); 

    $("#btnDeleteModal").click(function() {
        loadPageAnimation(true)
        $.ajax({
            type: "GET",
            url: "/admin/deleteMateria/" + id,
            error: function (error) {

                loadPageAnimation(false)

                $('#deleteModal').modal('hide')
                
                loadToastNotification("N??o foi poss??vel remover esta mat??ria", "danger")
            },
            success: function (result) {

                loadPageAnimation(false)
                
                if(result.status === 'success') {
                    $('#deleteModal').modal('hide')
                    
                    loadToastNotification(result.message, "success")

                    $("#materiaIdItem_" + id).remove()
                }else{
                    $('#deleteModal').modal('hide')

                    loadToastNotification(result.message, "danger")
                }
            }
        });
    })
}

function getFormDataForRequest() {
    $("#btnSendRequest").click(function(event){

        var formData = {};

        //pegando informa????es principais
        const numero = $("#sessaoNumero").val()
        const tipo = $("#tipo").val()
        const situacao = $('#situacao').val()
        const data = $('#sessaoData').val()
        const descricao = $('#sessaoDescricao').val()

        //setando informa????es principais para serem enviadas na request
        formData.numero = numero
        formData.tipo = tipo
        formData.situacao = situacao
        formData.data = data
        formData.descricao = descricao

        //pegando lista de presen??a
        let ParlamentaresPresentes = []
        $("#tableChamadaForm tbody tr").each(function()
        {     
            const parlalamentarId = $(this).find(".parlamentarIdChamada").val()
            const situacao = $(this).find(".situacaoChamada").val()

            if(parlalamentarId && situacao != 0){
                ParlamentaresPresentes.
                push({
                    parlalamentarId,
                    situacao,
                })
            }
        });

        ParlamentaresPresentes.forEach((element, index) => {
            formData[`ParlamentaresPresentesParlamentarId[${index}]`] = element.parlalamentarId;
            formData[`ParlamentaresPresentesSituacao[${index}]`] = element.situacao;
        });
        
        formData.ParlamentaresPresentesLength = ParlamentaresPresentes.length

        const url = `/admin/editSessao/` + $("#sessaoId").val()
        console.log(formData)
        $.ajax({
            type: 'POST',
            url: url,
            data: formData,
            error: function (error) {
                loadPageAnimation(false)
                loadToastNotification("N??o foi poss??vel editar essa sess??o, tente novamente mais tarde", "danger")
            },
            success: function (result) { 
                if(result.status === 'success') {
                    loadPageAnimation(false)                    
                    loadToastNotification(result.message, "success")

                    setTimeout (function() {
                        window.location.reload(true);
                    }, 2000);
                    
                }else{
                    loadPageAnimation(false)                    
                    loadToastNotification(result.message, "danger")
                }
            }
        });

    })
}

