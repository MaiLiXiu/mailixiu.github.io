window.win_chess = [ ];
//点击开始按钮，游戏开始
$('.begin button').click(function beginGame(){
    $('.begin').css('display','none');
    begin_sumtime();
});

// 当窗口大小改变时，设置html的字体
function window_resize(){
    var width = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
    if(width>1000) width = Math.min(500, width);
    var font_size = width/20+'px';
    $('html').css('fontSize', font_size);
}
window_resize();
//计时运算

function begin_sumtime(){// 定义时间变化函数
    var total_time = 0;
    var total_min=0;
    var total_sec=0;
    var time_string;
    window.spend_time = setInterval(function(){ // 计时开始
        total_time+=1;
        total_min = parseInt(total_time/60);
        total_sec = total_time%60;
        if(total_min<10) total_min = '0'+total_min;
        if(total_sec<10) total_sec = '0'+total_sec;
        time_string = (total_min+':'+total_sec);
        $('.show-time').html(time_string);//显示时间变化
    },1000);//每隔一秒变化
     // 显示的时间串
}

//设置每个旗子位置
for( var i=0;i<19;i++){
    for(var j=0;j<19;j++){
        dom = $('<a></a>');
        var top_val=0.575+1*i+'rem'
        var left_val=0.575+1*j+'rem';
        dom.css('left',left_val);
        dom.css('top',top_val);
        $('.chess-wrap').append(dom)
    }
}
//旗子的交换点击
var turn='white';
$('a').click(function(){
    ding();
    var index = $('a').index(this);
    if($(this).hasClass('chess-white') || $(this).hasClass('chess-black')){return;}
    // 表示已于棋子时那一个位置不能再添加棋子
    else{
        if(turn=='white'){
          $(this).append('<img src="white.png">');
          $(this).addClass('chess-white');
          turn='black';
        }
        else{
            $(this).append('<img src="black.png">');
            $(this).addClass('chess-black');
            turn='white';
        }
        check(this, index);
        change_chess_pic(this);
    }
});
//显示旗子图片，表示哪种旗子需要出
$('.show-chess').append('<img src="white.png"/>')
function change_chess_pic(current_chess){
    if($(current_chess).hasClass('chess-white')){
        $('.show-chess img').attr('src', 'black.png');
    } else{
        $('.show-chess img').attr('src', 'white.png');
    }
}
//点击声音播放的函数
function ding(){
    $('.audio-ding').get(0).play();
}
//赢的时候声音播放的函数
function play_win(){
    $('.audio-win').get(0).play();
}

