/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-13 15:10:56
 * @version $Id$
 */

var share = {
	staticV:{
		signUrl:config.root + '/v1/wechat/js/sign'
	},
	info:{
		shop:{
			title:'筒子茂拿货助手-店家版',//分享标题
			link:config.base + '/shops/home.html',//分享链接
			imgUrl: config.base + '/shops/images/logo.png', // 分享图标
			desc:'拿货助手伴你走，随时拿货随时有！'
		}		
	},
	init:function(type,shareInfo){
		'shop' == type ?  this.info = this.info.shop : this.info = shareInfo;
		this.signAjax();
	},
	signAjax:function(){
		var url = this.staticV.signUrl,
			index = location.href.indexOf('#'),
			href = (index == -1 ? location.href : location.href.substring(0,index)),
			request = {
				request:{
					header:{},
					body:{
						url:href
					}
				}
			};

		util.baseAjax(url,request).then(
			then.bind(this)
		).fail(function(XMLHttpRequest,textStatus,errorThrow){
			console.log(errorThrow)
		});
		function then(data){
			var data = data.response.body;
			wx.config({
			    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId: data.appId, // 必填，公众号的唯一标识
			    timestamp: data.timestamp, // 必填，生成签名的时间戳
			    nonceStr: data.nonceStr, // 必填，生成签名的随机串
			    signature: data.signature,// 必填，签名，见附录1
			    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			wx.ready(function(){
				wx.onMenuShareTimeline({
				    title: share.info.title, // 分享标题
				    link: share.info.link, // 分享链接
				    imgUrl: share.info.imgUrl, // 分享图标
				    success: function () { 
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }
				});
				wx.onMenuShareAppMessage({
				  	title: share.info.title, // 分享标题
				    link: share.info.link, // 分享链接
				    imgUrl: share.info.imgUrl, // 分享图标
				    desc:share.info.desc, // 分享图标
				    success: function () { 
				        // 用户确认分享后执行的回调函数
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }
				});
			});
		}
	}
}