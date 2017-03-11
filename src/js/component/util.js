/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-26 19:58:44
 * @version $Id$
 */
moudle.exports = {//公共基础类 
    config:function(){
        var UA = window.navigator.userAgent;    
        iPad = UA.match(/(iPad);?/i) ? true : false;
        ios = UA.match(/(iPhone);?/i) ? true : false;
        iPad ? $('html').addClass('ipad'):
        ios ? $('html').addClass('ios'):
        $('html').addClass('android');
        var host = location.host,domain,obj;
        host.indexOf('tongzimall') == -1 ? domain = 'dev' :
        host.indexOf('dev') != -1 ?　domain = 'dev' :
        host.indexOf('sit') != -1 ?  domain = 'sit' :
        domain = 'prd';
        var dev = {
             root:'http://api.sit.man.tongzimall.com',
             base:'http://msit..tongzimall.com'
        },
        sit = {
            root:'http://api.sit.man.tongzimall.com',
            base:'http://m.sit.tongzimall.com'
        },
        prd = {
            root:'http://api.man.tongzimall.com',
            base:'http://m.tongzimall.com'
        };
        switch(domain){
            case 'dev': obj = dev;break;
            case 'sit': obj = sit;break;
            case 'prd': obj = prd;break;
        }
        return obj;
    }(),
	baseAjax:function(url,data,type,load){//ajax请求
        var deffer = $.Deferred(),
        	data = data || {request:{header:{},body:{}}};
        	type = type || 'post';
            load = load ? false : true;
        $.ajax({
            timeout : 20000, //超时时间设置，单位毫秒
            type: type,
            url: url,
            data: data,
            dataType: 'json',
            beforeSend:function(){
                load && $('.load-wrap').show();
            },
            success: function(json) {
                load && $('.load-wrap').hide();
                deffer.resolve(json);
            },
            error: function(XMLHttpRequest,textStatus,errorThrown){
                 util.alertBox('网络超时,请重试'); 
                 console.log(errorThrown)
                 $('.load-wrap').hide();
                deffer.reject({});
            }
        });
        return deffer.promise();
    },
    getUrlParams:function(){
        var seg = location.search.replace(/^\?/,'').split('&'),
            len = seg.length,i = 0,s,ret = {};
        for(;i<len;i++){
            if(!seg[i])continue;
            s = seg[i].split('=');
            ret[s[0]] = s[1];
        }
        return ret;
    },
    alertBox:function(msg,type,confirm,cancel,callback,confirmText,concelText){//弹框提示
        var type = type || 'mini';
        if('mini' == type){
            AlertBox({
                'type':type,
                'msg':msg,
                'delay':1000,
            })
        }else{
            AlertBox({
                title: msg,
                confirm: function() {
                    confirm && confirm()
                },
                cancel: function() {
                    cancel && cancel()
                },
                callback: function() {
                    callback && callback()
                },
                'confirmText':confirmText,
                'cancelText':concelText
            })
        }

    },
    processResult:function(data,func){
        data.response.header.code == '0' ? func(data) : this.alertBox(data.response.header.msg);
    },
    render:function(data,temp,$container,append){//渲染模板数据
        var html = template(temp + 'Temp',data);
        'append' == append ? $container.append(html):$container.html(html);
    },
    checkResult:function(data){//校验返回的参数
        var code = data.response.header.code;
        if("0" == code)return true;
        util.alertBox(data.response.header.msg);
        return false;
    },
    errorEvent:function(){
        $('html img').on('error',function(){
            $(this).attr('src','/common/style/images/logo.png').addClass('def');
        })
    },
    scrollEvent:function($el){//滚动置顶
        var h = window.innerHeight || window.screen.height;
        $(window).on("scroll touchmove", function(){
            (window.scrollY < 1.5 * h) ? $el.addClass("hide") : $el.removeClass("hide");
        });
    },
    getCurrentTime:function(){
        var e = $.Deferred(),c;
        $.ajax({
            url:config.root + '/v1/order/servertime',
            dataType: "json",
            timeout: 3000,
            success: function(d) {
                e.resolve(d)
            },
            error: function() {
                c = new Date().getTime();
                e.resolve(c)
            }
        })
        return e.promise();
    },
    dateFormat:function(){
        Date.prototype.Format = function (fmt) { //author: meizz 
            var o = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        if (typeof String.prototype.startsWith != 'function') {
          String.prototype.startsWith = function (prefix){
            return this.slice(0, prefix.length) === prefix;
          };
        }
        if (typeof String.prototype.endsWith != 'function') {
          String.prototype.endsWith = function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
          };
        }
    }()
}
window.config = util.config;
