/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-24 14:27:10
 * @version $Id$
 */
require('./../css/common/base.css');
require('./../css/order-fast.css'); // 载入 style.css

 var zepto = require('zepto'),
 	IScroll = require('component/iscroll-lite.js'),
 	Swipe = require('component/swipe.js'),
 	AlertBox = require('component/alertBox.js'),
	data = require('data/data.js');
$(function(){
	var orderFast = {
		init:function(){
			this.getTopicData();
			this.swipe();
			this.fixedEvent();
			this.cartEvent();
		},
		getTopicData:function(){
			$.ajax({
			    url: 'http://topic-data.cn',
			}).done(function(data, status, xhr){			
			    var html = template('topicTemp',$.parseJSON(data));
		        $('.topic-list').html(html);
		        orderFast.getProData();
			})
		},
		getProData:function(){
			$.ajax({
			    url: 'http://topic-data.cn',
			}).done(function(data, status, xhr){			
			    var html = template('proTemp',$.parseJSON(data));
		        $('.detail-list').html(html);
		        orderFast.scroll();
		        orderFast.topicSelectEvent();
		        orderFast.proEvent();
		        orderFast.selectEvent();
			})
		},
		topicSelectEvent:function(){
			var detailScroll;
			$(orderFast.iscroll).each(function(){
				if($(this.wrapper).hasClass('detail-scroller')){
					detailScroll = this;
				}
			})
			$('.topic-list li').off('click').on('click',function(){
				var index = $(this).index();
				$('.topic-list li').removeClass('cur');
				$(this).addClass('cur');
				detailScroll.scrollToElement($('.detail-list .detail-item')[index]);
				orderFast.topicClick = true;
			})
		},
		selectEvent:function(){
			$('.detail-item dd').off('click').on('click',function(){
				var single = $(this).parents('.detail-item').hasClass('single');
				single && $(this).siblings('dd').removeClass('cur');
				single ? $(this).addClass('cur') : $(this).toggleClass('cur');
			})
			$('.select-sec .tab-list li').off('click').on('click',function(){
				if($(this).hasClass('cur'))return;
				var index = $(this).index();
				$(this).siblings('li').removeClass('cur');
				$(this).addClass('cur');
				index == 1 ? orderFast.swipe.next() : orderFast.swipe.prev();
			})
			$('.select-sec .close').off('click').on('click',function(){
				$('.select-sec').addClass('h0');
				$('.mask').addClass('hide');
			})
			$('.mask').off('click').on('click',function(){
				$('.select-sec,.cart-sec').addClass('h0');
				$('.mask').addClass('hide');
			})
		},
		proEvent:function(){
			$('.pro-list li').off('click').on('click',function(){
				
			})
			$('.pro-list .to-add').off('click').on('click',function(e){
				e.stopPropagation();
				$('.select-sec').removeClass('h0');
				setTimeout(function(){
					$('.mask').removeClass('hide');
				},100)
			})
		},
		fixedEvent:function(){
			setCartSecHeight();
			function setCartSecHeight(){
				var h1 = $('.cart-sec .clear-sec').height(),
					h2 = $('.cart-sec .pro-list').height();
				$('.cart-sec .app-scroller').height(h2 + 'px');
			}
			$('.fast-fixed').off('click').on('click',function(){
				$('.cart-sec').toggleClass('h0');
				$('.mask').toggleClass('hide');
			})
		},
		cartEvent:function(){
			$('.clear-btn').off('click').on('click',function(){
				orderFast.alertBox('确定清空购物车?','nomini',function(){

				},function(){},function(){},'删除')
			})
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
		scroll:function(){//楼层上下滑动
			this.iscroll = [];
			$('.app-scroller').each(function(){
				var scroll = new IScroll(this,{
					scrollX:false,
		            scrollY:true,
		            tap:true,
		            click:true,
		            probeType: 3,
		            eventPassthrough:false
		        });
		        orderFast.iscroll.push(scroll);		        
			})
			var index = 0;
			$(this.iscroll).each(function(i,item){
		        this.on('scrollEnd',function(){
		        	if($(this.wrapper).hasClass('topic-scroller') || $(this.wrapper).hasClass('select-scroller'))return;
		        	var	y = Math.abs(this.y),
		        		temp = orderFast.getScrollIndex(y);
		        	if(index != temp){
		        		!orderFast.topicClick && temp >= 4 && orderFast.iscroll[1 - i].scrollToElement($('.topic-list li')[temp - 4]);
		        		$('.topic-list li').removeClass('cur');
		        		$($('.topic-list li')[temp]).addClass('cur');
		        	}
		        	orderFast.topicClick = false;
		        	index = temp;
		        })
	        })
		},
		getScrollIndex:function(y){
			var height = 0,index = 0;
			$('.detail-list .detail-item').each(function(i,item){
				height += $(this).height();
				if(y < height){
					index = i;
					return false;
				}
			})
			return index;
		},
		swipe:function(){//轮播图效果
			orderFast.swipe = Swipe(document.getElementById('J_swipe_wp'),{
	    		speed:300,
	    		continuous:false,
	    		auto:0,
	    		callback: function(index, element){
	    			var $li = $('.select-sec .tab-list li');
	    			$li.removeClass('cur');
	    			$($li[index]).addClass('cur');
	    		}
			})
		},
	}
	orderFast.init();
	window.orderFast = orderFast;
})