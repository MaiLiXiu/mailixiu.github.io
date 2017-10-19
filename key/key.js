$(document).ready(function(){
    init();
    show();
    begin_sumtime();
    set_study();
    window.this_key_index = 0;  // 当前按键下标，即按哪个
    show_five_keys();  // 显示接下来要输入的5个按键
});

String = {
    format: function(){
        if(0==arguments.length) return null;
        for(var t=arguments[0],e=1;e<arguments.length;e++){
            var n=new RegExp("\\{"+(e-1)+"\\}","gm");
            t = t.replace(n,arguments[e]);
        }
        return t;
    }
};

window.keys = [{
    line: 1,
    key_type: '1',
    top_text: '~',
    bottom_text: '`',
    key_color:'p'
},{
    line: 1,
    key_type: '1',
    top_text: '!',
    bottom_text: '1',
    key_color:'p'
},{
    line: 1,
    key_type: '1',
    top_text: '@',
    bottom_text: '2',
    key_color:'b'
},{
    line: 1,
    key_type: '1',
    top_text: '#',
    bottom_text: '3',
    key_color:'p'
},{
    line: 1,
    key_type: '1',
    top_text: '$',
    bottom_text: '4',
    key_color:'b'
},{
    line: 1,
    key_type: '1',
    top_text: '%',
    bottom_text: '5',
    key_color:'b'
},{
    line: 1,
    key_type: '1',
    top_text:'^',
    bottom_text: '6',
    key_color:'b'
},{
    line: 1,
    key_type: '1',
    top_text: '&',
    bottom_text: '7',
    key_color:'b'
},{
    line: 1,
    key_type: '1',
    top_text: '*',
    bottom_text: '8',
    key_color:'p'
},{
    line: 1,
    key_type: '1',
    top_text: '(',
    bottom_text: '9',
    key_color:'b'
},{
    line: 1,
    key_type: '1',
    top_text: ')',
    bottom_text: '0',
    key_color:'p'
},{
    line: 1,
    key_type: '1',
    top_text: '-',
    bottom_text: '-',
    key_color:'p'
},{
    line: 1,
    key_type: '1',
    top_text: '+',
    bottom_text: '=',
    key_color:'p'
},{
    line: 1,
    key_type: '4',
    top_text: '←',
    bottom_text: 'Backspace',
    key_color:'p'
},{
    line: 2,
    key_type: '2',
    top_text: 'Tab↔',
    bottom_text:'',
    key_color:'p'
},{
    line: 2,
    key_type: '1',
    top_text: 'Q',
    bottom_text:'',
    key_color:'p'
},{
    line: 2,
    key_type: '1',
    top_text: 'W',
    bottom_text:'',
    key_color:'b'
},{
    line: 2,
    key_type: '1',
    top_text: 'E',
    bottom_text:'',
    key_color:'p'
},{
    line: 2,
    key_type: '1',
    top_text: 'R',
    bottom_text:'',
    key_color:'b'
},{
    line: 2,
    key_type: '1',
    top_text: 'T',
    bottom_text:'',
    key_color:'b'
},{
    line: 2,
    key_type: '1',
    top_text: 'Y',
    bottom_text:'',
    key_color:'b'
},{
    line: 2,
    key_type: '1',
    top_text: 'U',
    bottom_text:'',
    key_color:'b'
},{
    line: 2,
    key_type: '1',
    top_text: 'I',
    bottom_text:'',
    key_color:'p'
},{
    line: 2,
    key_type: '1',
    top_text: 'O',
    bottom_text:'',
    key_color:'b'
},{
    line: 2,
    key_type: '1',
    top_text: 'P',
    bottom_text:'',
    key_color:'p'
},{
    line: 2,
    key_type: '1',
    top_text: '{',
    bottom_text:'[',
    key_color:'p'
},{
    line: 2,
    key_type: '1',
    top_text: '}',
    bottom_text:']',
    key_color:'p'
},{
    line: 2,
    key_type: '2',
    top_text: '|',
    bottom_text:'\\',
    key_color:'p'
},{
    line: 3,
    key_type: '3',
    top_text: 'caps Lock',
    bottom_text:'',
    key_color:'p'
},{
    line: 3,
    key_type: '1',
    top_text: 'A',
    bottom_text:'',
    key_color:'p'
},{
    line: 3,
    key_type: '1',
    top_text: 'S',
    bottom_text:'',
    key_color:'b'
},{
    line: 3,
    key_type: '1',
    top_text: 'D',
    bottom_text:'',
    key_color:'p'
},{
    line: 3,
    key_type: '1',
    top_text: 'F',
    bottom_text:'',
    key_color:'b'
},{
    line: 3,
    key_type: '1',
    top_text: 'G',
    bottom_text:'',
    key_color:'b'
},{
    line: 3,
    key_type: '1',
    top_text: 'H',
    bottom_text:'',
    key_color:'b'
},{
    line: 3,
    key_type: '1',
    top_text: 'J',
    bottom_text:'',
    key_color:'b'
},{
    line: 3,
    key_type: '1',
    top_text: 'K',
    bottom_text:'',
    key_color:'p'
},{
    line: 3,
    key_type: '1',
    top_text: 'L',
    bottom_text:'',
    key_color:'b'
},{
    line: 3,
    key_type: '1',
    top_text: ':',
    bottom_text:';',
    key_color:'p'
},{
    line: 3,
    key_type: '1',
    top_text: '"',
    bottom_text:'\'',
    key_color:'p'
},{
    line: 3,
    key_type: 'enter',
    top_text: 'Enter',
    key_color:'p',
    bottom_text:'',
    is_single_line: true  // 标识按键里的text是否只有一行
},{
    line: 4,
    key_type: '5',
    top_text: '↑ Shift',
    bottom_text:'',
    is_single_line: true, // 标识按键里的text是否只有一行
    key_color:'p'
},{
    line: 4,
    key_type: '1',
    top_text: 'Z',
    bottom_text:'',
    key_color:'p'
},{
    line: 4,
    key_type: '1',
    top_text: 'X',
    bottom_text:'',
    key_color:'b'
},{
    line: 4,
    key_type: '1',
    top_text: 'C',
    bottom_text:'',
    key_color:'p'
},{
    line: 4,
    key_type: '1',
    top_text: 'V',
    bottom_text:'',
    key_color:'p'
},{
    line: 4,
    key_type: '1',
    top_text: 'B',
    bottom_text:'',
    key_color:'b'
},{
    line: 4,
    key_type: '1',
    top_text: 'N',
    bottom_text:'',
    key_color:'b'
},{
    line: 4,
    key_type: '1',
    top_text: 'M',
    bottom_text:'',
    key_color:'b'
},{
    line: 4,
    key_type: '1',
    top_text: '<',
    bottom_text:',',
    key_color:'b'
},{
    line: 4,
    key_type: '1',
    top_text: '>',
    bottom_text:'.',
    key_color:'p'
},{
    line: 4,
    key_type: '1',
    top_text: '?',
    bottom_text:'/',
    key_color:'b'
},{
    line: 4,
    key_type: '5',
    top_text: '↑ Shift',
    is_single_line:true,
    bottom_text:'',
    key_color:'p'
},{
    line: 5,
    key_type: '3',
    top_text: 'Ctrl',
    bottom_text:'',
    is_single_line:true,
    key_color:'p'
},{
    line: 5,
    key_type: '1',
    top_text: '&#xe6be;',
    icon:true,
    bottom_text:'',
    is_single_line:true,
    key_color:'p'
},{
    line: 5,
    key_type: '1',
    top_text: 'Alt',
    bottom_text:'',
    is_single_line:true,
    key_color:'b'
},{
    line: 5,
    key_type: '6',
    top_text: '',
    bottom_text:'',
    key_color:'b',
    is_single_line:true
},{
    line: 5,
    key_type: '1',
    top_text: 'Alt',
    bottom_text:'',
    is_single_line:true,
    key_color:'b'
},{
    line: 5,
    key_type: '1',
    top_text: '&#xe6be;',
    icon:true,
    bottom_text:'',
    is_single_line:true,
    key_color:'p'
},{
    line: 5,
    key_type: '1',
    icon:true,
    top_text: '&#xe618;',
    bottom_text:'',
    is_single_line:true,
    key_color:'p'
},{
    line: 5,
    key_type: '3',
    top_text: 'Ctrl',
    bottom_text:'',
    is_single_line:true,
    key_color:'p'
}];

