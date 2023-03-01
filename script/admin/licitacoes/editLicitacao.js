var PublicacaosToRemove = []
var ResposaveisToRemove = []
var AndamentosToRemove = []
var FilesToRemove = []

$(document).ready(function() {
    changePrincipalInformation()
    changePublicationForm()
    changeResponsible()
    changeProgess()
    changeFilesAvailable()

    addPublicationFormIfTableIsEmpty()
    addResponsibleIfTableIsEmpty()
    addProgressIfTableIsEmpty()
    addFilesAvailableIfTableIsEmpty()

    getFormDataForRequest()
});

function changePrincipalInformation(){
    $("#editProcessNumber").click(function(event){
        event.preventDefault();

        if($("#processNumber").attr('disabled')){
            $('#processNumber').removeAttr("disabled")
            $('#processNumber').removeAttr("readonly")
            $("#processNumber").trigger('focus');
        }else{
            $('#processNumber').attr("disabled", true)
            $('#processNumber').attr("readonly", true)
        }
    });

     $("#editType").click(function(event){
        event.preventDefault();

        if($("#type").attr('disabled')){
            $('#type').removeAttr("disabled")
            $('#type').removeAttr("readonly")
            $("#type").trigger('focus');
        }else{
            $('#type').attr("disabled", true)
            $('#type').attr("readonly", true)
        }
    });

     $("#editOpeningDate").click(function(event){
        event.preventDefault();

        if($("#openingDate").attr('disabled')){
            $('#openingDate').removeAttr("disabled")
            $('#openingDate').removeAttr("readonly")
            $("#openingDate").trigger('focus');        
        }else{
            $('#openingDate').attr("disabled", true)
            $('#openingDate').attr("readonly", true) 
        }
    });

     $("#editPublicationDate").click(function(event){
        event.preventDefault();
        
        if($("#publicationDate").attr('disabled')){
            $('#publicationDate').removeAttr("disabled")
            $('#publicationDate').removeAttr("readonly")
            $("#publicationDate").trigger('focus');        
        }else{
            $('#publicationDate').attr("disabled", true)
            $('#publicationDate').attr("readonly", true)
        }
    });

     $("#editObjectInformation").click(function(event){
        event.preventDefault();

        if($("#objectInformation").attr('disabled')){
            $('#objectInformation').removeAttr("disabled")
            $('#objectInformation').removeAttr("readonly")
            $("#objectInformation").trigger('focus');
        }else{
            $('#objectInformation').attr("disabled", true)
            $('#objectInformation').attr("readonly", true)
        }
    });
}

function changePublicationForm(){
    $("#addPublicationForm").click(function(event){
        
        let previousId = $('.publicationFormTr').last().attr('id');

        if(!previousId)
            previousId = 'publicationFormTr_0'

        const nextIdInt = parseInt(previousId.replace('addPublicationFormTrId_', '')) + 1;
        const nextInputId = 'addPublicationForm_' + nextIdInt;
        const nextTrId = 'addPublicationFormTrId_' + nextIdInt;
        
        const content = `
            <tr id="${nextTrId}" class="publicationFormTr notNewPublicationFormDate">
                <th scope="row">
                    <div class="d-flex justify-content-center align-items-center"> 
                        <input class="publicationFormDate" id="${nextInputId}" name="date" type="date" form-control"/> 
                    </div>
                </th> 
                <th scope="row"> 
                    <select class="publicationFormType form-select" aria-label="Default select example">
                        <option value="0" selected>Selecione</option> 
                        <option value="1">Diário Oficial do Estado</option>
                        <option value="2">Jornal de grande circulação</option>
                        <option value="3">Outros meios de publicação</option>
                    </select>
                </th> 
                <th scope="row"> 
                    <input class="publicationFormDescription form-control" type="text" placeholder="Descreva o item"> 
                </th>
                <th scope="row d-flex justify-content-center"> 
                    <a href="#" style="text-decoration: none;" onclick="removeRowForPublicationFormTable(${nextIdInt})"> 
                        <img class="licitacaoBtnEdit" title="Remover item" src="/icons/x-circle-fill.svg" alt="Editar Licitação" height="20rem"> 
                    </a> 
                </th> 
            </tr>
            `
        
        $('#tablePublicationForm > tbody:last-child').append(content);        
    });    
}

