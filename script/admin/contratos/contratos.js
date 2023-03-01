$(document).ready(function() {
    // define input como R$
    $("#valorTotal").maskMoney({prefix:'R$ ', thousands:'.', decimal:','})
    
    createContrato()
});

function createContrato(){
    $("#contratoForm").submit(function(event) {

        $('#addContratoModal').modal('hide')
        loadPageAnimation(true)

        event.preventDefault();
        var formData = new FormData(this);

        const extension = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '').split('.').pop();
        if(extension != "pdf"){

            loadPageAnimation(false)

            loadToastNotification("Somente arquivos no formato pdf são permitidos", "danger")
            
            return
        }

        $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: "/admin/addContrato",
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            error: function (error) {
                loadPageAnimation(false)
                loadToastNotification("Não foi possível adicionar o contrato", "danger")
            },
            success: function (result) { 
                if(result.status === 'success') {
                    loadPageAnimation(false)                    
                    loadToastNotification(result.message, "success")
                                        
                    let newRow = ``

                    $('#contratoTable tbody').append(newRow);

                }else{
                    loadPageAnimation(false)                    
                    loadToastNotification(result.message, "danger")
                }
            }
        });

    })
}

function setIdForRemoveContrato(id){
    
    if(!id)
        return;
    
    $('#btnDeleteModal').off('click'); 

    $("#btnDeleteModal").click(function() {
        loadPageAnimation(true)
        $.ajax({
            type: "GET",
            url: "/admin/deleteContrato/" + id,
            error: function (error) {

                loadPageAnimation(false)

                $('#deleteModal').modal('hide')
                
                loadToastNotification("Não foi possível remover este contrato", "danger")
            },
            success: function (result) {

                loadPageAnimation(false)
                
                if(result.status === 'success') {
                    $('#deleteModal').modal('hide')
                    
                    loadToastNotification(result.message, "success")

                    $("#contratoIdItem_" + id).remove()
                }else{
                    $('#deleteModal').modal('hide')

                    loadToastNotification(result.message, "danger")
                }
            }
        });
    })
}