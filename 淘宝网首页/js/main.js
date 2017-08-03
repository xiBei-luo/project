window.onload=function(){
    var oUl=document.getElementById('u_tab_ele');
    var aTab=oUl.getElementsByTagName('li');
    var oCont=document.getElementById('u_tab_item');
    var aDatas=['最受赞赏公司阿里折桂1','最受赞赏公司阿里折桂2','最受赞赏公司阿里折桂3','最受赞赏公司阿里折桂4','最受赞赏公司阿里折桂5']

    for(var i=0;i<aTab.length;i++){
        aTab[i].index=i;
        aTab[i].onclick=function(){
            for(var i=0;i<aTab.length;i++){
                aTab[i].className='';
                oCont.innerHTML='';
            }
            this.className='current';
            oCont.innerHTML="<li>"+aDatas[this.index]+"</li>"+"<li>"+aDatas[this.index]+"</li>"+"<li>"+aDatas[this.index]+"</li>"+"<li>"+aDatas[this.index]+"</li>"
        }
    }
}