function removeRowForPublicationFormTable(id){
    const idRemove = '#addPublicationFormTrId_' + id
    const needsConfirmationModal = $(idRemove).attr('class')

    $('#btnRemovePublicationFormModal').off('click'); 

    if(needsConfirmationModal.includes('notNewPublicationFormDate')){
        $("#btnRemovePublicationFormModal").click(function(event){
            $(idRemove).removeClass("notNewPublicationFormDate")
            $(idRemove).remove()

            PublicacaosToRemove.push(id)

            var rowCount = $("#tablePublicationForm tr").length;
            if(rowCount <= 1){
                let previousId = $('.inputDatepicker').last().attr('id');
        
                if(!previousId)
                    previousId = 'addPublicationForm_0'
        
                const nextIdInt = (parseInt(previousId.replace('addPublicationForm_', '')) + 1);
                const nextInputId = 'addPublicationForm_' + nextIdInt;
                const nextTrId = 'addPublicationFormTrId_' + nextIdInt;
                
                const content = `
                <tr id="${nextTrId}" class="publicationFormTr notNewPublicationFormDate">
                    <th scope="row">
                        <div class="d-flex justify-content-center align-items-center"> 
                            <input class="publicationFormDate" id="${nextInputId}" name="date" type="date" form-control"/> 
                        </div>
                    </th> 
                    <th scope="row"> 
                        <select class="publicationFormType form-select" aria-label="Default select example">
                            <option value="0" selected>Selecione</option> 
                            <option value="1">Diário Oficial do Estado</option>
                            <option value="2">Jornal de grande circulação</option>
                            <option value="3">Outros meios de publicação</option>
                        </select>
                    </th> 
                    <th scope="row"> 
                        <input class="publicationFormDescription form-control" type="text" placeholder="Descreva o item"> 
                    </th>
                    <th scope="row d-flex justify-content-center"> 
                        <a href="#" style="text-decoration: none;" onclick="removeRowForPublicationFormTable(${nextIdInt})"> 
                            <img class="licitacaoBtnEdit" title="Remover item" src="/icons/x-circle-fill.svg" alt="Editar Licitação" height="20rem"> 
                        </a> 
                    </th> 
                </tr>
                `

                $('#tablePublicationForm > tbody:last-child').append(content);  
            }

            $('#removePublicationFormModal').modal('hide');
        });

        return $('#removePublicationFormModal').modal('show');
    }

    $(idRemove).remove()

    var rowCount = $("#tablePublicationForm tr").length;
    if(rowCount <= 1){
        let previousId = $('.inputDatepicker').last().attr('id');

        if(!previousId)
            previousId = 'addPublicationForm_0'

        const nextIdInt = (parseInt(previousId.replace('addPublicationForm_', '')) + 1);
        const nextInputId = 'addPublicationForm_' + nextIdInt;
        const nextTrId = 'addPublicationFormTrId_' + nextIdInt;
        
        const content = `
        <tr id="${nextTrId}" class="publicationFormTr notNewPublicationFormDate">
            <th scope="row">
                <div class="d-flex justify-content-center align-items-center"> 
                    <input class="publicationFormDate" id="${nextInputId}" name="date" type="date" form-control"/> 
                </div>
            </th> 
            <th scope="row"> 
                <select class="publicationFormType form-select" aria-label="Default select example">
                    <option value="0" selected>Selecione</option> 
                    <option value="1">Diário Oficial do Estado</option>
                    <option value="2">Jornal de grande circulação</option>
                    <option value="3">Outros meios de publicação</option>
                </select>
            </th> 
            <th scope="row"> 
                <input class="publicationFormDescription form-control" type="text" placeholder="Descreva o item"> 
            </th>
            <th scope="row d-flex justify-content-center"> 
                <a href="#" style="text-decoration: none;" onclick="removeRowForPublicationFormTable(${nextIdInt})"> 
                    <img class="licitacaoBtnEdit" title="Remover item" src="/icons/x-circle-fill.svg" alt="Editar Licitação" height="20rem"> 
                </a> 
            </th> 
        </tr>
        `

        $('#tablePublicationForm > tbody:last-child').append(content);  
    }

}

