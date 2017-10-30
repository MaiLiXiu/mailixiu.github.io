function init(){
    var vm = new Vue({
        el:'.wrap',
        data:{
            scrollY:0,
            menus:[{
                name:'首页',
                name_en:'home',
                menu_click: true
            },{
                name:'企业困境',
                name_en:'dilemma',
                menu_click: false
            },{
                name:'SPT产品',
                name_en:'Introduction',
                menu_click: false
            },{
                name:'特色功能',
                name_en:'Function',
                menu_click: false
            },{
                name:'优质服务',
                name_en:'service',
                menu_click: false
            },{
                name:'营销案例',
                name_en:'Case',
                menu_click: false
            },{
                name:'合作企业',
                name_en:'Cooperation',
                menu_click: false
            },{
                name:'SP思博',
                name_en:'Support',
                menu_click: false
            }],
            page1:{
                title:'传统服装（定制）企业困境',
                desc:'分析对象：服装ODM企业、服装定制企业、品牌服装企业',
                tabs:[{
                    title:'传统企业困境',
                    is_click:true,
                    items:[{
                        icon:'&#xe637;',
                        desc:'人力资源、现金流压力逐年增加'
                    },{
                        icon:'&#xe602;',
                        desc:'组织过程严重依赖人工和渠道'
                    },{
                        icon:'&#xe70b;',
                        desc:'只能完成交易难以凝聚用户用量'
                    },{
                        icon:'&#xe602;',
                        desc:'对客户粘性缺乏新的营销方案'
                    }]
                }, {
                    title: '服装定制企业困境',
                        is_checked: false,
                        items: [{
                            icon: '&#xe637;',
                            desc: '客户的定制体验,全靠客服的服务态度和专业性,而过程中客服只为目的,导致用户体验并不好'
                        }, {
                            icon: '&#xe637;',
                            desc: '定制企业如遇到快速发展的时机,却会因为人力成本,以及客户群体难以拓展等,遭到重重阻碍'
                        }, {
                            icon: '&#xe637;',
                            desc: '用户在定制期间,仅能通过通讯软件和电话沟通,若用户反复要修改设计,不但增加交流成本且过程容易出错'
                        },{
                            icon: '&#xe637;',
                            desc: '员工在订单处理时,会被占据大量时间,订单量会根据人力资源,所受到拓展限制'
                        }]
                }]
            },
            page2:{
                title:'SPT-T恤一站交互式C2M云协作平台',
                desc:'SPT-T是针对传统企业C2M商业模式升级研发的,支持一站交互式,从客户需求到产品发货的定制平台.并与<span class="c-412">设计稿为核心</span>,实现：',
                tabs:[{
                    title:'产品设计安全&生产',
                    is_click:true,
                    items:[{
                        icon:'&#xe637;',
                        desc:'先交易后生产'
                    },{
                        icon:'&#xe607;',
                        desc:'多品种&小批量生产'
                    },{
                        icon:'&#xe614;',
                        desc:'有效规避大量产品库存'
                    },{
                        icon:'&#xe606;',
                        desc:'根据用户需求，做快速生产反应'
                    }]
                },{
                    title:'用户拓展&维护',
                    is_click:false, 
                    items: [{
                        icon: '&#xe607;',
                        desc: '设计稿社群分享<br />引领消费，拓展用户'
                    }, {
                        icon: '&#xe606;',
                        desc: '多种推广引流工具<br />C端几何式裂变增长'
                    }, {
                        icon: '&#xe607;', 
                        desc: '用户大数据分析<br />支持代理加盟商机制'
                    },{
                        icon: '&#xe606;', 
                        desc: '更多优秀设计稿<br />无限量开放陈列备选'
                    }]
                },{
                    title:'企业成本&发展',
                    is_click:false,
                    items: [{
                        icon: '&#xe606;', 
                        desc: '设计稿社群分享<br />引领消费，拓展用户'
                    }, {
                        icon: '&#xe607;', 
                        desc: '多种推广引流工具<br />C端几何式裂变增长'
                    }, {
                        icon: '&#xe606;', 
                        desc: '用户大数据分析<br />支持代理加盟商机制'
                    },{
                        icon: '&#xe607;',  
                        desc: '更多优秀设计稿<br />无限量开放陈列备选'
                    }]
                }
            ]}
        },
        created:function(){
            var vm = this;
            document.addEventListener('scroll',function(e){
                vm.scrollY = window.scrollY||document.body.scrollY||document.documentElement.scrollY;
            });
        },

        computed: {
            is_fixed: function(){
                var vm = this;
                if(vm.scrollY>50) return true;
                else return false;
            }
        },

        methods:{
            change_menu_item:function(item){
                var vm=this;
                vm.menus.forEach(function(item2){
                   item2.menu_click=false;
                });
                item.menu_click=true;
            },
            change_tab:function(page,tab){
                var vm=this;
                page.tabs.forEach(function(item2){
                   item2.is_click=false;
                });
                tab.is_click=true;
            }
        }
    });
}
