/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-03-04 16:25:36
 * @version $Id$
 */

require('./../css/common/base.css');
require('./../css/order-confirm.css'); // 载入 style.css

var zepto = require('zepto'),
	IScroll = require('component/iscroll-lite.js'),
 	Swipe = require('component/swipe.js');
$(function(){
	var confirm = {
		init:function(){
			this.scroll();
			this.swipe();
			this.selectEvent();
		},
		selectEvent:function(){
			$('.coupon-sec .tab-list li').off('click').on('click',function(){
				if($(this).hasClass('cur'))return;
				var index = $(this).index();
				$(this).siblings('li').removeClass('cur');
				$(this).addClass('cur');
				index == 1 ? confirm.swipe.next() : confirm.swipe.prev();
			})
			$('.coupon-sec .close').off('click').on('click',function(){
				$('.coupon-sec').addClass('h0');
				$('.mask').addClass('hide');
			})
			$('.mask').off('click').on('click',function(){
				$('.coupon-sec').addClass('h0');
				$('.mask').addClass('hide');
			})
		},
		scroll:function(){//楼层上下滑动
			$('.app-scroller').each(function(){
				var scroll = new IScroll(this,{
					scrollX:false,
		            scrollY:true,
		            tap:true,
		            click:true,
		            probeType: 3,
		            eventPassthrough:false
		        });
			})		
		},
		swipe:function(){//轮播图效果
			confirm.swipe = Swipe(document.getElementById('J_swipe_wp'),{
	    		speed:300,
	    		continuous:false,
	    		auto:0,
	    		callback: function(index, element){
	    			var $li = $('.coupon-sec .tab-list li');
	    			$li.removeClass('cur');
	    			$($li[index]).addClass('cur');
	    		}
			})
		}
	}

	window.confirm = confirm;
	confirm.init();
})