function changeResponsible(){
    $("#addResponsible").click(function(event){
        
        let previousId = $('.responsibleTr').last().attr('id');

        if(!previousId)
            previousId = 'addResponsibleTrId_0'

        const nextIdInt = (parseInt(previousId.replace('addResponsibleTrId_', '')) + 1);
        const nextInputId = 'addResponsible_' + nextIdInt;
        const nextTrId = 'addResponsibleTrId_' + nextIdInt;
        
        const content = `
        <tr id="${nextTrId}" class="responsibleTr notNewResponsible"> 
            <th scope="row"> 
                <select class="responsibleType form-select" aria-label="Default select example">
                    <option value="0" selected>Selecione</option>
                    <option value="1">PREGOEIRO/PRESIDENTE DA COMISSÃO</option>
                    <option value="2">RESPONSÁVEL PELA INFORMAÇÃO</option>
                    <option value="3">RESPONSÁVEL PELO PARECER TÉCNICO JURÍDICO</option>
                    <option value="4">RESPONSÁVEL PELA ADJUDIÇÃO</option>
                    <option value="5">RESPONSÁVEL PELA HOMOLOGAÇÃO</option>
                </select>
            </th> 
            <th scope="row"> 
                <input class="responsibleName responsiblesInput form-control" type="text" placeholder="Nome do Agente responsável" aria-label="input"> 
            </th> 
            <th scope="row"> 
                <a href="#" style="text-decoration: none;" onclick="removeRowForResponsibleTable(${nextIdInt})"> 
                    <img title="Remover item" src="/icons/x-circle-fill.svg" alt="Editar Licitação" height="20rem"> 
                </a> 
            </th>
        </tr>`
        
        $('#tableResponsible > tbody:last-child').append(content);        
    });
}

function removeRowForResponsibleTable(id){
    const idRemove = '#addResponsibleTrId_' + id
    const needsConfirmationModal = $(idRemove).attr('class')

    $('#btnRemoveResponsibleModal').off('click'); 

    if(needsConfirmationModal.includes('notNewResponsible')){
        $("#btnRemoveResponsibleModal").click(function(event){
            $(idRemove).removeClass("notNewResponsible")
            $(idRemove).remove()

            ResposaveisToRemove.push(id)

            let rowCount = $("#tableResponsible tr").length;
            if(rowCount <= 1){
                let previousId = $('.inputDatepicker').last().attr('id');
        
                if(!previousId)
                    previousId = 'addResponsible_0'
        
                const nextIdInt = (parseInt(previousId.replace('addResponsible_', '')) + 1);
                const nextInputId = 'addResponsible_' + nextIdInt;
                const nextTrId = 'addResponsibleTrId_' + nextIdInt;
                
                const content = `
                <tr id="${nextTrId}" class="responsibleTr notNewResponsible"> 
                    <th scope="row"> 
                        <select class="responsibleType form-select" aria-label="Default select example">
                            <option value="0" selected>Selecione</option>
                            <option value="1">PREGOEIRO/PRESIDENTE DA COMISSÃO</option>
                            <option value="2">RESPONSÁVEL PELA INFORMAÇÃO</option>
                            <option value="3">RESPONSÁVEL PELO PARECER TÉCNICO JURÍDICO</option>
                            <option value="4">RESPONSÁVEL PELA ADJUDIÇÃO</option>
                            <option value="5">RESPONSÁVEL PELA HOMOLOGAÇÃO</option>
                        </select>
                    </th> 
                    <th scope="row"> 
                        <input class="responsibleName responsiblesInput form-control" type="text" placeholder="Nome do Agente responsável" aria-label="input"> 
                    </th> 
                    <th scope="row"> 
                        <a href="#" style="text-decoration: none;" onclick="removeRowForResponsibleTable(${nextIdInt})"> 
                            <img title="Remover item" src="/icons/x-circle-fill.svg" alt="Editar Licitação" height="20rem"> 
                        </a> 
                    </th>
                </tr>`
                
                $('#tableResponsible > tbody:last-child').append(content);  
            }

            $('#removeResponsibleModal').modal('hide');
        });

        return $('#removeResponsibleModal').modal('show');
    }

    $(idRemove).remove()

    let rowCount = $("#tableResponsible tr").length;
    if(rowCount <= 1){
        let previousId = $('.inputDatepicker').last().attr('id');

        if(!previousId)
            previousId = 'addResponsible_0'

        const nextIdInt = (parseInt(previousId.replace('addResponsible_', '')) + 1);
        const nextInputId = 'addResponsible_' + nextIdInt;
        const nextTrId = 'addResponsibleTrId_' + nextIdInt;
        
        const content = `
        <tr id="${nextTrId}" class="responsibleTr notNewResponsible"> 
            <th scope="row"> 
                <select class="responsibleType form-select" aria-label="Default select example">
                    <option value="0" selected>Selecione</option>
                    <option value="1">PREGOEIRO/PRESIDENTE DA COMISSÃO</option>
                    <option value="2">RESPONSÁVEL PELA INFORMAÇÃO</option>
                    <option value="3">RESPONSÁVEL PELO PARECER TÉCNICO JURÍDICO</option>
                    <option value="4">RESPONSÁVEL PELA ADJUDIÇÃO</option>
                    <option value="5">RESPONSÁVEL PELA HOMOLOGAÇÃO</option>
                </select>
            </th> 
            <th scope="row"> 
                <input class="responsibleName responsiblesInput form-control" type="text" placeholder="Nome do Agente responsável" aria-label="input"> 
            </th> 
            <th scope="row"> 
                <a href="#" style="text-decoration: none;" onclick="removeRowForResponsibleTable(${nextIdInt})"> 
                    <img title="Remover item" src="/icons/x-circle-fill.svg" alt="Editar Licitação" height="20rem"> 
                </a> 
            </th>
        </tr>`

        $('#tableResponsible > tbody:last-child').append(content);  
    }
}

