/*�ƶ�����*/
//rem������ڸ�Ԫ�ص������С��ֻ��Ҫ�ı�ÿ���豸�ĸ�Ԫ�������С����
//������
//640  86px 86px
//�������������ֻ�������ͼƬ��С���ܳ���86*86
//�������¹�������
//640/��Ԫ�������С  100px  0.86rem  1rem = 100px

~(function(desW){
    var winW = document.documentElement.clientWidth;
    var scale = winW/desW;
    var fs = 100;
    document.documentElement.style.fontSize = scale*fs+"px";
})(320);

/*��ʾ���ز˵�*/
~(function(){
   var $menu = $(".menu");
   var $nav = $(".nav");
    $menu.singleTap(function(){
        $nav.toggleClass("navTarget");
    })
})()

/*ģ����Ⱦ*/
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
        /*�����¼�ס֮ǰ�Ĳ���*/
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

            //���һ�ε�ǰ��������1
          $(this).addClass("other").html(parseInt($(this).html())+1);
            //���¼����±���
            pro();

            //�ѵ����Ԫ���Լ��Ƿ�����������
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
    //->��ȡURL��ַ���ʺź���Ĳ���ֵ��HASHֵ
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

    //->��ʽ��ʱ���ַ���
    function formatTime(template) {
        template = template || "{0}��{1}��{2}�� {3}ʱ{4}��{5}��";
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