// 检查下完旗子后是否赢
function check(dom, index){
    window.win_chess = [];
    window.chess_class; // 当前添加的旗子的颜色class
    if($(dom).hasClass('chess-white')) window.chess_class = 'chess-white';
    else window.chess_class = 'chess-black';
    var count = 1;
    window.win_chess.push(index);//把当前点击那个棋子作为闪烁的第一个
    // 根据水平方向判断
    //防止刚好点到边缘位置 下标加减1有可能跑到不同行，所以增加 必须同一行条件
    var current_top = $(dom).css('top');
    do{
        // 先循环左侧的旗子
        for(var turn_left=1;turn_left<5;turn_left++){
            var i = index-turn_left;
            if($('a').eq(i).hasClass(window.chess_class)&&$('a').eq(i).css('top')==current_top){
                count+=1;
                window.win_chess.push(i);
            }else{
                break;
            }
        }
        // 如果相同的旗子数量小于5，则继续循环右侧的旗子
        if(count < 5){
            for(var turn_right=1;turn_right<=5;turn_right++){
                var i = index+turn_right;
                if($('a').eq(i).hasClass(window.chess_class)&&$('a').eq(i).css('top')==current_top){
                    count+=1;
                    window.win_chess.push(i);
                } else{
                    is_hoop=false;//同一条线是否还能找到相同棋子，找不到的话is_hoop为false，退出do-while循环，这一条线找不够了。
                    break;
                }
            }
        }
    }while(is_hoop && count<5)
    if(count>=5){
        clearInterval(spend_time);
        if($(dom).hasClass('chess-white')) win_game('White');
        else win_game('Black');
        return;
    }
    // 垂直方向
    is_hoop = true;
    count = 1;
    window.win_chess = [ ];  // 重置win_chess
    window.win_chess.push(index);//把当前点击那个棋子作为闪烁的第一个
    do{
        // 先循环上面的旗子
        for(var turn_left=1;turn_left<5;turn_left++){
            var i = index-19*turn_left;
            if($('a').eq(i).hasClass(window.chess_class)){
                count+=1;
                window.win_chess.push(i);
            }else{
                break;
            }
        }
        // 如果相同的旗子数量小于5，则继续循环下面的旗子
        if(count < 5){
            for(var turn_right=1;turn_right<=5;turn_right++){
                var i = index+19*turn_right;
                if($('a').eq(i).hasClass(window.chess_class)){
                    count+=1;
                    window.win_chess.push(i);
                } else{
                    is_hoop=false;
                    break;
                }
            }
        }
    }while(is_hoop && count<5)
    if(count>=5){
        clearInterval(spend_time);
        if($(dom).hasClass('chess-white')) win_game('White');
        else win_game('Black');
        return;
    }

    // 直线像 \方向
    is_hoop = true;
    count = 1;
    window.win_chess = [ ];
    window.win_chess.push(index);//把当前点击那个棋子作为闪烁的第一个
    do{
        // 先循环左上方的旗子
        for(var turn_left=1;turn_left<5;turn_left++){
            var i = index-20*turn_left;
            if($('a').eq(i).hasClass(window.chess_class)){
                count+=1;
                window.win_chess.push(i);
            }else{
                break;
            }
        }
        // 如果相同的旗子数量小于5，则继续循环右下方的旗子
        if(count < 5){
            for(var turn_right=1;turn_right<=5;turn_right++){
                var i = index+20*turn_right;
                if($('a').eq(i).hasClass(window.chess_class)){
                    count+=1;
                    window.win_chess.push(i);
                } else{
                    is_hoop=false;
                    break;
                }
            }
        }
    }while(is_hoop && count<5)
    if(count>=5){
        clearInterval(spend_time);
        if($(dom).hasClass('chess-white')) win_game('White');
        else win_game('Black');
        return;
    }

    // 直线像 / 方向
    is_hoop = true;
    count = 1;
    window.win_chess = [ ];
    window.win_chess.push(index);//把当前点击那个棋子作为闪烁的第一个
    do{
        // 先循环右上方的旗子
        for(var turn_left=1;turn_left<5;turn_left++){
            var i = index-18*turn_left;
            if($('a').eq(i).hasClass(window.chess_class)){
                count+=1;
                window.win_chess.push(i);
            }else{
                break;
            }
        }
        // 如果相同的旗子数量小于5，则继续循环左下方的旗子
        if(count < 5){
            for(var turn_right=1;turn_right<=5;turn_right++){
                var i = index+18*turn_right;
                if($('a').eq(i).hasClass(window.chess_class)){
                    count+=1;
                    window.win_chess.push(i);
                } else{
                    is_hoop=false;
                    break;
                }
            }
        }
    }while(is_hoop && count<5)
    if(count>=5){
        clearInterval(spend_time);
        if($(dom).hasClass('chess-white')) win_game('White');
        else win_game('Black');
        return;
    }
}

//一方赢了之后进行棋子闪烁并且提示
// win_type: White || Black
function win_game(win_type){
    play_win();
    var lighting_time = 0;
    var state='hidden';
    var timer = setInterval(function(){
        if(lighting_time<6){
            for(i in window.win_chess){
                $('a').eq(window.win_chess[i]).css('visibility',state);
                // console.log(r=win_chess[0])
            }
            if(state=='visible'){state='hidden';}
            else state='visible'; 
                lighting_time++;
        }else{
            window.clearInterval(timer);
            $('.win').css('display','block');
            if(win_type=='White') $('.warning').html('<span class="f-win">白子赢了!</span>');//提示内容
            else $('.warning').html('<span class="f-win">黑子赢了!</span>');
        }
    },300);
}
$('.again').click(function(){ //再来一局按钮点击事件
    $('.win').css('display','none');
    $('a').removeClass();
    $('a').empty();
    begin_sumtime();

});