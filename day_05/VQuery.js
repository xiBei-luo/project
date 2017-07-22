//封装自己的js库


function myAddevent(obj,sEv,fn){
    if (obj.attachEvent) {
        obj.attachEvent('on'+sEv,function(){
            fn.call(obj);//解决IE中this的问题
        });
    }
    else{
        obj.addEventListener(sEv,fn,false);
    }
}//页面中含有多个事件时为了使它们都能正常运行，互不干扰，从而加上事件绑定

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

function getIndex(obj){
    var aBrother=obj.parentNode.children;
    var i=0;
    for(i=0;i<aBrother.length;i++){
        if (aBrother[i]==obj) {
            return i;
        }
    }
}


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

VQuery.prototype.toggle=function(){
    var i=0;
    var _arguments=arguments;


    for(i=0;i<this.elements.length;i++){
        addToggle(this.elements[i]);
    }
    function addToggle(obj){
        var count=0;
        myAddevent(obj,'click',function(){
            _arguments[count%_arguments.length].call(obj);
            count++;
        })
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
        //当有两个参数时，设置属性
        var i=0;
        for(i=0;i<this.elements.length;i++){
            this.elements[i].style[attr]=value;
        }
    } 
    else{
        //当有一个参数时，获取属性
        // return this.elements[0].style[attr];style只能获取行间样式
        return getStyle(this.elements[0],attr);
    }  
}

VQuery.prototype.attr=function(attr,value){
    if (arguments.length==2) {
        var i=0;
        for(i=0;i<this.elements.length;i++){
            this.elements[i][attr]=value;
        }
    }
    else{
        return this.elements[0][attr];
    } 
}

VQuery.prototype.eq=function(n){
    return $(this.elements[n]);
}//下标

function appendArr(arr1,arr2){
    var i=0;
    for(i=0;i<arr2.length;i++){
        arr1.push(arr2[i]);
    }
}

//concat连接两个及以上的数组
VQuery.prototype.find=function(str){
    var  i=0;
    var aResult=[];
    for(i=0;i<this.elements.length;i++){
        switch(str.charAt(0)){
            case '.':
                var aEle=getByClass(this.elements[i],str.substring(1));
                aResult=aResult.concat(aEle);
                break;
            default:
                var aEle=this.elements[i].getElementsByTagName(str);
                // aResult=aResult.concat(aEle);
                appendArr(aResult,aEle);
        }
    }
    var newVquery=$();
    newVquery.elements=aResult;
    return newVquery;
}

VQuery.prototype.index=function(){
    return getIndex(this.elements[0]);
}












function $(vArg){
    return new VQuery(vArg);
}








