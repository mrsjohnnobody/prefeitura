$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: "/user/videosList",
        headers: { 'page-header': '-1', 'status-header': 'isHome' },
        error: function (error) {
            loadPageAnimation(false)
            loadToastNotification("Não foi possível carregar os videos, tente novamente mais tarde", "danger")
        },
        success: function (result) { 
            if(result.status === 'success') {
                $('.videoItem').remove()
                $("#anterior").val(result.pagination.anterior)
                $("#proximo").val(result.pagination.proximo)

                result.videos.forEach(video => {
                    $("#glossarioItems").append(`
                    <div class="videoItem card col-5 m-2">
                    <a class="videosCard" href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                      <img src="${video.snippet.thumbnails.medium.url}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title fw-bold">${video.snippet.title}</h5>
                      </div>
                    </a>
                  </div>`);
                });

                $(window).scrollTop(0);
            }else{
                loadToastNotification(result.message, "danger")
            }

            loadPageAnimation(false)                    
        }
    });

    pagination()
});

function pagination(){
    $("#paginaInicio").click(function() {
        $.ajax({
            type: 'GET',
            url: "/user/videosList",
            headers: { 'page-header': '-1', 'status-header': 'isHome' },
            error: function (error) {
                loadPageAnimation(false)
                loadToastNotification("Não foi possível carregar os videos, tente novamente mais tarde", "danger")
            },
            success: function (result) { 
                if(result.status === 'success') {
                    $('.videoItem').remove()
                    $("#anterior").val(result.pagination.anterior)
                    $("#proximo").val(result.pagination.proximo)
                    result.videos.forEach(video => {
                        $("#glossarioItems").append(`
                        <div class="videoItem card col-5 m-2">
                        <a class="videosCard" href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                          <img src="${video.snippet.thumbnails.medium.url}" class="card-img-top" alt="...">
                          <div class="card-body">
                            <h5 class="card-title fw-bold">${video.snippet.title}</h5>
                          </div>
                        </a>
                      </div>`);
                    });

                    $(window).scrollTop(0);
                }else{
                    loadToastNotification(result.message, "danger")
                }

                loadPageAnimation(false)                    
            }
        });
    })

    $("#paginaAnterior").click(function() {
        const page = $("#anterior").val()
        $.ajax({
            type: 'GET',
            url: "/user/videosList",
            headers: { 'page-header': page, 'status-header': 'isPrevius' },
            error: function (error) {
                loadPageAnimation(false)
                loadToastNotification("Não foi possível carregar os videos, tente novamente mais tarde", "danger")
            },
            success: function (result) { 
                if(result.status === 'success') {
                    $('.videoItem').remove()
                    $("#anterior").val(result.pagination.anterior)
                    $("#proximo").val(result.pagination.proximo)

                    result.videos.forEach(video => {
                        $("#glossarioItems").append(`
                        <div class="videoItem card col-5 m-2">
                        <a class="videosCard" href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                          <img src="${video.snippet.thumbnails.medium.url}" class="card-img-top" alt="...">
                          <div class="card-body">
                            <h5 class="card-title fw-bold">${video.snippet.title}</h5>
                          </div>
                        </a>
                      </div>`);
                    });

                    $(window).scrollTop(0);
                }else{
                    loadToastNotification(result.message, "danger")
                }

                loadPageAnimation(false)                    
            }
        });
    })

    $("#paginaProxima").click(function() {
        const page = $("#proximo").val()
        $.ajax({
            type: 'GET',
            url: "/user/videosList",
            headers: { 'page-header': page, 'status-header': 'isNext' },
            error: function (error) {
                loadPageAnimation(false)
                loadToastNotification("Não foi possível carregar os videos, tente novamente mais tarde", "danger")
            },
            success: function (result) { 
                if(result.status === 'success') {
                    $('.videoItem').remove()
                    $("#anterior").val(result.pagination.anterior)
                    $("#proximo").val(result.pagination.proximo)

                    result.videos.forEach(video => {
                        $("#glossarioItems").append(`
                        <div class="videoItem card col-5 m-2">
                        <a class="videosCard" href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                          <img src="${video.snippet.thumbnails.medium.url}" class="card-img-top" alt="...">
                          <div class="card-body">
                            <h5 class="card-title fw-bold">${video.snippet.title}</h5>
                          </div>
                        </a>
                      </div>`);
                    });

                    $(window).scrollTop(0);
                }else{
                    loadToastNotification(result.message, "danger")
                }

                loadPageAnimation(false)                    
            }
        });
    })
}

