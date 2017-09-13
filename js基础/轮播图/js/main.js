window.onload=function(){
    var oList=document.getElementById('box_list'),
        aList=oList.getElementsByTagName('li'),
        prev=document.getElementById('prev'),
        next=document.getElementById('next'),
        oPiont=document.getElementById('box_point'),
        aPiont=oPiont.getElementsByTagName('li');
        timer=null;

    oList.style.width=aList.length*aList[0].offsetWidth+'px';


    function move(){
        oList.style.left=-aList[0].offsetWidth+'px';
    }
    next.onclick=function(){
        move();
    }

    for(var i=0;i<aPiont.length;i++){
        aPiont[i].index=i;
        aPiont[i].onclick=function(){
            for(var i=0;i<aPiont.length;i++){
                aPiont[i].style.background="#ccc";
            }
            this.style.background="red";
        }
    }       
}