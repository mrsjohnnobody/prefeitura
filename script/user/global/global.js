$(document).ready(function () {
    setColorCamara()
});

function loadPageAnimation(value){
    if(value == true){
        $("#loadPageAnimation").attr("hidden",false);
        $('body').css("overflow-y", "hidden");
        $('body').css("height", "100%");
    }else if(value == false){
        $("#loadPageAnimation").attr("hidden",true);
        $('body').css("overflow-y", "");
        $('body').css("height", "");
    }
}

function loadToastNotification(message, type){
    if(type == "success"){
        $('#toast-success .toast-body').text(message)
        $('#toast-success').toast('show');
    }

    if(type == "danger"){
        $('#toast-danger .toast-body').text(message)
        $('#toast-danger').toast('show');
    }

    if(type == "warning"){
        $('#toast-warning .toast-body').text(message)
        $('#toast-warning').toast('show');
    }
}

tamanho = 16;
function diminuirTamFonte(){
  tamanho--;
  document.body.style.fontSize=tamanho+"px";
}
function aumentarTamFonte(){
  tamanho++;
  document.body.style.fontSize=tamanho+"px";
}

function setDarkMode(){
    if($('html').hasClass('dark-mode'))
        $('html').removeClass('dark-mode');
    else
        $('html').addClass('dark-mode');
        
    document.body.style.setProperty('--primary-color', 'black');
    document.body.style.setProperty('--secondary-color', '#4e4e4e');
}

function setColorCamara(){
    document.body.style.setProperty('--primary-color', $('#corPrimaria').val());
    document.body.style.setProperty('--secondary-color', $('#corSecundaria').val());
}