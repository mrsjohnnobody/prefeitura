$(document).ready(function() {
    createLei()
    searchLei()
});

function setIdForRemoveLei(id){
    
    if(!id)
        return;
    
    $('#btnDeleteModal').off('click'); 

    $("#btnDeleteModal").click(function() {
        loadPageAnimation(true)
        $.ajax({
            type: "GET",
            url: "/admin/deleteLei/" + id,
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

                    $("#leiIdItem_" + id).remove()
                }else{
                    $('#deleteModal').modal('hide')

                    loadToastNotification(result.message, "danger")
                }
            }
        });
    })
}

function createLei(){
    $("#leisForm").submit(function(event) {

        loadPageAnimation(true)
        $('#addLeiModal').modal('hide')

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
            url: "/admin/addLei",
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            error: function (error) {
                loadPageAnimation(false)
                loadToastNotification("Não foi possível adicionar esta lei", "danger")
            },
            success: function (result) { 
                if(result.status === 'success') {
                    loadPageAnimation(false)                    
                    loadToastNotification(result.message, "success")
                                        
                    let newRow = `
                    <tr id="leiIdItem_${result.lei.id}">
                        <th scope="row">
                            ${result.lei.number}
                        </th>
                        <th scope="row">
                            ${result.lei.description}
                        </th>
                        <th scope="row">
                            ${result.lei.date}
                        </th>
                        <th scope="row">
                            <a href="/${result.lei.path}" target="_blank">
                                <img title="Abrir arquivo" src="/icons/pdf-icon.svg" alt="Arquivo PDF" height="20rem">
                            </a>
                        </th>
                        <th scope="row">
                            <span style="text-decoration: none; cursor: pointer;" onclick="setIdForRemoveLei('${result.lei.id}')" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                <img class="licitacaoBtnEdit" title="Remover item" src="/icons/x-circle-fill.svg" alt="Remover item" height="20rem"> 
                            </span>
                        </th>
                    </tr>
                    `

                    $('#leisTable tbody').append(newRow);

                }else{
                    loadPageAnimation(false)                    
                    loadToastNotification(result.message, "danger")
                }
            }
        });

    })
}

function searchLei(){
    $("#searchParlamentary").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#leisTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
}