// 初始化键盘 -- 显示出来
function init(){
    var this_line;  // 表示当前渲染到第几行
    var line_wrap_dom;  // 每行最外层的包裹所有按键的dom
    var key_class; // 每个按键附件的class
    for(i in window.keys){
        var k = window.keys[i];
        // 如果this_line与当前按键的行数不一样时，则换行
        if(this_line != k.line){
            // 换行后，把上一行的所有按键加入到key-wrap
            key_class = 'g-ml0';//换行开始 每一行第一个key都不需要margin-left
            this_line = k.line;
            line_wrap_dom = $('<div class="key-col"></div>');//一行的数据
            if(line_wrap_dom) $('.key-wrap').append(line_wrap_dom);//数据满一行时才显示
        }else{
            key_class = '';
        }
        var text_doms;
        if(k.is_single_line) {
            text_doms = String.format('<label class="key-font one-li">{0}</label>', k.top_text);
            if(k.icon) text_doms=String.format('<label class="key-font one-li iconfont">{0}</label>', k.top_text);
        } else {
            text_doms = String.format(''
                + '<label class="key-font font-top">{0}</label>'
                + '<label class="key-font font-bottom">{1}</label>'
            , k.top_text, k.bottom_text);
        }

        line_wrap_dom.append(String.format(''
            + '<a class="key-{1} {0}">'
                + '<span class="key-left {2}"></span>'
                + '<span class="key-{1}-right {2}"></span>'
                + '{3}'
            + '</a>', key_class, k.key_type, k.key_color, text_doms
        ));
        // 循环完最后一个后，则把最后一行加入到key-wrap
        if(i == (window.keys.length-1)) $('.key-wrap').append(line_wrap_dom);
    }
}