function changeProgess(){
    $("#addProgress").click(function(event){
        
        let responsiblesOptions = '<option value="0" selected>Selecione</option>';

        $(".responsiblesInput").each(function()
        {     
            if($(this).val()){
                option = `<option value="${$(this).val()}">` + $(this).val() + '</option>';
                responsiblesOptions += option
            }
        });

        const lastId = $('#tableProgress > tbody > tr:last').attr('id');
        const nextIdInt = (parseInt(lastId.replace('ProgressId_', '')) + 1);

        const content = `
        <tr id="ProgressId_${nextIdInt}" class="progressTr notNewProgress">
            <th scope="row"> 
                <input class="ProgressDateTime d-flex justify-content-center align-items-center" type="datetime-local" id="appt" name="appt" min="00:00" max="00:00">
            </th>  
            <th scope="row"> 
                <select class="ProgressPhase form-select" aria-label="Default select example">
                    <option value="0" selected>Selecione</option>
                    <option value="1">PREGÃO ELETRÔNICO</option> 
                    <option value="2">DISPENSA ELETRÔNICA</option> 
                    <option value="3">CONCORRÊCIA ELETRÔNICA</option> 
                    <option value="4">REGIME DIF. DE COMPRAS</option> 
                </select> 
            </th> 
            <th scope="row"> 
                <select class="ProgressSituation form-select" aria-label="Default select example"> 
                    <option value="0" selected>Selecione</option> 
                    <option value="1">ABERTA</option> 
                    <option value="2">ANULADA</option> 
                    <option value="3">CANCELADA</option> 
                    <option value="4">DESERTA</option> 
                    <option value="5">FECHADA</option> 
                    <option value="6">REVOGADA</option> 
                    <option value="7">SUMPLENTE</option> 
                    <option value="8">TITULAR</option> 
                </select> 
            </th> 
            <th scope="row"> 
                <select id="responsiblesForProgress" class="ProgressResponsible form-select" aria-label="Default select example">
                    ${responsiblesOptions}
                </select> 
            </th> 
            <th scope="row d-flex justify-content-center"> 
                <a href="#" style="text-decoration: none;" onclick="removeRowForProgess(${nextIdInt})"> 
                    <img class="licitacaoBtnEdit" title="Remover item" src="/icons/x-circle-fill.svg" alt="Editar Licitação" height="20rem"> 
                </a> 
            </th> 
        </tr>`
        
        $('#tableProgress > tbody:last-child').append(content);        
    });    
}

