// // /**
// //  * 
// //  * @authors Your Name (you@example.org)
// //  * @date    2017-02-21 10:56:22
// //  * @version $Id$
// //  */
require('./../css/common/base.css');
require('./../css/home.css'); // 载入 style.css

 var zepto = require('zepto'),
 	Swipe = require('component/swipe.js'),
 	IScroll = require('component/iscroll-lite.js'),
	data = require('data/data.js');

$(function(){
	var indexPage = {
		init:function(){
			this.getSwipeData();
			this.getTopicData();
		},
		getSwipeData:function(){//获取轮播数据
			$.ajax({
			    url: 'http://swipe-data.cn',
			}).done(function(data, status, xhr){
				indexPage.$swipeWrap = $('#J_swipe_wp');
				indexPage.$swipeUl = $('#J_swipe');
			    var html = template('swipeTemp',$.parseJSON(data));
		        indexPage.$swipeUl.html(html);
		        indexPage.triggerInit();
			}) 	
		},
		getTopicData:function(){	
			$.ajax({
			    url: 'http://topic-data.cn',
			}).done(function(data, status, xhr){			
			    var html = template('topicTemp',$.parseJSON(data));
		        $('.topic-list').html(html);
		        indexPage.scroll();
			})
		},
		triggerInit:function(){//轮播顺序点初始化
			var lens = $('#J_swipe_wp li').length,i = 0,
				li = '<li class="cur"></li>';
			if(1 == lens)return;
			$('.trigger').append(li);
			li = '<li></li>';
			for(;i<lens - 1;i++){
				$('.trigger').append(li);
			}
			this.swipe();
		},
		swipe:function(){//轮播图效果
			Swipe(this.$swipeWrap[0],{
	    		speed:300,
	    		continuous:true,
	    		auto:0,
	    		callback: function(index, element){
	    			var $el = $(element).find('img');
	    			if ($el.attr("data-src2")) {
	                    $el.attr("src", $el.attr("data-src2"));
	                    $el.removeAttr("data-src2");
	                }
	                var $li = $el.parents('.swipe-ul').siblings('.trigger').find('li');
	                $li.length && $li.eq(index).addClass('cur').siblings().removeClass("cur");
	    		}
			})
		},
		scroll:function(){//楼层左右滑动
			$('.app-scroller').each(function(){
				var scroll = new IScroll(this,{
					scrollX: true,
		            scrollY: false,
		            tap: true,
		            probeType: 3,
		            eventPassthrough: true
		        });
			})
		}
	}
	indexPage.init();
})