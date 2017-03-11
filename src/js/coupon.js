/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-03-05 14:00:03
 * @version $Id$
 */
require('./../css/common/base.css');
require('./../css/coupon.css'); // 载入 style.css

var zepto = require('zepto'),
	Swipe = require('component/swipe.js');
$(function(){
	var coupon = {
		init:function(){
			this.swipe();
			this.selectEvent();
		},
		selectEvent:function(){
			$('.tab-list li').off('click').on('click',function(){
				if($(this).hasClass('cur'))return;
				var index = $(this).index();
				$(this).siblings('li').removeClass('cur');
				$(this).addClass('cur');
				index == 1 ? confirm.swipe.next() : confirm.swipe.prev();
			})
		},	
		swipe:function(){//轮播图效果
			confirm.swipe = Swipe(document.getElementById('J_swipe_wp'),{
	    		speed:300,
	    		continuous:false,
	    		auto:0,
	    		callback: function(index, element){
	    			var $li = $('.tab-list li');
	    			$li.removeClass('cur');
	    			$($li[index]).addClass('cur');
	    			$(element).find('dl').length ? $('body').addClass('hascoupon').removeClass('nocoupon') : $('body').addClass('nocoupon').removeClass('hascoupon');
	    		}
			})
		}
	}
	coupon.init();
	window.coupon = coupon;
})