function removeRowForProgess(id){
    let idRemove = "#ProgressId_" + id

    const needsConfirmationModal = $(idRemove).attr('class')

    $('#btnRemoveProgressModal').off('click'); 

    if(needsConfirmationModal.includes('notNewProgress')){
        $("#btnRemoveProgressModal").click(function(event){
            $(idRemove).removeClass("notNewProgress")
            $(idRemove).remove()

            AndamentosToRemove.push(id)

            let rowCount = $("#tableProgress tr").length;

            if(rowCount <= 1){
                const nextIdInt = 1

                let responsiblesOptions = '<option value="0" selected>Selecione</option>';

                $(".responsiblesInput").each(function()
                {     
                    if($(this).val()){
                        option = `<option value="${$(this).val()}">` + $(this).val() + '</option>';
                        responsiblesOptions += option
                    }
                });
        
                const content = `
                <tr id="ProgressId_${nextIdInt}" class="progressTr notNewProgress">
                    <th scope="row"> 
                        <input class="ProgressDateTime d-flex justify-content-center align-items-center" type="datetime-local" id="appt" name="appt" min="00:00" max="00:00">
                    </th>  
                    <th scope="row"> 
                        <select class="ProgressPhase form-select" aria-label="Default select example">
                            <option value="0" selected>Selecione</option>
                            <option value="1">PREGÃO ELETRÔNICO</option> 
                            <option value="2">DISPENSA ELETRÔNICA</option> 
                            <option value="3">CONCORRÊCIA ELETRÔNICA</option> 
                            <option value="4">REGIME DIF. DE COMPRAS</option> 
                        </select> 
                    </th> 
                    <th scope="row"> 
                        <select class="ProgressSituation form-select" aria-label="Default select example"> 
                            <option value="0" selected>Selecione</option> 
                            <option value="1">ABERTA</option> 
                            <option value="2">ANULADA</option> 
                            <option value="3">CANCELADA</option> 
                            <option value="4">DESERTA</option> 
                            <option value="5">FECHADA</option> 
                            <option value="6">REVOGADA</option> 
                            <option value="7">SUMPLENTE</option> 
                            <option value="8">TITULAR</option> 
                        </select> 
                    </th> 
                    <th scope="row"> 
                        <select id="responsiblesForProgress" class="ProgressResponsible form-select" aria-label="Default select example">
                            ${responsiblesOptions}
                        </select> 
                    </th> 
                    <th scope="row d-flex justify-content-center"> 
                        <a href="#" style="text-decoration: none;" onclick="removeRowForProgess(${nextIdInt})"> 
                            <img class="licitacaoBtnEdit" title="Remover item" src="/icons/x-circle-fill.svg" alt="Editar Licitação" height="20rem"> 
                        </a> 
                    </th> 
                </tr>`
                
                $('#tableProgress > tbody:last-child').append(content);  
            }

            $('#removeProgressModal').modal('hide');
        });

        return $('#removeProgressModal').modal('show');
    }

    $(idRemove).remove()
    
    let rowCount = $("#tableProgress tr").length;

    if(rowCount <= 1){
        const nextIdInt = 1

        let responsiblesOptions = '<option value="0" selected>Selecione</option>';

        $(".responsiblesInput").each(function()
        {     
            if($(this).val()){
                option = `<option value="${$(this).val()}">` + $(this).val() + '</option>';
                responsiblesOptions += option
            }
        });

        const content = `
        <tr id="ProgressId_${nextIdInt}" class="progressTr notNewProgress">
            <th scope="row"> 
                <input class="ProgressDateTime d-flex justify-content-center align-items-center" type="datetime-local" id="appt" name="appt" min="00:00" max="00:00">
            </th>  
            <th scope="row"> 
                <select class="ProgressPhase form-select" aria-label="Default select example">
                    <option value="0" selected>Selecione</option>
                    <option value="1">PREGÃO ELETRÔNICO</option> 
                    <option value="2">DISPENSA ELETRÔNICA</option> 
                    <option value="3">CONCORRÊCIA ELETRÔNICA</option> 
                    <option value="4">REGIME DIF. DE COMPRAS</option> 
                </select> 
            </th> 
            <th scope="row"> 
                <select class="ProgressSituation form-select" aria-label="Default select example"> 
                    <option value="0" selected>Selecione</option> 
                    <option value="1">ABERTA</option> 
                    <option value="2">ANULADA</option> 
                    <option value="3">CANCELADA</option> 
                    <option value="4">DESERTA</option> 
                    <option value="5">FECHADA</option> 
                    <option value="6">REVOGADA</option> 
                    <option value="7">SUMPLENTE</option> 
                    <option value="8">TITULAR</option> 
                </select> 
            </th> 
            <th scope="row"> 
                <select id="responsiblesForProgress" class="ProgressResponsible form-select" aria-label="Default select example">
                    ${responsiblesOptions}
                </select> 
            </th> 
            <th scope="row d-flex justify-content-center"> 
                <a href="#" style="text-decoration: none;" onclick="removeRowForProgess(${nextIdInt})"> 
                    <img class="licitacaoBtnEdit" title="Remover item" src="/icons/x-circle-fill.svg" alt="Editar Licitação" height="20rem"> 
                </a> 
            </th> 
        </tr>`

        $('#tableFilesAvailable > tbody:last-child').append(content);  
    }
}

function changeFilesAvailable(){
    $("#addFilesaAvailable").click(function(event){
        const lastId = $('#tableFilesAvailable > tbody > tr:last').attr('id');
        const nextIdInt = (parseInt(lastId.replace('FilesAvailableId_', '')) + 1);

        const content = `
        <tr id="FilesAvailableId_${nextIdInt}" class="notNewFilesAvailable"> 
            <th scope="row" colspan="4"> 
                <div class="input-group"> 
                    <input class="fileUpload form-control" required type="file" name="image" class="form-control" id="inputGroupFile02"> 
                </div>
            </th> 
            <th> 
                <span style="cursor: pointer;" onclick="removeRowForFilesAvailable(${nextIdInt})"> 
                    <img title="Remover arquivo" src="/icons/x-circle-fill.svg" alt="Remover arquivo" height="20rem"> 
                </span> 
            </th> 
        </tr>`
        
        $('#tableFilesAvailable > tbody:last-child').append(content);        
    });
}

