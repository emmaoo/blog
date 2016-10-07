var render=(function(){
    /*----------------------------二维码下载------------------------------------*/
    function showCode(id){
        var oShow=document.getElementById(id);
        var oDiv=oShow.getElementsByTagName('div')[0];
        var oLittle=oShow.getElementsByTagName('i')[2];
        oShow.onmouseover=function(){
            oDiv.style.display='block';
            oLittle.style.display='block';
        }
        oShow.onmouseout=function(){
            oDiv.style.display='none';
            oLittle.style.display='none';
        }
    }
    /*-----------------------------购物车--------------------------------------------*/
    function showList(id1,id2){
        var oShopping_cart=document.getElementById(id1);
        var oList=document.getElementById(id2);
        oShopping_cart.onmouseenter=function(){
            oList.style.display='block';
        }
        oShopping_cart.onmouseleave=function(){
            oList.style.display='none';
        }
    }
    /*-------------------------------滚动搜索显示隐藏-----------------------------------------*/
    function getSearch(){
        var oSearch_box=document.getElementById('search_box');
        var oHead_logo=document.getElementById('head_logo');
        var head_search_one=document.getElementById('head_search_one');
        var oA=head_search_one.getElementsByTagName('a')[0];
        var toTopSearch=document.getElementById('toTopSearch');
        function show(){
            oA.style.background='url("img/head.png") -95px -45px';
            oSearch_box.style.display='block';
            oHead_logo.style.display='none';
        }
        function hide(){
            oA.style.background='url("img/head.png") -75px -45px';
            oSearch_box.style.display='none';
            oHead_logo.style.display='block';
        }
        oSearch_box.style.display='none';
        head_search_one.onclick=function(){
            if(oSearch_box.style.display=='none'){
                show();
            }else{
                hide();
            }
        }
        toTopSearch.onclick=function(){
            if(oSearch_box.style.display=='none'){
                show();
            }else{
                hide();
            }
        }
    }
    /*------------------------------------搜索--------------------------------------------*/

    function search(id1,id2,id3,id4,id5,id6) {
        var oforSearch = document.getElementById(id1);
        var otoSearch = document.getElementById(id2);
        var oStrong = otoSearch.getElementsByTagName('strong')[0];
        var otoSearch_list = document.getElementById(id3);
        var oUl = otoSearch_list.getElementsByTagName('ul')[0];
        var aLi = oUl.getElementsByTagName('li');
        var oSearch_inner = document.getElementById(id4);
        var oSearch_to_find = document.getElementById(id5);
        var aList = oSearch_to_find.getElementsByTagName('li');
        var oSpan=oSearch_to_find.getElementsByTagName('span')[0];
        var oI1 = oforSearch.getElementsByTagName('i')[0];
        var oI2 = oforSearch.getElementsByTagName('i')[1];
        var oSearchAll=document.getElementById(id6);
        var ol=oSearchAll.getElementsByTagName('li')[0];
        var oldValue = null;
        var n=-1;
        function searchFor() {
            window.open('http://search.mtime.com/search/?q=' + oSearch_inner.value + '&t=0', '_self');
            oSearch_inner.value = '';
        }
        searchChangeColor();
        function searchChangeColor(){
            oforSearch.onmouseover = oforSearch.onmousedown = function () {
                this.style.background = '#2d7dd7';
                oI1.style.display = 'none';
                oI2.style.display = 'block';
            };
            oforSearch.onmouseout = oforSearch.onmouseup = function () {
                this.style.background = '';
                oI1.style.display = 'block';
                oI2.style.display = 'none';
            };
        }
        otoSearch.onmouseover = function () {
            otoSearch_list.style.display = 'block';
        };
        otoSearch.onmouseout = function () {
            otoSearch_list.style.display = 'none';
        };
        oforSearch.onclick=function(){
            searchFor();
        }
        pullList();
        function pullList(){
            for (var i = 0; i < aLi.length; i++) {
                (function (index) {
                    aLi[i].onclick = function () {
                        oStrong.innerHTML = aLi[index].innerHTML;
                        if (index == 0) {
                            oSearch_inner.placeholder = '迷失东京';
                        } else if (index == 4) {
                            oSearch_inner.placeholder = '请按名称、电影、品牌等搜索商品';
                        } else {
                            oSearch_inner.placeholder = '请输入' + aLi[index].innerHTML + '关键词';
                        }

                    }
                })(i)
            }
        }
        handleClick();
        function handleClick(e) {
            document.body.onclick = function (e) {
                e = e || window.event;
                e.target = e.target || e.srcElement;
                if (e.target.id == 'search_inner') {
                    if (oSearch_to_find.style.display == 'none') {
                        oSearch_to_find.style.display = 'block';
                    }
                    return;
                }
                if (e.target.id == 'search_to_find') {
                    oSearch_to_find.style.display = 'block';
                    return;
                }
                oSearch_to_find.style.display = 'none';
                oSearchAll.style.display='none';
                for(var i=0;i<aLi.length;i++){
                    var str=oStrong.innerHTML;
                    if(str==aLi[i].innerHTML){
                        if (i == 0) {
                            oSearch_inner.placeholder = '迷失东京';
                        } else if (i == 4) {
                            oSearch_inner.placeholder = '请按名称、电影、品牌等搜索商品';
                        } else {
                            oSearch_inner.placeholder = '请输入' + aLi[i].innerHTML + '关键词';
                        }
                    }
                }
            }
        }
        for(var i=1;i<aList.length;i++){
            (function(index){
                aList[i].onclick=function(){
                    oSearch_inner.value=aList[index].innerHTML;
                }
            })(i)
        }
        changeColor();
        function changeColor(){
            for(var i=0;i<aList.length;i++){
                (function(index){
                    aList[i].onmouseover=function(){
                        this.style.background='#e5f2fc';
                        this.style.color='#2d7dd7';
                    };
                    aList[i].onmouseout=function(){
                        this.style.background='';
                        this.style.color='#333';
                    }
                })(i)
            }

        }
        oSearch_inner.onkeydown=function(e){
            e=e||window.event;
            searchChangeColor=null;
            if(e.keyCode==40){
                n++;
                if(n>=aList.length){
                    n=0;
                }
                list();
            };
            if(e.keyCode==38){
                n--;
                if(n<=-1){
                    n=aList.length-1;
                }
                list();
            }
            if(e.keyCode==13 && n!==0){
                searchFor();
            }
            //searchAll();
        }
        function list(){
            for(var i=0;i<aList.length;i++){
                aList[i].style.background='';
                aList[i].style.color='#333';
            }
            aList[n].style.background='#e5f2fc';
            aList[n].style.color='#2d7dd7'
        }
        oSearch_inner.onkeyup=searchAll;
        function searchAll(){
            var str=oSearch_inner.value;
            if(str){
                oSearch_to_find.style.display = 'none';
                oSearchAll.style.display='block';
                ol.innerHTML='查看全部"'+str+'"的搜索结果<i></i>';
            }else{
                ol.innerHTML='查看全部"'+''+'"的搜索结果<i></i>';
                oSearchAll.style.display='none';
            }
        }
        oSearch_inner.onfocus=function(){
            searchChangeColor=null;
            oforSearch.style.background = '#2d7dd7';
            oI1.style.display = 'none';
            oI2.style.display = 'block';
            oSearch_inner.placeholder ='';
        }
    }
    /*---------------------------遮盖层---------------------------------*/
    function cover(){
        var oBox=document.getElementById('scrollImg');
        var aCovered=utils.getByClass(oBox,'price_cover_box');
        var aCover=utils.getByClass(oBox,'cover');
        for(var i=0;i<aCovered.length;i++){
            (function(index){
                aCovered[index].onmouseover=function(){
                    animate(aCover[index],{top:0},300,2);
                }
                aCovered[index].onmouseout=function(){
                    animate(aCover[index],{top:-190},500,2);
                }
            })(i)
        }

    }

    /*----------------------------------------轮播---------------------------------------*/

//banner('mainCom','combtn_left','combtn_right','div');
    function banner(id1,id2,id3){
        var oBox=document.getElementById(id1);
        var oBoxInner=oBox.getElementsByTagName('div')[0];
        var aDiv=oBoxInner.getElementsByTagName('div');
        var aImg=oBoxInner.getElementsByTagName('img');
        var oUl=oBox.getElementsByTagName('ul')[0];
        var aLi=oUl.getElementsByTagName('li');
        var oBtnLeft=document.getElementById(id2);
        var oBtnRight=document.getElementById(id3);
        var step=0;
        var timer=null;
        lazyImg();
        function lazyImg(){
            for(var i=0; i<aImg.length; i++){
                (function(index){
                    var tmpImg=new Image;
                    tmpImg.src=aImg[index].getAttribute('realImg');
                    tmpImg.onload=function(){
                        aImg[index].src=this.src;
                        var oDiv1=aDiv[0];
                        utils.css(oDiv1,'zIndex',1);
                        animate(oDiv1,{opacity:1},500)
                    }
                })(i);
            }
        }
        clearInterval(timer);
        timer=setInterval(autoMove,2000)
        function autoMove(){
            if(step>=aDiv.length-1){
                step=-1;
            }
            step++;
            setBanner();
        }
        function setBanner(){
            for(var i=0; i<aDiv.length; i++){
                if(i===step){
                    utils.css(aDiv[i],'zIndex',1);
                    animate(aDiv[i],{opacity:1},500,function(){
                        var siblings=utils.siblings(this);
                        for(var i=0; i<siblings.length; i++){
                            animate(siblings[i],{opacity:0});
                        }
                    })
                    continue;
                }
                utils.css(aDiv[i],'zIndex',0)
            }
            bannerTip();
        }

        //焦点自动轮播
        function bannerTip(){
            for(var i=0; i<aLi.length; i++){
                aLi[i].className=i===step?'on':null;
            }
        }
        //鼠标移入停止，移出继续
        oBox.onmouseover=function(){
            clearInterval(timer);
        };
        oBox.onmouseout=function(){
            timer=setInterval(autoMove,2000);
        };
        //点击焦点手动切换
        handleChange();
        function handleChange(){
            for(var i=0; i<aLi.length; i++){
                aLi[i].index=i;
                aLi[i].onclick=function(){
                    step=this.index;
                    setBanner();
                }
            }
        }
        //点击按钮左右切换
        oBtnRight.onclick=autoMove;
        oBtnLeft.onclick=function(){
            if(step<=0){
                step=aLi.length;
            }
            step--;
            setBanner();
        }
    }

    /*----------------------------------售票区----------------------------------------------*/

    function moveLeft(){
        //var oDiv=document.getElementById('showing');
        var oBoxinner=document.getElementById('scrollImg');
        var oBtnRight=document.getElementById('icon_btnR');
        var oBtnLeft=document.getElementById('icon_btnL');
        oBtnRight.onclick=function(){
            animate(oBoxinner,{left:-696},1000,0);
            oBtnLeft.style.display='block';
            oBtnRight.style.display='none';

        };
        oBtnLeft.onclick=function(){
            animate(oBoxinner,{left:0},1000,0);
            oBtnLeft.style.display='none';
            oBtnRight.style.display='block';

        }
    }

    /*--------------------------------选项卡------------------------------------------*/

    function changeCars(id1,id2,tagName1,tagName2,className){
        var oTicket=document.getElementById(id1);
        var oMovie_ticket=document.getElementById(id2);
        var aSpan=oMovie_ticket.getElementsByTagName(tagName1);
        var aDiv=utils.getByClass(oTicket,tagName2);
        for(var i=0;i<aSpan.length;i++){
            (function(index){
                aDiv[0].style.display='block';
                aSpan[index].onmouseover=function(){
                    for(var i=0;i<aSpan.length;i++){
                        aSpan[i].className='';
                        aDiv[i].style.display='none';
                    }
                    aSpan[index].className=className;
                    aDiv[index].style.display='block';
                }
            })(i)
        }
    }

    /*--------------------------售票价格---------------------------------*/
    function move(){
        var oBoxInner=document.getElementById('scrollshow');
        var oBorderL=document.getElementById('LBorder');
        var oBorderR=document.getElementById('RBorder');
        var osellBtnL=document.getElementById('sellBtnL');
        var osellBtnR=document.getElementById('sellBtnR');
        var step=0;
        var duration=1220;
        osellBtnR.onclick=function(){
            step++;
            if(step>=2){
                oBorderR.style.display='none';
                osellBtnR.style.display='none';
                animate(oBoxInner,{left:-step*duration},700,0);
                return;
            }
            oBorderL.style.display='block';
            osellBtnL.style.display='block';
            animate(oBoxInner,{left:-step*duration},700,0);
        }
        osellBtnL.onclick=function(){
            step--;
            if(step<=0){
                oBorderL.style.display='none';
                osellBtnL.style.display='none';
                animate(oBoxInner,{left:-step*duration},700,0);
                return;
            }
            oBorderR.style.display='block';
            osellBtnR.style.display='block';
            animate(oBoxInner,{left:-step*duration},700,0);
        }
    }
    /*----------------------------------------------------*/

    function banner1(id1,id2,id3){
        var oBox=document.getElementById(id1);
        var oBoxInner=oBox.getElementsByTagName('div')[0];
        var aDiv=utils.getByClass(oBoxInner,'comInner_floor')
        var oUl=oBox.getElementsByTagName('ul')[0];
        var aLi=oUl.getElementsByTagName('li');
        var oBtnLeft=document.getElementById(id2);
        var oBtnRight=document.getElementById(id3);
        var step=0;
        var timer=null;
        var oDiv1=aDiv[0];
        utils.css(oDiv1,'zIndex',1);
        animate(oDiv1,{opacity:1},700,2)
        clearInterval(timer);
        timer=setInterval(autoMove,4000)
        function autoMove(){
            if(step>=aDiv.length-1){
                step=-1;
            }
            step++;
            setBanner();
        }
        function setBanner(){
            for(var i=0; i<aDiv.length; i++){
                if(i===step){
                    utils.css(aDiv[i],'zIndex',1);
                    animate(aDiv[i],{opacity:1},700,function(){
                        var siblings=utils.siblings(this);
                        for(var i=0; i<siblings.length; i++){
                            animate(siblings[i],{opacity:0},100,2);
                        }
                    })
                    continue;
                }
                utils.css(aDiv[i],'zIndex',0)
            }
            bannerTip();
        }

        //焦点自动轮播
        function bannerTip(){
            for(var i=0; i<aLi.length; i++){
                aLi[i].className=i===step?'on':null;
            }
        }
        //鼠标移入停止，移出继续
        oBox.onmouseover=function(){
            clearInterval(timer);
        };
        oBox.onmouseout=function(){
            timer=setInterval(autoMove,4000);
        };
        //点击焦点手动切换
        handleChange();
        function handleChange(){
            for(var i=0; i<aLi.length; i++){
                aLi[i].index=i;
                aLi[i].onclick=function(){
                    step=this.index;
                    setBanner();
                }
            }
        }
        //点击按钮左右切换
        oBtnRight.onclick=autoMove;
        oBtnLeft.onclick=function(){
            if(step<=0){
                step=aLi.length;
            }
            step--;
            setBanner();
        }
    }

    return{
        init:function(){
            showCode('head_onload');
            showCode('head_onload1');
            showList('shopping_cart','list');
            showList('shopping_cart1','list1');
            search('forSearch','toSearch','toSearch_list','search_inner','search_to_find','searchAll');
            //search('forSearch1','toSearch1','toSearch_list1','search_inner1','search_to_find1','searchAll1');
            getSearch();
            cover();
            banner('body_banner','btn1','btn2');
            moveLeft();
            changeCars('ticket','movie_ticket','span','ticketNum','cur');
            changeCars('sellsection','sellhead','dd','sellmain','curs');
            move();
            banner1('mainCom','combtn_left','combtn_right');
            /*------------------------导航栏固定---------------------------*/
            window.onscroll=function(){
                var oHeader_nav1=document.getElementById('header_nav1');
                var oLittle=document.getElementById('little');
                var otoTophover=document.getElementById('toTophover');
                var scrollH=utils.win('scrollTop');
                var timer=null;
                if(scrollH>=215){
                    oHeader_nav1.style.display='block';
                    oHeader_nav1.style.zIndex='10';
                    oLittle.style.display='none';
                }else{
                    oHeader_nav1.style.display='none';
                    oLittle.style.display='block';
                }
                otoTophover.onclick=function(){
                    var duration=1000;
                    var interval=40;
                    var step=scrollH/duration*interval;
                    clearInterval(timer);
                    timer=setInterval(function(){
                        var curTop=utils.win('scrollTop');
                        if(curTop<=0){
                            clearInterval(timer);
                            return;
                        }
                        curTop-=step;
                        utils.win('scrollTop',curTop);
                    },interval)
                }
            }
        }
    }
})()
render.init();