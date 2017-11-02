function init(){
    window.vm = new Vue({
        el:"#wrap",
        data:{
            params_page: 1, // 当前页
            params_limit: 20, // 每页多少条

            total: 0,  // 总的数据量
            items: [] , // 当前页的数据
            // pages:[1,2,3,4,5,6],

            scrollY:0,
            innerHeight:0,
            is_watch_scroll_to_load: true,  // 是否监听滚动

            types:[{
                name: '',
                name_cn: '全部'
            }, {
                name: 'good',
                name_cn:'精华'
            },{
                name:'share',
                name_cn:'分享'
            },{
                name:'ask',
                name_cn:'问答'
            },{
                name:'job',
                name_cn:'招聘'
            },{
                name:'dev',
                name_cn:'客户端测试'
            }],
            current_type: { }// 当前选中的类型
        },

        created: function(){
            var vm = this;
            vm.current_type = vm.types[0]; // 一开始打开页面时，按钮“全部”选中
            vm.innerHeight = window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
            document.addEventListener('scroll',function(e){
                vm.scrollY = window.scrollY||document.body.scrollY||document.documentElement.scrollY;
            });
        },
        watch:{
            params_page:function(){
                // if(vm.params_page>6) vm.params_page=1;
                // if(vm.params_page<1) vm.params_page=6;
                vm.get_data();
            },
            current_type:function(){
                var vm = this;
                vm.params_page = 1;
                vm.get_data();
            },
            scrollY:function(){
                var vm = this;
                if(!vm.is_watch_scroll_to_load) return;
                var scrollHeight = document.body.scrollHeight||document.documentElement.scrollHeight;
                if((scrollHeight-vm.scrollY)<1.5*vm.innerHeight){
                    vm.params_page+=1;
                }
            }
        },
        methods:{
            get_item_time_text:function(item,span_hour){
                if(span_hour>24){
                    item.time_text = parseInt(span_hour/24)+'天前';
                }else{
                    if(span_hour<1) item.time_text=parseInt(span_hour*60)+'分钟前';
                    else item.time_text =parseInt(span_hour)+'小时前';
                } 
                return item.time_text;
            },
            
            get_data:function(){
                var vm = this;
                vm.is_watch_scroll_to_load = false;
                var url = 'https://cnodejs.org/api/v1/topics?tab='+vm.current_type.name+'&page='+vm.params_page+'&limit='+vm.params_limit;
                $.get(url, function(r){
                    console.log(rr=r)
                    vm.is_watch_scroll_to_load = true;
                    for(var i in r.data){
                        if(r.data[i].top){
                            r.data[i].tab_cn = '置顶';
                            r.data[i].label_class = 'b-green';
                        }else if(r.data[i].good){
                            r.data[i].tab_cn = '精华';
                            r.data[i].label_class = 'b-green';
                        }else if(r.data[i].tab == 'ask'){
                            r.data[i].tab_cn = "问答";
                            r.data[i].label_class = 'b-999';
                        }else {
                            r.data[i].tab_cn = '分享';
                            r.data[i].label_class = 'b-999';
                        }
                        
                        var mins = new Date(r.data[i].last_reply_at).getTime();
                        var current_mins = new Date().getTime();
                        var span_hour = (current_mins-mins)/1000/60/60;
                        var time_text;
                        r.data[i].time_text = vm.get_item_time_text(r.data[i],span_hour);
                    }
                    if(vm.params_page == 1) vm.items = r.data;
                    else vm.items = vm.items.concat(r.data);
                })
            },

            is_empty: function(item){
                var vm = this;
                if(vm.current_type.name_cn=='全部'||vm.current_type.name_cn=='精华') {
                    return false;
                }else{
                    if((vm.current_type.name_cn=='招聘'||vm.current_type.name_cn=='客户端测试')&&item.tab_cn=='分享') return true;
                    else if(vm.current_type.name_cn==item.tab_cn){
                        return true;
                    }else {
                        return false;
                    }
                }
            }
        }
    });
}