function removeRowForFilesAvailable(id){
    let idRemove = "#FilesAvailableId_" + id

    const needsConfirmationModal = $(idRemove).attr('class')

    $('#btnRemoveFilesAvailableModal').off('click'); 

    if(needsConfirmationModal.includes('notNewFilesAvailable')){
        $("#btnRemoveFilesAvailableModal").click(function(event){
            $(idRemove).removeClass("notNewFilesAvailable")
            $(idRemove).remove()

            FilesToRemove.push(id)

            let rowCount = $("#tableFilesAvailable tr").length;

            if(rowCount <= 1){
                const nextIdInt = 1
        
                const content = `
                <tr id="FilesAvailableId_${nextIdInt}" class="notNewFilesAvailable"> 
                    <th scope="row" colspan="4"> 
                        <div class="input-group"> 
                            <input class="fileUpload form-control" required type="file" name="image" class="form-control" id="inputGroupFile02"> 
                        </div>
                    </th> 
                    <th> 
                        <span style="cursor: pointer;" onclick="removeRowForFilesAvailable(${nextIdInt})"> 
                            <img title="Remover arquivo" src="/icons/x-circle-fill.svg" alt="Remover arquivo" height="20rem"> 
                        </span> 
                    </th> 
                </tr>`

                $('#tableFilesAvailable > tbody:last-child').append(content);  
            }

            $('#removeFilesAvailableModal').modal('hide');
        });

        return $('#removeFilesAvailableModal').modal('show');
    }

    $(idRemove).remove()
    
    let rowCount = $("#tableFilesAvailable tr").length;

    if(rowCount <= 1){
        const nextIdInt = 1

        const content = `
        <tr id="FilesAvailableId_${nextIdInt}" class="notNewFilesAvailable"> 
            <th scope="row" colspan="4"> 
                <div class="input-group"> 
                    <input class="fileUpload form-control" required type="file" name="image" class="form-control" id="inputGroupFile02"> 
                </div>
            </th> 
            <th> 
                <span style="cursor: pointer;" onclick="removeRowForFilesAvailable(${nextIdInt})"> 
                    <img title="Remover arquivo" src="/icons/x-circle-fill.svg" alt="Remover arquivo" height="20rem"> 
                </span> 
            </th> 
        </tr>`

        $('#tableFilesAvailable > tbody:last-child').append(content);  
    }
}

function addPublicationFormIfTableIsEmpty(){

    var rowCount = $("#tablePublicationForm tr").length;
    if(rowCount <= 1){
        let previousId = $('.publicationFormTr').last().attr('id');
    
        if(!previousId)
            previousId = 'addPublicationFormTrId_0'
    
        const nextIdInt = parseInt(previousId.replace('addPublicationFormTrId_', '')) + 1;
        const nextInputId = 'addPublicationForm_' + nextIdInt;
        const nextTrId = 'addPublicationFormTrId_' + nextIdInt;
        
        const content = `
        <tr id="${nextTrId}" class="publicationFormTr notNewPublicationFormDate">
            <th scope="row">
                <div class="d-flex justify-content-center align-items-center"> 
                    <input class="publicationFormDate" id="${nextInputId}" name="date" type="date" form-control"/> 
                </div>
            </th> 
            <th scope="row"> 
                <select class="publicationFormType form-select" aria-label="Default select example">
                    <option value="0" selected>Selecione</option> 
                    <option value="1">Diário Oficial do Estado</option>
                    <option value="2">Jornal de grande circulação</option>
                    <option value="3">Outros meios de publicação</option>
                </select>
            </th> 
            <th scope="row"> 
                <input class="publicationFormDescription form-control" type="text" placeholder="Descreva o item"> 
            </th>
            <th scope="row d-flex justify-content-center"> 
                <a href="#" style="text-decoration: none;" onclick="removeRowForPublicationFormTable(${nextIdInt})"> 
                    <img class="licitacaoBtnEdit" title="Remover item" src="/icons/x-circle-fill.svg" alt="Editar Licitação" height="20rem"> 
                </a> 
            </th> 
        </tr>
        `
        
        $('#tablePublicationForm > tbody:last-child').append(content);        
    }
}

