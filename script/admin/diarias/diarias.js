$(document).ready(function() {
    // define input como R$
    $("#valorTotal").maskMoney({prefix:'R$ ', thousands:'.', decimal:','})
    $("#valorUnitario").maskMoney({prefix:'R$ ', thousands:'.', decimal:','})
    $("#quantidade").maskMoney({prefix:'', thousands:'.', decimal:','})

    pagination()
    createDiaria()
});

function createDiaria(){
    try {
        $("#createDiariaForm").submit(function(event) {
    
            loadPageAnimation(true)
            $('#addDiariaModal').modal('hide')
    
            event.preventDefault();
            var formData = new FormData(this);
    
            $.ajax({
                type: 'POST',
                enctype: 'multipart/form-data',
                url: "/admin/addDiaria",
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                error: function (error) {
                    loadToastNotification("Não foi possível adicionar esta diária", "danger")
                },
                success: function (result) { 
                    if(result.status === 'success') {
                        loadToastNotification(result.message, "success")

                        $('#createDiariaForm')[0].reset();

                        let newRow = `
                            <tr id="diariaIdItem_${result.diaria.id}" class="diariaItem">
                                <th scope="row">
                                    ${result.diaria.Numero}
                                </th>
                                <th scope="row">
                                    ${result.diaria.DataPortaria ? new Date(result.diaria.DataPortaria).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : null}
                                </th>
                                <th scope="row">
                                    <span class="fw-bold">
                                        ${result.diaria.NomeAgente}
                                    </span>
                                    ${result.diaria.Descricao}
                                </th>
                                <th scope="row">
                                    ${result.diaria.ValorTotal}
                                </th>
                                <th scope="row">
                                    <a href="/admin/diaria/${result.diaria.id}" style="text-decoration: none;">
                                        <img title="Ver diária" src="/icons/eye-fill.svg" alt="Ver diária" height="20rem">
                                    </a>
                                    &nbsp;
                                    <a href="#" style="text-decoration: none;" onClick="setIdForRemoveDiaria('${result.diaria.id}')" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                        <img title="Excluir diária" src="/icons/x-circle-fill.svg" alt="Excluir diária" height="20rem">
                                    </a>
                                </th>
                            </tr>
                        `

                        $('#diariasItems').append(newRow);

                    }else{
                        loadToastNotification(result.message, "danger")
                    }
                }
            });
    
            loadPageAnimation(false)                    
    
        })
    } catch (error) {
        loadToastNotification("Não foi possível cadastrar a sessão", "danger")
        loadPageAnimation(false)                    
    }
}

function setIdForRemoveDiaria(id){
    
    if(!id)
        return;

    $('#btnDeleteModal').off('click'); 

    $("#btnDeleteModal").click(function() {
        loadPageAnimation(true)

        $.ajax({
            type: "GET",
            url: "/admin/deleteDiaria/" + id,
            error: function (error) {
                $('#deleteModal').modal('hide')
                
                loadToastNotification("Não foi possível remover esta diária", "danger")
            },
            success: function (result) {

                if(result.status === 'success') {
                    $('#deleteModal').modal('hide')
                    
                    loadToastNotification(result.message, "success")
                    
                    $("#diariaIdItem_" + id).remove()
                }else{
                    $('#deleteModal').modal('hide')
                    
                    loadToastNotification(result.message, "danger")
                }
            }
        });

        loadPageAnimation(false)
    })
}

function pagination(){
    $('#pagination').twbsPagination({
        totalPages: parseInt($("#totalPage").val()),
        visiblePages: 4,
        onPageClick: function (event, page) {
            event.preventDefault();
            
            var formData = { 'page': page };

            $.ajax({
                type: 'GET',
                url: "/admin/diariasList",
                data: formData,
                headers: { 'page-header': page },
                error: function (error) {
                    loadPageAnimation(false)
                    loadToastNotification("Não foi possível carregar a lista, tente novamente mais tarde", "danger")
                },
                success: function (result) { 
                    if(result.status === 'success') {
                        $('.diariaItem').remove()

                        result.diarias.forEach(diaria => {
                            $("#diariasItems").append(`
                            <tr id="diariaIdItem_${diaria.id}" class="diariaItem">
                                <th scope="row">
                                    ${diaria.Numero}
                                </th>
                                <th scope="row">
                                    ${diaria.DataPortaria ? new Date(diaria.DataPortaria).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : null}
                                </th>
                                <th scope="row">
                                    <span class="fw-bold">
                                        ${diaria.NomeAgente}
                                    </span>
                                    ${diaria.Descricao}
                                </th>
                                <th scope="row">
                                    ${diaria.ValorTotal}
                                </th>
                                <th scope="row">
                                    <a href="/admin/diaria/${diaria.id}" style="text-decoration: none;">
                                        <img title="Ver diária" src="/icons/eye-fill.svg" alt="Ver diária" height="20rem">
                                    </a>
                                    &nbsp;
                                    <a href="#" style="text-decoration: none;" onClick="setIdForRemoveDiaria('${diaria.id}')" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                        <img title="Excluir diária" src="/icons/x-circle-fill.svg" alt="Excluir diária" height="20rem">
                                    </a>
                                </th>
                            </tr>
                        `);
                        });

                        $(window).scrollTop(0);
                    }else{
                        loadToastNotification(result.message, "danger")
                    }

                    loadPageAnimation(false)                    
                }
            });
        }
    });
}