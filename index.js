function init(){
    window.vm = new Vue({
        el:'.wrap',
        data:{
            lists:[{
                image:'1.jpg',
                title:'五子棋游戏',
                introdution:'五子棋游戏基于WEB开发，双方轮流进行下棋子，开始计时，当一方棋子在水平/垂直/两个对角方向中任意一个方向连续存在5个子时，则这一方赢得游戏，结束游戏',
                url:'/chess',
                time:'2017/6 - 2017/7',
                version:'PC/APP'
            },{
                image:'2.jpg',
                title:'ajax交互',
                url:'/ajax',
                introdution:'还原 https://cnodejs.org/ 官网首页的新闻列表。AJAX局部刷新技术与后端API接口的对接，并且通过用户筛选的条件（新闻类型）、页码等复合条件进行筛选与交互，开始时用jq对数据的操作完成页面渲染，后面改为用vue方式渲染',
                time:'2017/7-2017/9',
                version:'PC/APP'
            },{
                image:'3.jpg',
                title:'公司网站',
                url:'/page',
                introdution:'惠州思博互联网科技有限公司的公司首页网站，简单介绍惠州思博有限公司类型和近况',
                time:'2017/7-2017/9',
                version:'PC/APP'
            },{
                image:'4.jpg',
                title:'键盘指法练习',
                url:'/key',
                introdution:'WEB端还原键盘模型，通过监听用户按下的按键，来锻炼用户对键盘指法的练习，从而进行实时的时间、速度、正确率、进度的统计。',
                time:'2017/9-2017/10',
                version:'PC版'
            }]
        }
    });
}