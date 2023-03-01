$(document).ready(function () {
    var itens = $('.mesaDiretoraItem')
    itens.each(function() {
        const item  = $(this).find('.card-body').html()
        if(item.trim().replace(/\s/g, '') == '<divclass="row"></div>'){
            $(this).remove()
        }
    })
});

