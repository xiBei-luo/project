window.onload=function(){
    var oList=document.getElementById('box_list'),
        aList=oList.getElementsByTagName('li'),
        prev=document.getElementById('prev'),
        next=document.getElementById('next'),
        oPiont=document.getElementById('box_point'),
        aPiont=oPiont.getElementsByTagName('li'),
        timer=null;

    oList.style.width=aList.length*aList[0].offsetWidth+'px';

    function tab(){
        for(var i=0;i<aPiont.length;i++){
            aPiont[i].style.background="#ccc";
        }
        aPiont[iNow].style.background="red";
        oList.style.left=-aPiont[iNow].index*aList[0].offsetWidth+'px';
    }


    for(var i=0;i<aPiont.length;i++){
        aPiont[i].index=i;
        aPiont[i].onclick=function(){
            iNow=this.index;
            tab();
        }

        var aListOneWidth=aList[0].offsetWidth;

        next.onclick=function(){
            if(parseInt(oList.style.left)<=-2696){
                oList.style.left=0+'px';
            }
            else{
                animate(-aListOneWidth);
            }
            console.log(parseInt(oList.style.left));
        }
        prev.onclick=function(){
            if(parseInt(oList.style.left)>=0){
                oList.style.left=-2696+'px';
            }
            else{
                animate(aListOneWidth);
            }
        }
    }

    function animate(owidth){
        oList.style.left=parseInt(oList.style.left)+owidth+'px';
    }       
}
