/*移动适配*/
//rem是相对于根元素的字体大小，只需要改变每个设备的根元素字体大小即可
//参照物
//640  86px 86px
//下面所有其他手机上这张图片大小不能超过86*86
//按照如下规则缩放
//640/根元素字体大小  100px  0.86rem  1rem = 100px

~(function(desW){
    var winW = document.documentElement.clientWidth;
    var scale = winW/desW;
    var fs = 100;
    document.documentElement.style.fontSize = scale*fs+"px";
})(320);

/*显示隐藏菜单*/
~(function(){
   var $menu = $(".menu");
   var $nav = $(".nav");
    $menu.singleTap(function(){
        $nav.toggleClass("navTarget");
    })
})()

/*模板渲染*/
~(function(){

    $.ajax({
        url:"http://matchweb.sports.qq.com/html/matchDetail?mid=100002:2365",
        type:"get",
        dataType:"jsonp",
        success:function(data){
           if(data&&data[0]==0){
               data = data[1];
               bindHtml(data);
               window.setTimeout(function(){
                   bindEvent();
               },500)
           }
        }
    })

    function bindHtml(data){
        $match = $(".match");
        var res = ejs.render($("#matchTemp").html(),{data:data});
        $match.html(res);
    }

    function bindEvent(){
        var $bot = $(".bot");
        var $botLeft = $(".bot>.left");
        var $botRight = $(".bot>.right");
        var $progress = $(".progress");
        pro();
        function pro(){
            var total = parseInt($botLeft.html())+parseInt($botRight.html());
            var percentage = parseInt($botLeft.html())/total;
            $progress.css("width",percentage*100+"%");
        }
        /*设置下记住之前的操作*/
        var obj = JSON.parse(localStorage.getItem("support"));
        if(obj&&obj.isTap=="true"){
            if(obj.support==1){
                $botLeft.addClass("other");
            }else{
                $botRight.addClass("other");
            }
            return;
        }

        $botLeft.singleTap(fn);
        $botRight.singleTap(fn);
        function fn(){

            if($bot.attr("isTap")) return;

            //点击一次当前数据增加1
          $(this).addClass("other").html(parseInt($(this).html())+1);
            //重新计算下比例
            pro();

            //把点击的元素以及是否点击过保存下
            $bot.attr("isTap",true);
            var support = $(this).hasClass("left")?1:2;
            var isTap = "true";
            var obj = {
                support:support,
                isTap :"true"
            }
            localStorage.setItem("support",JSON.stringify(obj));

        }


    }



})();

~function (pro) {
    //->获取URL地址栏问号后面的参数值及HASH值
    function queryURLParameter() {
        var obj = {},
            reg = /([^?=&#]+)=([^?=&#]+)/g;
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        reg = /#([^?=&#]+)/;
        if (reg.test(this)) {
            obj["hash"] = reg.exec(this)[1];
        }
        return obj;
    }

    //->格式化时间字符串
    function formatTime(template) {
        template = template || "{0}年{1}月{2}日 {3}时{4}分{5}秒";
        var _this = this,
            ary = _this.match(/\d+/g);  //->[2016,05,19]
        template = template.replace(/\{(\d+)\}/g, function () {
            var val = ary[arguments[1]];
            typeof val === "undefined" ? val = 0 : null;
            val = val.length < 2 ? "0" + val : val;
            return val;
        });
        return template;
    }
    pro.queryURLParameter = queryURLParameter;
    pro.formatTime = formatTime;
}(String.prototype);



