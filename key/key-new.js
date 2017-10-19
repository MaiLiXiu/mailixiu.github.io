function init(){
    window.vm = new Vue({
        el:'.container',
        data:{
            total_time:0,
            lists:['首页','指法练习','五笔练习','文章练习','编码查询','字根表下载','输入法下载'],
            origin_keys: window.origin_keys,
            this_key_index: 0, // this_five_keys里面需要按下的那个键的索引
            this_page: 1,  // this_five_keys是第几页的数据
            enter_key_code: undefined, // 用户最后按下的按钮的key_code
            total_keydown_count:0,//按下总数
            right_keydown_count:0,//正确数
            accuracy:0, //正确率
            wrong_keydown_count:0,
            total_min:0,
            total_sec:0,
            speed:undefined,
            schedule:0 //进度
        },

        created: function(){
        var vm =this;
        vm.sumtime();
         　$(document).keydown(function(event){
　  　　　     vm.enter_key_code=event.keyCode;
       　　});
        },

        computed: {
            keys: function(){
                var vm = this;
                var is_first;
                var keys = [ ];
                var this_line;  // 当前行的行数
                var this_line_keys = [ ];  // 当前行的所有按钮
                vm.origin_keys.forEach(function(item,index){
                    if(item.line == this_line) {
                        this_line_keys.push(item);
                        item.is_first=false;
                        if(index == vm.origin_keys.length-1){
                            keys.push({
                                line: this_line,
                                items: this_line_keys
                            });
                        }
                    }else{
                        // 重置this_line与this_line_keys前，将上一行数据push到keys
                        if(this_line_keys.length > 0) {
                            keys.push({
                                line: this_line,
                                items: this_line_keys
                            });
                        }
                        this_line = item.line;
                        this_line_keys = [item];
                        item.is_first=true;
                    }
                });
                return keys;
            },
            this_five_key:function(){
                var vm = this;
                var this_five_key=vm.key_storage.slice((vm.this_page-1)*5, vm.this_page*5);
                return this_five_key;
            },
            key_storage:function(){
                var vm = this;
                var icount=1000;
                var new_keys=[];
                var this_five_key=[];
                for(var i=0;i<icount; i++){
                    var index= parseInt(Math.random()*vm.origin_keys.length);
                    var key = vm.origin_keys[index];
                    var ascii = key.top_text.charCodeAt();
                    if(65<=ascii && ascii<=90) new_keys.push(key)
                }
                return new_keys;
            },
            time_string:function(){
                var vm = this;
                vm.total_min = parseInt(vm.total_time/60);
                vm.total_sec = vm.total_time%60;
                if(vm.total_min<10) vm.total_min = '0'+vm.total_min;
                if(vm.total_sec<10) vm.total_sec = '0'+vm.total_sec;
                time_string = (vm.total_min+':'+vm.total_sec);
                return time_string;
            },
        },

        methods:{
            get_key_class: function(key){
                var vm = this;
                var cla = { };
                cla['g-ml0'] = key.is_first;
                cla['key-'+key.key_type] = true;
                return cla;
            },
            get_key_right:function(key){
                var vm = this;
                var cla = { };
                cla['key-'+key.key_type+'-right'] = true;
                cla[key.key_color] = true;
                cla.g = (key.top_text==vm.this_five_key[vm.this_key_index].top_text);
                if(vm.enter_key_code && key.key_code==vm.enter_key_code) {
                    cla['o'] = (vm.enter_key_code!=vm.this_five_key[vm.this_key_index].key_code);
                }
                return cla;
            },
            get_left_color:function(key){
                var vm = this;
                var cla = { };
                cla[key.key_color] = true;
                cla.g = (key.top_text==vm.this_five_key[vm.this_key_index].top_text);
                if(vm.enter_key_code && key.key_code==vm.enter_key_code) {
                    cla['o'] = (vm.enter_key_code!=vm.this_five_key[vm.this_key_index].key_code);
                }
                return cla;
            },
            sumtime:function(){
                var vm = this;
                setInterval(function(){ // 计时开始
                    vm.total_time+=1;
                },1000)
            }
        },
        watch:{
            enter_key_code:function(){  //监控key_code变化 但不代表一边就按了key 
                var vm = this;
                if(vm.enter_key_code) vm.total_keydown_count+=1; //在按下后总数加1 如果没有前面的条件 
                                                                    // 那在按完跳到下一个key时又加一次 所以要加条件
                if(vm.enter_key_code){
                    vm.schedule = (((vm.this_page-1)*5+vm.this_key_index+1)/1000*100).toFixed(2)+'%';
                }                                                    
                // 按对了
                if(vm.this_five_key[vm.this_key_index].key_code==vm.enter_key_code){
                    vm.this_key_index+=1;
                    vm.enter_key_code = '';
                    vm.right_keydown_count+=1;

                    // 如果上面的五个都按完了，则跳到0
                    if(vm.this_key_index == 5) {
                        vm.this_page += 1;
                        vm.this_key_index = 0;   
                    }
                }
                else {
                    vm.wrong_keydown_count+=1;
                }
            },
            total_keydown_count:function(){
                var vm = this;
                vm.accuracy = parseInt((vm.right_keydown_count/vm.total_keydown_count)*100)+'%';
            },
            total_time:function(){
                var vm = this;
                vm.speed = parseInt(vm.total_keydown_count/vm.total_time*60*2)+'KMP';
            }
        }
    })
}