function addResponsibleIfTableIsEmpty(){

    var rowCount = $("#tableResponsible tr").length;
    if(rowCount <= 1){
        let previousId = $('.responsibleTr').last().attr('id');

        if(!previousId)
            previousId = 'addResponsibleTrId_0'

        const nextIdInt = (parseInt(previousId.replace('addResponsibleTrId_', '')) + 1);
        const nextInputId = 'addResponsible_' + nextIdInt;
        const nextTrId = 'addResponsibleTrId_' + nextIdInt;
        
        const content = `
        <tr id="${nextTrId}" class="responsibleTr notNewResponsible"> 
            <th scope="row"> 
                <select class="responsibleType form-select" aria-label="Default select example">
                    <option value="0" selected>Selecione</option>
                    <option value="1">PREGOEIRO/PRESIDENTE DA COMISSÃO</option>
                    <option value="2">RESPONSÁVEL PELA INFORMAÇÃO</option>
                    <option value="3">RESPONSÁVEL PELO PARECER TÉCNICO JURÍDICO</option>
                    <option value="4">RESPONSÁVEL PELA ADJUDIÇÃO</option>
                    <option value="5">RESPONSÁVEL PELA HOMOLOGAÇÃO</option>
                </select>
            </th> 
            <th scope="row"> 
                <input class="responsibleName responsiblesInput form-control" type="text" placeholder="Nome do Agente responsável" aria-label="input"> 
            </th> 
            <th scope="row"> 
                <a href="#" style="text-decoration: none;" onclick="removeRowForResponsibleTable(${nextIdInt})"> 
                    <img title="Remover item" src="/icons/x-circle-fill.svg" alt="Editar Licitação" height="20rem"> 
                </a> 
            </th>
        </tr>`

        $('#tableResponsible > tbody:last-child').append(content);       
    }
}

function addProgressIfTableIsEmpty(){

    var rowCount = $("#tableProgress tr").length;
    if(rowCount <= 1){
        let responsiblesOptions = '<option value="0" selected>Selecione</option>';

        $(".responsiblesInput").each(function()
        {     
            if($(this).val()){
                option = `<option value="${$(this).val()}">` + $(this).val() + '</option>';
                responsiblesOptions += option
            }
        });

        const lastId = "0";
        const nextIdInt = (parseInt(lastId.replace('ProgressId_', '')) + 1);

        const content = `
        <tr id="ProgressId_${nextIdInt}" class="progressTr notNewProgress">
            <th scope="row"> 
                <input class="ProgressDateTime d-flex justify-content-center align-items-center" type="datetime-local" id="appt" name="appt" min="00:00" max="00:00">
            </th>  
            <th scope="row"> 
                <select class="ProgressPhase form-select" aria-label="Default select example">
                    <option value="0" selected>Selecione</option>
                    <option value="1">PREGÃO ELETRÔNICO</option> 
                    <option value="2">DISPENSA ELETRÔNICA</option> 
                    <option value="3">CONCORRÊCIA ELETRÔNICA</option> 
                    <option value="4">REGIME DIF. DE COMPRAS</option> 
                </select> 
            </th> 
            <th scope="row"> 
                <select class="ProgressSituation form-select" aria-label="Default select example"> 
                    <option value="0" selected>Selecione</option> 
                    <option value="1">ABERTA</option> 
                    <option value="2">ANULADA</option> 
                    <option value="3">CANCELADA</option> 
                    <option value="4">DESERTA</option> 
                    <option value="5">FECHADA</option> 
                    <option value="6">REVOGADA</option> 
                    <option value="7">SUMPLENTE</option> 
                    <option value="8">TITULAR</option> 
                </select> 
            </th> 
            <th scope="row"> 
                <select id="responsiblesForProgress" class="ProgressResponsible form-select" aria-label="Default select example">
                    ${responsiblesOptions}
                </select> 
            </th> 
            <th scope="row d-flex justify-content-center"> 
                <a href="#" style="text-decoration: none;" onclick="removeRowForProgess(${nextIdInt})"> 
                    <img class="licitacaoBtnEdit" title="Remover item" src="/icons/x-circle-fill.svg" alt="Editar Licitação" height="20rem"> 
                </a> 
            </th> 
        </tr>`
        
        $('#tableProgress > tbody:last-child').append(content);          
    }
}

function addFilesAvailableIfTableIsEmpty(){

    var rowCount = $("#tableFilesAvailable tr").length;
    if(rowCount <= 1){
        const lastId = "0";
        const nextIdInt = (parseInt(lastId.replace('FilesAvailableId_', '')) + 1);

        const content = `
        <tr id="FilesAvailableId_${nextIdInt}" class="notNewFilesAvailable"> 
            <th scope="row" colspan="4"> 
                <div class="input-group"> 
                    <input class="fileUpload form-control" required type="file" name="image" class="form-control" id="inputGroupFile02"> 
                </div>
            </th> 
            <th> 
                <span style="cursor: pointer;" onclick="removeRowForFilesAvailable(${nextIdInt})"> 
                    <img title="Remover arquivo" src="/icons/x-circle-fill.svg" alt="Remover arquivo" height="20rem"> 
                </span> 
            </th> 
        </tr>`

        $('#tableFilesAvailable > tbody:last-child').append(content);          
    }
}