function show(){
    for(var i=0;i<5;i++){
        $('.show-key').append(window.key_doms)
    }
    // $('.show-key').append(String.format(''
    //         + '<a class="key-{0}">'
    //             + '<span class="key-left {1}"></span>'
    //             + '<span class="key-{0}-right {1}"></span>'
    //             + '{2}'
    //         + '</a>' k.key_type, k.key_color, text_doms
    //     ));

            // key_doms=String.format(''
            // + '<a class="key-1">'
            //     + '<span class="key-left {0}"></span>'
            //     + '<span class="key-1-right {0}"></span>'
            //     + '<label class="key-font font-top">{1}</label>'
            //     + '<label class="key-font font-bottom">{2}</label>'
            // + '</a>', k.key_color, k.top_text, k.bottom_text);

}

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
        $('.show-time li:first label').html(time_string);//显示时间变化
    },1000);//每隔一秒变化
     // 显示的时间串
}

// 设置课程内容
function set_study(){
    window.study_keys = [ ]; // 课程的所有按键
    var count = 1000; // 课程总的按键次数
    var key_length = window.keys.length;
    is_show_key = study_keys.slice(study_keys.index,study_keys.index+5)
    for(var i=1; i<=count; i++){
        var index = parseInt(Math.random()*key_length);
        window.study_keys.push(window.keys[index]);
    }
}

// 显示接下来要输入的5个按键
function show_five_keys(){
    var end_index = window.this_key_index + 5;
    var show_keys = window.study_keys.slice(window.this_key_index, end_index);
}