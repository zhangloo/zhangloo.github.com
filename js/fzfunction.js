/**
 * Created by asus on 2016/6/19.
 */
//随机数
function rnd(n,m){
    return parseInt(Math.random()*(m-n)+n);
}
//// 查看数字是否在数组里面----
function findInArr(n,arr) {
    for (var i = 0; i < arr.length; i++) {
        if (n == arr[i])   return true;
    }
    return false;
}
///补0函数----
function toDouble(n){
if(n<10){
    return '0' + n;
}else{
    return '' + n;
  } 
}
//获取生效后的样式(行间和非行间的样式都可以获取）
function getStyle(obj,name){
    if(obj.currentStyle){
        return (obj.currentStyle[name]);
    }else{
        return (getComputedStyle(obj,false)[name]);
    }
}
//运动
function move(obj,json,options) {
    options = options || {};
    options.duration=options.duration||1000;
    options.easing=options.easing||'ease-out';
    //总次数
    var count=Math.floor(options.duration/30);
    var start={};
    var dis={};
    for (var name in json){
        //初始值
        start[name]=parseFloat(getStyle(obj,name));
        //总距离
        dis[name]=json[name]-start[name];
    }
    var n=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        n++;
        for(var name in json){
            switch (options.easing){
                //匀速运动↓
                case 'linear':
                    var a=n/count;
                    var cur=start[name]+ dis[name]*a;
                    break;
                //加速运动↓
                case 'ease-in':
                    var a=n/count;
                    var cur=start[name]+ dis[name]*a*a*a;
                    break;
                //缓冲、减速运动↓
                case 'ease-out':
                    var a=1-n/count;
                    var cur=start[name]+ dis[name]*(1-a*a*a);
                    break;
            }
            if(name=='opacity'){
                obj.style[name]=cur;
                obj.style.filter='alpha(opacity:'+cur*100+')';
            }else{
                obj.style[name]=cur+'px';
            }

        }

        if(n>=count){
            clearInterval(obj.timer);
            options.complete && options.complete()
        }
    },30)
}
//封装设置样式函数；
function setStyle(){
    var obj=arguments[0];
    if(arguments.length==3){
        var name=arguments[1];
        var value=arguments[2];
        obj.style[name]=value;
    }else if(arguments.length==2){
        var json=arguments[1];
        for(name in json){
            obj.style[name]=json[name];
        }
    }
}
//如果不支持className，把带有目标className的标签弄到一个数组
function getByClass(oParent,sClass){
    if(oParent.getElementsByClassName){
        return oParent.getElementsByClassName(sClass);
    }else{
        var aEle = oParent.getElementsByTagName('*');
        var arr = [];
        for(var i = 0; i < aEle.length; i++){
            var tmp = aEle[i].className.split(' ');
            if(findInArr(sClass,tmp)){
                arr.push(aEle[i]);
            }
        }
        return arr;
    }
}
//物体距离定位父级左侧和顶部距离
function getPos(obj){
    var l = 0;
    var t = 0;
    while(obj){
        l+=obj.offsetLeft;
        t+=obj.offsetTop;
        obj = obj.offsetParent;
    }
    return {left:l, top:t};
}
// 事件绑定兼容函数封装
function addEvent(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv,fn,false);
    }else{
        obj.attachEvent('on'+sEv,fn)
    }
}
//时间解绑定函数封装
function removeEvent(obj,sEv,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(sEv,fn,false);
    }else{
        obj.detachEvent('on'+sEv,fn)
    }
}
// 滚轮事件封装
function addEvnet(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv,fn,false);
    }else{
        obj.attachEvent('on'+sEv,fn);
    }
}
function addWheel(obj,fn){
    function wheel(ev){
        var oEvent = ev || event;
        var bDown = true;
        bDown = oEvent.wheelDelta?oEvent.wheelDelta < 0:bDown = oEvent.detail > 0;
        fn && fn(bDown);
        oEvent.preventDefault && oEvent.preventDefault();
        return false;
    }
    if(window.navigator.userAgent.indexOf('Firefox') != -1){
        obj.addEventListener('DOMMouseScroll',wheel,false);
    }else{
        addEvnet(obj,'mousewheel',wheel);
    }
}
//封装拖拽
function drag(obj){
    obj.onmousedown = function(ev){
        var oEvent = ev || event;
        var disX = oEvent.clientX - obj.offsetLeft;
        var disY = oEvent.clientY - obj.offsetTop;
        document.onmousemove = function(ev){
            var oEvent = ev || event;
            var l = oEvent.clientX - disX;
            var t = oEvent.clientY - disY;
            obj.style.left = l + 'px';
            obj.style.top = t + 'px';
        };
        document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup = null;
            obj.releaseCapture && obj.releaseCapture();
        };
        obj.setCapture && obj.setCapture();
        return false;
    }
}
//domReady
function domReady(fn){
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded',function(){
            fn && fn();
        },false);
    }else{
        document.attachEvent('onreadystatechange',function(){
            if(document.readyState == 'complete'){
                fn && fn();
            }
        })
    }
}
//找最近的距离
function findNear(obj){
    var iMin=9999999999999;
    var iMinIndex=-1;
    for(var i=0;i<aLi.length;i++){
        if(obj==aLi[i])continue;
        if(collTest(obj,aLi[i])){
            var dis=getDis(obj,aLi[i]);
            if(dis<iMin){
                iMin=dis;
                iMinIndex=i;
            }
        }
    }
    if(iMinIndex==-1){
        return false;
    }else{
        return aLi[iMinIndex]
    }
}