function getFormDataForRequest() {
    $("#btnSendRequest").click(function(event){
        var formData = new FormData(document.getElementById("formUploadFiles"));

        const processNumber = $("#processNumber").val()
        const type = $("#type").val()
        const openingDate = $('#openingDate').val()
        const publicationDate = $('#publicationDate').val()
        const objectInformation = $('#objectInformation').val()

        let LicitacaoPublicacaoList = []
        $("#tablePublicationForm tbody tr").each(function()
        {     
            const Date = $(this).find(".publicationFormDate").val()
            const Type = $(this).find(".publicationFormType").val()
            const Description = $(this).find(".publicationFormDescription").val()
            
            if(Date && Type && Description && Type != 0){
                LicitacaoPublicacaoList.
                push({
                    Date,
                    Type,
                    Description
                })
            }
        });

        let LicitacaoResponsaveisList = []
        $("#tableResponsible tbody tr").each(function()
        {     
            const Type = $(this).find(".responsibleType").val()
            const Name = $(this).find(".responsibleName").val()
            
            if(Type && Name && Type != 0){
                LicitacaoResponsaveisList.
                push({
                    Type,
                    Name,
                })
            }
        });
        
        let LicitacaoAndamentosList = []
        $("#tableProgress tbody tr").each(function()
        {     
            const DateTime = $(this).find(".ProgressDateTime").val()
            const Phase = $(this).find(".ProgressPhase").val()
            const Situation = $(this).find(".ProgressSituation").val()
            const Responsible = $(this).find(".ProgressResponsible").val()
            
            
            if(DateTime && Phase && Situation && Responsible && Phase != 0 && Situation != 0){
                LicitacaoAndamentosList.
                push({
                    DateTime,
                    Phase,
                    Situation,
                    Responsible
                })
            }
            
        });

        LicitacaoPublicacaoList.forEach((element, index) => {
            formData.append(`LicitacaoPublicacaoDate[${index}]`, element.Date);
            formData.append(`LicitacaoPublicacaoType[${index}]`, element.Type);
            formData.append(`LicitacaoPublicacaoDescription[${index}]`, element.Description);
        });

        LicitacaoResponsaveisList.forEach((element, index) => {
            formData.append(`LicitacaoResponsaveisType[${index}]`, element.Type);
            formData.append(`LicitacaoResponsaveisName[${index}]`, element.Name);
        });

        LicitacaoAndamentosList.forEach((element, index) => {
            formData.append(`LicitacaoAndamentosDateTime[${index}]`, element.DateTime);
            formData.append(`LicitacaoAndamentosPhase[${index}]`, element.Phase);
            formData.append(`LicitacaoAndamentosSituation[${index}]`, element.Situation);
            formData.append(`LicitacaoAndamentosResponsible[${index}]`, element.Responsible);
        });

        PublicacaosToRemove.forEach((element, index) => {
            formData.append(`PublicacaosToRemove[${index}]`, element);
        })

        ResposaveisToRemove.forEach((element, index) => {
            formData.append(`ResposaveisToRemove[${index}]`, element);
        })

        AndamentosToRemove.forEach((element, index) => {
            formData.append(`AndamentosToRemove[${index}]`, element);
        })

        FilesToRemove.forEach((element, index) => {
            formData.append(`FilesToRemove[${index}]`, element);
        })

        formData.append('PublicacaosToRemoveLength', PublicacaosToRemove.length);
        formData.append('ResposaveisToRemoveLength', ResposaveisToRemove.length);
        formData.append('AndamentosToRemoveLength', AndamentosToRemove.length);
        formData.append('FilesToRemoveLength', FilesToRemove.length);

        formData.append('processNumber', processNumber)
        formData.append('type', type)
        formData.append('openingDate', openingDate)
        formData.append('publicationDate', publicationDate)
        formData.append('objectInformation', objectInformation)
        
        formData.append('LicitacaoPublicacaoListLength', LicitacaoPublicacaoList.length);
        formData.append('LicitacaoResponsaveisListLength', LicitacaoResponsaveisList.length);
        formData.append('LicitacaoAndamentosListLength', LicitacaoAndamentosList.length);

        const url = `/admin/editlicitacao/` + $("#licitacaoId").val()

        $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: url,
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            error: function (error) {
                loadPageAnimation(false)
                loadToastNotification("Não foi possível editar essa licitação, tente novamente mais tarde", "danger")
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