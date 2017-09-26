        function getStyle(obj,attr){
            if(obj.currentStyle){
                return obj.currentStyle[attr];
            }
            else{
                return getComputedStyle(obj,false)[attr];
            }
        }

        function starMove(obj,attr,iTarget){
            clearInterval(obj.timer);
            obj.timer=setInterval(function(){

                var iCur=0;//替代了obj.offsetwidth(height...)

                if(attr=='opacity'){
                    iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
                }
                else{
                    iCur=parseInt(getStyle(obj,attr));
                }

                var iSpeed=iTarget-iCur>0?Math.ceil((iTarget-iCur)/8):Math.floor((iTarget-iCur)/8);
    
                if(iCur==iTarget){
                    clearInterval(obj.timer);
                }
                else{
                    if(attr=='opacity'){
                        obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
                        obj.style.opacity=(iCur+iSpeed)/100;
                    }
                    else{
                        obj.style[attr]=iCur+iSpeed+'px';
                    } 
                }
            },30)
        }