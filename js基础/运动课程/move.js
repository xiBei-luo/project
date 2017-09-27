        function getStyle(obj,attr){
            if(obj.currentStyle){
                return obj.currentStyle[attr];
            }
            else{
                return getComputedStyle(obj,false)[attr];
            }
        }

        function startMove(obj,json,fn){
            clearInterval(obj.timer);
            obj.timer=setInterval(function(){
                var bStop=true;//表示所有的值都到达了目标点

                for(attr in json){
                    var iCur=0;
                    if(attr=='opacity'){
                        iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
                    }
                    else{
                        iCur=parseInt(getStyle(obj,attr));
                    }

                    var iSpeed=json[attr]-iCur>0?Math.ceil((json[attr]-iCur)/8):Math.floor((json[attr]-iCur)/8);
        
                    if(bStop!=json[attr]){
                        bStop=false;//如果某个值没有到达目标点则bStop为假
                    }
                    if(attr=='opacity'){
                        obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
                        obj.style.opacity=(iCur+iSpeed)/100;
                    }
                    else{
                        obj.style[attr]=iCur+iSpeed+'px';
                    } 
                }


                if(iCur==json[attr]){
                    clearInterval(obj.timer);
                    if(fn){
                        fn();
                    }
                }//只有整个程序循环结束后bStop为true才关闭定时器
            },30)
        }