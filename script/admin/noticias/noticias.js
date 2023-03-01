$(document).ready(function () {
    $("#searchParlamentary").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#tableParlamentaries tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });

    createNoticia()
});

function createNoticia(){
  $("#addNoticiaForm").submit(function(event) {

    loadPageAnimation(true)
    $('#addNoticiaModal').modal('hide')

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
        url: "/admin/addNoticia",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        error: function (error) {
            loadToastNotification("Não foi possível adicionar esta noticia", "danger")
        },
        success: function (result) { 
            if(result.status === 'success') {

                $('#addNoticiaForm')[0].reset();

                loadToastNotification(result.message, "success")
                                    
                let newRow = 
                `
                <div id="noticiaId_${result.noticia.id}" class="col-xl-4 col-12 col-lg-6">
                    <div class="profile-card-2">
                        <a href="/admin/noticia/${result.noticia.id}" style="text-decoration: none; color: inherit;">
                            <img src="/${result.noticia.image}" alt="Capa da notícia" class="img-fluid">
                        </a>
                        <div>
                            <div class="card-body mt-0 pt-0">
                                <div class="row p-2">
                                    <div class="my-2 text-start">
                                        <span class="fw-bold">${result.noticia.title}</span>
                                    </div>
                                    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="setIdModal('${result.noticia.id}')">EXCLUIR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `

                $('#noticiasList').append(newRow);

            }else{
                loadToastNotification(result.message, "danger")
            }
        }
    });

    loadPageAnimation(false)

  })
}

function setIdModal(value) {

    $('#btnDeleteModal').off('click'); 

    $("#btnDeleteModal").click(function() {
        loadPageAnimation(true)

        $.ajax({
            type: "GET",
            url: "/admin/deleteNoticia/" + value,
            error: function (error) {
                $('#deleteModal').modal('hide')
                
                loadToastNotification("Não foi possível remover esta notícia", "danger")
            },
            success: function (result) {

                if(result.status === 'success') {
                    $('#deleteModal').modal('hide')
                    
                    loadToastNotification(result.message, "success")
                    
                    $("#noticiaId_" + value).remove()
                }else{
                    $('#deleteModal').modal('hide')
                    
                    loadToastNotification(result.message, "danger")
                }
            }
        });

        loadPageAnimation(false)
    })
}

