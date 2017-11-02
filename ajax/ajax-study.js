function init(){
    for(i=1;i<6;i++){
        var li = $('<li class="per-page page">'+i+'</li>');
        if(i == 1) li.addClass('b-red');
        $('.page-list').append(li);
    }
    $('.page-list').prepend('<li class="per-page" id="pre_page"><<</li>');
    $('.page-list').append('<li class="per-page" id="next_page">>></li>');
    $('li.per-page.page').click(function(){
        $(this).addClass('b-red').siblings('li').removeClass('b-red');
        var page = $(this).html();
        var type = $('li.click_top').attr('data-type');
        get_data(page,type);
    });
    $('.page-list li:first').click(function(){
        var current_page=$('.b-red').html()
        if(current_page==1) return;
        $('.per-page.page').eq(current_page-2).addClass('b-red').siblings('li').removeClass('b-red');
        var page=current_page-1;
        var type = $('li.click_top').attr('data-type');
        get_data(page,type);
    })
    $('.page-list li:last').click(function(){
        var current_page=$('.b-red').html()
        if(current_page==9) return;
        $('.per-page.page').eq(current_page).addClass('b-red').siblings('li').removeClass('b-red');
        var page=+current_page+1;
        var type = $('li.click_top').attr('data-type');
        get_data(page,type);
    })
    $('.top li').click(function(){
        $(this).addClass('click click_top').siblings('li').removeClass('click click_top');
    });
    $('.xian li').mouseover(function(){
        $(this).addClass('bgc_gray').siblings('li').removeClass('bgc_gray');
    });
    
    $(document).ready(function(){
         get_data(1);
    });
    function get_data(page, tab){
        tab = tab || '';
        $.get('https://cnodejs.org/api/v1/topics?tab='+tab+'&page='+page+'&limit=20', function(r){
            console.log(rr=r)
            $('.xian').empty();
            for(var i in r.data){
                var mins = new Date(r.data[i].last_reply_at).getTime();
                var current_mins = new Date().getTime();
                var span_hour = (current_mins-mins)/1000/60/60;
                var time_text;
                var label_class;  // 置顶、分享或者问答的span的class
                //相差的毫秒数再除，结果是多少小时
                if(span_hour>24){
                    time_text = parseInt(span_hour/24)+'天前';
                }else{
                    if(span_hour<1) time_text=parseInt(span_hour*60)+'分钟前';
                    else time_text =parseInt(span_hour)+'小时前';
                }
                if(r.data[i].top){
                    r.data[i].tab_cn = '置顶';
                    label_class = 'b-green';
                }else if(r.data[i].good){
                    r.data[i].tab_cn = '精华';
                    label_class = 'b-green';
                }else if(r.data[i].tab == 'ask'){
                    r.data[i].tab_cn = "问答";
                    label_class = 'b-999';
                }else{
                    r.data[i].tab_cn = '分享';
                    label_class = 'b-999';
                }
                var tabs=r.data[i].tab_cn;
                $('.xian').append(
                    '<li class="f-col">'
                        +'<div class="li_left">'
                            +'<span class="img_frame"><img src="'+r.data[i].author.avatar_url+'"></span>'
                            +'<div class="count">'
                                +'<span class="font_prev">'+r.data[i].reply_count+'</span>'
                                +'<span class="seperate">'+'/'+'</span>'
                                +'<span class="font_next">'+r.data[i].visit_count+'</span>'
                            +'</div>'
                        +'</div>'
                        +'<div class="li_center">'
                            +'<span class="click click_zhiding '+label_class+'" id="share" data-typename="'+r.data[i].tab_cn+'">'+r.data[i].tab_cn+'</span>'
                            +'<a href="r.data[i].content" class="font_center">'+r.data[i].title+'</a>'
                        +'</div>'
                        +'<div class="li_right">'
                            +'<span class="font_right">'+time_text+'</span>'
                        +'</div>'
                    +'</li>'
                );
                if(r.data[i].tab_cn=="置顶") $('.li_center a').css('color','#888');
            }
            // set_if_overflow();
            hide_if_same();
        });
    }

    function hide_if_same(){//去掉分享项里click_zhiding为分享的
        top_type = $('.click_top').attr('data-typename');
        $('.click_zhiding').each(function(){//取出类click_zhiding的每一项
            var share_type = $(this).attr('data-typename');
            if((share_type)=='精华') return;
            if(top_type==share_type) $(this).remove();
            if(top_type=="招聘"||top_type=="客户端测试") $(this).remove();
        })
    }

    $('.top li').click(function(){
        var type = $(this).attr('data-type');
        get_data(1,type);
        $('.per-page.page').eq(0).addClass('b-red').siblings('li').removeClass('b-red');
    });
    // 设置溢出用。。。表示
    function set_if_overflow(){
        $('.font_center').each(function(){
            var maxwidth=70;
            console.log(a=this)
            if($(this).text().length>maxwidth){
                var get_text=$(this).text().substring(0,maxwidth);
                $(this).text(get_text);
                $(this).html($(this).html()+'...');
            }
        });
    }
}