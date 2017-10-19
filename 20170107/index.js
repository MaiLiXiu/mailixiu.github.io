$(window).resize(function(){
    LM.Public.resize_window();
});

LM.Home = {
    data: [{
        year: 1990,
        month: 1,
        day: 22,
        content: 'By me 的生日',
        bg_class: 'b-blue',
        font_class: 'c-blue'
    }, {
        year: 1993,
        month: 6,
        day: 12,
        content: '麦兜兜的生日',
        bg_class: 'b-red',
        font_class: 'c-red'
    }, {
        year: 2014,
        month: 1,
        day: 1,
        content: '距离我俩第一次牵手',
        bg_class: 'b-green',
        font_class: 'c-green'
    }, {
    year: 2014,
        month: 1,
        day: 7,
        content: '我俩已经在一起了',
        bg_class: 'b-green',
        font_class: 'c-green'
    }, {
        year: 2014,
        month: 3,
        day: 16,
        content: '距离我俩第一次接吻',
        bg_class: 'b-green',
        font_class: 'c-green'
    }, {
        year: 2016,
        month: 8,
        day: 4,
        content: '距离我俩第一次旅行',
        bg_class: 'b-green',
        font_class: 'c-green'
    }],

    init: function(){
        var ul_dom = $('#list_container');
        for(i in LM.Home.data){
            var data = LM.Home.data[i];
            var day;
            var second;
            if(i >= 2){
                second = new Date() - new Date(String.format('{0}-{1}-{2} 0:0:0', data.year, data.month, data.day));
                day = Math.floor(second/1000/60/60/24);
            }else{
                var this_date = new Date();
                var this_year = this_date.getFullYear();
                var this_month = this_date.getMonth()+1;
                var this_day = this_date.getDate();
                var target_year = this_year;
                if(this_month>=data.month && this_day>data.day) {
                    target_year = this_year+1;
                }
                second = new Date(String.format('{0}-{1}-{2} 0:0:0', target_year, data.month, data.day)) - new Date();
                day = Math.floor(second/1000/60/60/24);
                day += 1;  // 计算生日时加一天
            }
            ul_dom.append(String.format(''
                + '<li class="inline-container list-item">'
                    + '<a href="detail.html?year={2}&month={3}&day={1}&content={4}&days={6}">'
                        + '<div class="inline-item item-left {0}">'
                            + '<label>{1}</label>'
                            + '<span>{2}.{3}</span>'
                        + '</div>'
                        + '<div class="inline-item item-center">{4}</div>'
                        + '<div class="inline-item item-right"><span class="{5}">{6}</span>&nbsp;天{7}</div>'
                    + '</a>'
                + '</li>',
                data.bg_class,   // 0
                data.day,   // 1
                data.year,  // 2
                data.month,  // 3
                data.content,  //4
                data.font_class,  //5
                day,  //6
                (i<=1? '后' : '') // 7
            ));
        }
    }
};

LM.Detail = {
    init: function(){
        $('.back .top').html(window.url_params_content);
        $('.back .middle .days').html(window.url_params_days);
        $('.back .bottom span').html(String.format('{0}年{1}月{2}日', window.url_params_year, window.url_params_month, window.url_params_day));
        if(window.url_params_days>=1000) $('.back .middle .tian').addClass('r');
    }
};

String.format = function() {
    if( arguments.length == 0 ) return null;
    var str = arguments[0]; 
    for(var i=1;i<arguments.length;i++) {
        var re = new RegExp('\\{' + (i-1) + '\\}','gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};
