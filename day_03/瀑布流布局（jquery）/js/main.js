$(window).on('load',function(){
    waterfull();
    var dataInt={"data":[{"src":'P_00.jpg'},{"src":'P_01.jpg'},{"src":'P_02.jpg'},{"src":'P_03.jpg'}]}
    $(window).on('scroll',function(){
        if (checkScrollSlide) {
            $.each(dataInt.data,function(key,value){
                var oBox=$('<div>').addClass('box').appendTo($('#main'));
                var oPic=$('<div>').addClass('pic').appendTo($(oBox));
                var oImg=$('<img>').attr('src','images/'+$(value).attr('src')).appendTo($(oPic));

            })
            waterfull('main','box');
        }
    })
})

function waterfull(){
    var $boxs=$('#main>div');
    var w=$boxs.eq(0).outerWidth();
    var cols=Math.floor($(window).width()/w);
    $('#main').width(w*cols).css('margin','0 auto');

    var hArr=[];
    $boxs.each(function(index,value){
        var h=$boxs.eq(index).outerHeight();
        if(index<cols){
            hArr[index]=h;
        }
        else{
            var minH=Math.min.apply(null,hArr);//获取最小高度
            var minHIndex=$.inArray(minH,hArr);//获取最小高度的索引值
            $(value).css({
                'position':'absolute',
                'top':minH+'px',
                'left':minHIndex*w+'px'
            })
            hArr[minHIndex]+=$boxs.eq(index).outerHeight();
        }
    })
}

function checkScrollSlide(){
    var $lastBox=$('#main>div').last();
    var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2)
    var scrollTop=$(window).scrollTop();
    var documentH=$(window).height();
    return (lastBoxDis<scrollTop+documentH)?true:false;
}








