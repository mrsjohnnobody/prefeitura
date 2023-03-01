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
                url: "/user/dicionarioList",
                data: formData,
                headers: { 'page-header': page },
                error: function (error) {
                    loadPageAnimation(false)
                    loadToastNotification("Não foi possível carregar o dicionário, tente novamente mais tarde", "danger")
                },
                success: function (result) { 
                    if(result.status === 'success') {
                        $('.dicionarioItem').remove()

                        result.dicionario.forEach(dicionario => {
                            $("#dicionarioItems").append(`
                            <div class="dicionarioItem container-fluid">
                                <div class="card text m-5 mb-2 mt-0 d-flex justify-content-center" style="border-style: solid; border-color: var(--secondary-color)">
                                <div class="card">
                                  <div class="fw-bold card-header">
                                    ${dicionario.Title}
                                  </div>
                                  <div class="card-body">
                                    <p class="card-text">
                                        ${dicionario.Text}
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

