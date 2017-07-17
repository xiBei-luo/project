window.onload=function(){
    waterfull('main','box');
    var dataInt={"data":[{"src":'P_00.jpg'},{"src":'P_01.jpg'},{"src":'P_02.jpg'},{"src":'P_03.jpg'}]}
    window.onscroll=function(){
        if(checkScrollSlide){
            var oParent=document.getElementById('main');
            //json数据渲染到页面底部
            for(var i=0;i<dataInt.data.length;i++){
                var oBox=document.createElement('div');
                oBox.className='box';
                oParent.appendChild(oBox);
                var oPic=document.createElement('div');
                oPic.className='pic';
                oBox.appendChild(oPic);
                var oImg=document.createElement('img');
                oImg.src="images/"+dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfull('main','box');
        }
    }
}

//waterfull（）计算图片应该出现的位置
function waterfull(parent,box){
    //将main下的所有class为box的元素取出来
    var oParent=document.getElementById(parent);
    var oBoxs=getByClass(oParent,box);
    
    //计算页面显示的列数
    var oBoxW=oBoxs[0].offsetWidth;
    var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
    
    //设置main的宽度和对齐方式
    oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
    
    var hArr=[];//存放每一列高度的数组(第一次循环存放的是第一行所有图片的高度)
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            hArr.push(oBoxs[i].offsetHeight);
        }
        else{
            var minH=Math.min.apply(null,hArr);//获取高度最小的盒子
            var index=getMinhIndex(hArr,minH);//高度最小盒子的索引值
            oBoxs[i].style.position='absolute';
            oBoxs[i].style.top=minH+'px';
            oBoxs[i].style.left=oBoxW*index+'px';
            hArr[index]+=oBoxs[i].offsetHeight;
        }
    }
}

//根据classname获取元素
function getByClass(parent,clsName){
    var boxArr=[],
        oElements=parent.getElementsByTagName('*');
    for(var i=0;i<oElements.length;i++){
        if (oElements[i].className==clsName) {
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;    
}

function getMinhIndex(arr,val){
    for(var i in arr){
        if (arr[i]==val) {
            return i;
        }
    }
}

//判断是否具有滚动加载图片的条件
function checkScrollSlide(){
    var oParent=document.getElementById('main');
    var oBoxs=getByClass(oParent,'box');
    var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);//获取最后一张图片
    var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
    var height=document.body.clientHeight||document.documentElement.clientHeight;
    return (lastBoxH<scrollTop+height)?true:false;

}






