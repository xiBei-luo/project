//封装自己的js库


function myAddevent(obj,sEv,fn){
    if (obj.attachEvent) {
        obj.attachEvent('on'+sEv,fn);
    }
    else{
        obj.addEventListener(sEv,fn,false);
    }
}

function getByClass(oParent,sClass){
    var aEle=oParent.getElementsByTagName('*');
    var aResult=[];
    var i=0;

    for(i=0;i<aEle.length;i++){
        if(aEle[i].className==sClass){
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}

function getStyle(obj,attr){
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else{
        return getComputedStyle(obj,false)[attr];
    }
}//获取非行间样式


function VQuery(vArg){
    this.elements=[];//存储选中的元素

    switch(typeof vArg){
        case 'function'://当参数为函数时
            myAddevent(window,'load',vArg);
            break;
        case 'string'://当参数为字符串时
            switch(vArg.charAt(0)){
                case '#'://参数为id
                    var obj=document.getElementById(vArg.substring(1));

                    this.elements.push(obj);
                    break;
                case '.'://参数为class
                    this.elements=getByClass(document,vArg.substring(1));
                    break;
                default://参数为标签名（tag）
                    this.elements=document.getElementsByTagName(vArg)
            }
            break;
        case 'object'://当参数为对象时
            this.elements.push(vArg);
    }
}

VQuery.prototype.click=function(fn){
    var i=0;
    for(i=0;i<this.elements.length;i++){
        myAddevent(this.elements[i],'click',fn);
    }
}

VQuery.prototype.show=function(){
    var i=0;
    for(i=0;i<this.elements.length;i++){
        this.elements[i].style.display='block';
    }
}
VQuery.prototype.hide=function(){
    var i=0;
    for(i=0;i<this.elements.length;i++){
        this.elements[i].style.display='none';
    }
}
VQuery.prototype.hover=function(fnOver,fnOut){
    var i=0;
    for(i=0;i<this.elements.length;i++){
        myAddevent(this.elements[i], 'mouseover', fnOver);
        myAddevent(this.elements[i], 'mouseout', fnOut);
    }
}
//arguments参数个数不固定时使用
VQuery.prototype.css=function(attr,value){
    if (arguments.length==2) {
        //当有两个参数时，设置
        var i=0;
        for(i=0;i<this.elements.length;i++){
            this.elements[i].style[attr]=value;
        }
    } 
    else{
        //当有一个参数时，获取
        // return this.elements[0].style[attr];style只能获取行间样式
        return getStyle(this.elements[0],attr);
    }  
}








function $(vArg){
    return new VQuery(vArg);
}








