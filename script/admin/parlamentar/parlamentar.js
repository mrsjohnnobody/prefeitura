$(document).ready(function () {
    $("#searchParlamentary").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#tableParlamentaries tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });

    createParlamentar()
    EditParlamentar()

});

function createParlamentar(){
  $("#AddParlamenteryForm").submit(function(event) {

    loadPageAnimation(true)
    $('#AddParlamenteryModal').modal('hide')

    event.preventDefault();
    var formData = new FormData(this);

    const extension = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '').split('.').pop();
    if(extension != "jpg" && extension != "png" && extension != "jpeg"){

        loadPageAnimation(false)

        loadToastNotification("Somente arquivos no formato jpg, png ou jpeg são permitidos", "danger")
        
        return
    }

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: "/admin/addParlamentar",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        error: function (error) {
            loadToastNotification("Não foi possível adicionar este parlamentar", "danger")
        },
        success: function (result) { 
            if(result.status === 'success') {
                loadToastNotification(result.message, "success")
                                    
                let newRow = 
                `
                `

                $('#tableParlamentaries tbody').append(newRow);

            }else{
                loadToastNotification(result.message, "danger")
            }
        }
    });

    loadPageAnimation(false)

  })
}

function EditParlamentar(){
  $("#EditParlamenteryForm").submit(function(event) {

    loadPageAnimation(true)
    $('#changeParlamenteryModal').modal('hide')

    event.preventDefault();
    var formData = new FormData(this);

    const extension = $('#changeImage').val().replace(/C:\\fakepath\\/i, '').split('.').pop();
    if(extension && extension != "jpg" && extension != "png" && extension != "jpeg"){

        loadPageAnimation(false)

        loadToastNotification("Somente arquivos no formato jpg, png ou jpeg são permitidos", "danger")
        
        return
    }

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: "/admin/editParlamentar/" + $("#editParlamentarId").val(),
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        error: function (error) {
            loadToastNotification("Não foi possível adicionar este parlamentar", "danger")
        },
        success: function (result) { 
            if(result.status === 'success') {
                loadToastNotification(result.message, "success")
                                    
                let newRow = 
                `
                `

                $('#tableParlamentaries tbody').append(newRow);

            }else{
                loadToastNotification(result.message, "danger")
            }
        }
    });

    loadPageAnimation(false)

  })
}

function setIdModal(value) {
    $("#btnDeleteModal").attr("href", `/admin/deleteParlamentar/${value}`)
}

function setInfosModal(id, name, nickname, occupation, birthdate, email, phoneNumber, legislatura) {
    $("#editParlamentarId").val(id)
    $("#changeName").val(name);
    $("#changeNickname").val(nickname);
    $("#changeBirthdate").val(birthdate);
    $("#changeEmail").val(email);
    $("#changePhoneNumber").val(phoneNumber);
    $("#changeOccupation").val(occupation).change();
    $("#changeLegislatura").val(legislatura).change();
}