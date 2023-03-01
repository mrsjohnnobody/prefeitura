$(document).ready(function () {
    pagination()
});

function pagination(){
    $('#pagination').twbsPagination({
        totalPages: parseInt($("#totalPage").val()),
        visiblePages: 4,
        onPageClick: function (event, page) {
            event.preventDefault();
            
            var formData = { 'page': page };

            $.ajax({
                type: 'GET',
                url: "/user/glossarioList",
                data: formData,
                headers: { 'page-header': page },
                error: function (error) {
                    loadPageAnimation(false)
                    loadToastNotification("Não foi possível carregar o glossário, tente novamente mais tarde", "danger")
                },
                success: function (result) { 
                    if(result.status === 'success') {
                        $('.glossarioItem').remove()

                        result.glossario.forEach(glossario => {
                            $("#glossarioItems").append(`
                            <div class="glossarioItem container-fluid">
                                <div class="card text m-5 mb-2 mt-0 d-flex justify-content-center" style="border-style: solid; border-color: var(--secondary-color)">
                                <div class="card">
                                  <div class="fw-bold card-header">
                                    ${glossario.Title}
                                  </div>
                                  <div class="card-body">
                                    <p class="card-text">
                                        ${glossario.Text}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>`);
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

