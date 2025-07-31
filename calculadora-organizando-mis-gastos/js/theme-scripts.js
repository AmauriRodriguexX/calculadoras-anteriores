(function($){

    $('.menu-icon i').click(function(){

        $('body').addClass('menu-showed');
    });

    $('.close-menu').click(function(){
        console.log('click');
        $('body').removeClass('menu-showed');
    });

    $('.header .search a').click(function(){
        $('#search-wrap').toggle(200);
        $('#search-wrap input[type="text"]').focus();

    });

    $('#full-menu li.with-childs').addClass('close');

    $('#full-menu li.with-childs > a').click(function(e){
        e.preventDefault();
        $(this).parent().toggleClass('close');
    });

}(jQuery));