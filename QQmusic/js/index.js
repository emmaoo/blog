/*--REM处理-*/
(function(){
    var winW = document.documentElement.clientWidth,
        desW = 640,
        htmlFont = winW/desW*100;
    if(winW>=640){
        $('.musicBox').css({
            width:desW,
            margin:'0 auto'
        });
        window.htmlFont = 100;
        return;
    }
    window.htmlFont = htmlFont;
    document.documentElement.style.fontSize = htmlFont +'px';
})();

/*-Main-*/
(function(){
    var winH = document.documentElement.clientHeight,
        headerH = $('.header')[0].offsetHeight,
        footerH = $('.footer')[0].offsetHeight;
    $('.main').css('height',winH-headerH-footerH-htmlFont*.8);
})();

/*-RENDER-*/
var musicRender = (function(){
    var $musicPlan = $.Callbacks(),
        $lyric = $('.lyric'),
        $current = $('.current'),
        $duration = $('.duration'),
        $timeLineSpn =$('.timeLine>span');
    var musicAudio = $('#musicAudio')[0],
        $musicBtn = $('.musicBtn'),
        $musicBtnPlay = $musicBtn.eq(0),
        $musicBtnPause = $musicBtn.eq(1);
    var musicTimer = null,
        step=0;
    //数据绑定
    function formatTime(second){
        var minute = Math.floor(second/60);
        second = Math.floor(second - minute*60);
        minute<10?minute = '0'+minute:null;
        second<10?second = '0'+second:null;
        return minute +":"+second;
    }
    $musicPlan.add(function(data){
        var str = '';
        $.each(data,function(index,item){
            str+=`<p data-minute="${item.minute}" data-second="${item.second}" id="lyric${item.id}">${item.content}</p>`;
        });
        $lyric.html(str);

    });

    //控制音频自动播放
    $musicPlan.add(function(data){
        musicAudio.play();
        musicAudio.addEventListener('canplay',function(){
            $duration.html(formatTime(musicAudio.duration));
            $musicBtnPlay.css('display','none');
            $musicBtnPause.css('display','block');
        })
    });

    //控制播放和暂停
    $musicPlan.add(function(){
        $musicBtn.tap(function(){
            if(musicAudio.pause){
                musicAudio.play();
                $musicBtnPlay.css('display','none');
                $musicBtnPause.css('display','block');
            }else{
                musicAudio.pause();
                $musicBtnPlay.css('display','block');
                $musicBtnPause.css('display','none');
            }
        })
    })

    $musicPlan.add(function(){
        musicTimer = window.setInterval(function(){
            if(musicAudio.currentTime>=musicAudio.duration){
                window.clearInterval(musicTimer);
            }
            var time = formatTime(musicAudio.currentTime),
                minute = time.split(':')[0],
                second = time.split(':')[1];
            $current.html(time);
            $timeLineSpn.css('width',(musicAudio.currentTime/musicAudio.duration)*100+'%');

            //控制歌词对应
            var $lyricList = $('.lyric').children('p'),
                $tar = $lyricList.filter('[data-minute="'+minute+'"]').filter('[data-second="'+second+'"]').addClass('bg').siblings().removeClass('bg');
            var n = $tar.index();
            if(n>=3){
                $lyric.css('top',-.84*(n-2)+'rem');
            }


        },1000)
    })
    return{
        init:function(){
            $.ajax({
                url:'lyric.json',
                type:'GET',
                dateType:'json',
                cache:false,
                success:function(result){
                    if(result){
                        result = result.lyric||'';
                        result = result.replace(/&#(\d+);/g,function(){
                            var num = Number(arguments[1]);
                            var val = arguments[0];
                            switch (num){
                                case 32:
                                    val = ' ';
                                    break;
                                case 40:
                                    val = '(';
                                    break;
                                case 41:
                                    val = ')';
                                    break;
                                case 45:
                                    val = '-';
                                    break;
                            }
                            return val
                        });
                        //捕获我们需要的数据
                        var data = [];
                        var reg = /\[(\d+)&#58;(\d+)&#46;(?:\d+)\]([^#&]+)(?:&#10)/g;
                        var index = 0;
                        result.replace(reg,function(){
                            data.push({
                                id:++index,
                                minute:arguments[1],
                                second:arguments[2],
                                content:arguments[3]
                            })
                        })
                        $musicPlan.fire(data);
                    }
                }
            })
        }
    }
})();
musicRender.init();