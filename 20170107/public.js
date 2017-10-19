window.LM = { };
LM.Public = {
    resize_window: function(){
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var height = window.innerHeight || documnet.documentElement.clientHeight || document.body.clientHeight;
        var font_size = width / 20;
        document.getElementById("html").style.fontSize = (font_size + 'px');
        document.getElementById("html").style.height = (height + 'px');
    },

    refresh_url_params: function(){
        try{
            var arr1 = window.location.search.split('&');
            for(i in arr1){
                var arr2 = arr1[i].split('=');
                var key = arr2[0].replace('?', '');
                var value = decodeURI(arr2[1]);
                window['url_params_'+key] = value;
            }
        }catch(ex) { }
    }
};

LM.Public.refresh_url_params();
LM.Public.resize_window();
