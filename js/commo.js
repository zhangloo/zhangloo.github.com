window.onload=function () {
    var oH=document.getElementById('head');
    var oHi=oH.children[2];
    var oPlay=document.getElementById('main_play');
    var oA=document.querySelector('.nav_right');
    var oN=document.querySelector('.nav');
    var oNa=oN.querySelector('.nav_right');
    var aNi=oNa.children;
    var oNs=document.querySelector('.nav_slider');
    var oAiot=document.getElementById('adio_t');
    // oH.style.width=document.documentElement.clientWidth+'px';
    oPlay.addEventListener('click',function () {
        if(oHi.className=='iconfont icon-pause'){
            oHi.className='iconfont icon-bofang';
            oAiot.pause();
        }else{
            oHi.className='iconfont icon-pause';
             oAiot.play();
        }
    },false);
    var str=' 姓 名 ： 张 龙 <br> 电 话 ： 1 3 1 2 1 8 5 2 4 4 5 <br> 专 业 ： 计 算 机 软 件 <br> 求 职 ： web 前 端';
    var arr=str.split(' ');
    var oP=document.getElementById('p_text');
    var oAio=document.getElementById('adio');

    for(var i=0 ;i<arr.length;i++){
            var oS=document.createElement('span');
            oS.innerHTML=arr[i];
        oP.appendChild(oS);
        if(oS.children.length==1){
            var oB=document.createElement('br');
            oP.appendChild(oB);
        }
    }
    var aS=oP.children;
    var count=0;
    var timer=setInterval(function () {
        count++;
        if(count>aS.length-1){
            clearInterval(timer);
            oAio.pause();
        }else {
            aS[count].style.opacity=1;
        }
    },100);
    function fnOver() {
        aNi[0].style.top='5px';
        aNi[2].style.bottom='5px';
    }
    function fnOut() {
        aNi[0].style.top='10px';
        aNi[2].style.bottom='10px';
    }
    oA.addEventListener('mouseover',fnOver,false);
    oA.addEventListener('mouseout',fnOut,false);
//点击菜单，菜单栏显示；
    oA.addEventListener('click',function () {
        oH.style.transform = 'translate(-260px)';
        oH.style.transition = '0.4s all ease';
        oNs.style.transform = 'translate(-260px)';
        oNs.style.transition = '0.4s all ease';
        oN.style.transform = 'translate(-260px)';
        aNi[0].style.transform = 'rotate(45deg)';
        aNi[1].style.display = 'none';
        oA.removeEventListener('mouseover',fnOver,false);
        aNi[2].style.transform = 'rotate(-45deg)';
        aNi[0].className= 'nav_right_t';
        aNi[2].className= 'nav_right_b';
        oN.style.transition = '0.4s all ease';
        oH.addEventListener('transitionend', fn0h, false);
    },false);
        function fnDoc() {
            oH.style.transform = 'translate(-0px)';
            oH.style.transition = '0.4s all ease';
            oNs.style.transform = 'translate(-0px)';
            oNs.style.transition = '0.4s all ease';
            oN.style.transform = 'translate(-0px)';
            oN.style.transition = '0.4s all ease';
            aNi[0].style.transform = 'rotate(0)';
            aNi[1].style.display = 'block';
            oA.addEventListener('mouseover',fnOver,false);
            aNi[2].style.transform = 'rotate(0)';
            oH.removeEventListener('transitionend', fn0h, false);
            document.removeEventListener('click', fnDoc, false);
        }
        function fn0h() {
            document.addEventListener('click', fnDoc, false);
        }
};