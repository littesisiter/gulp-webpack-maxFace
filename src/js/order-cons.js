/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-24 22:24:39
 * @version $Id$
 */

require('./../css/common/base.css');
require('./../css/order-cons.css'); // 载入 style.css

var zepto = require('zepto'),
 	Swipe = require('component/swipe.js'),
	data = require('data/data.js');

$(function(){
	var Cons = {
		init:function(){
			this.getConsData();
		},
		getConsData:function(){
			$.ajax({
			    url: 'http://cons-data.cn',
			}).done(function(data, status, xhr){
			    var html = template('consTemp',$.parseJSON(data));
			    $('.cons-swipe-ul').html(html);
			    Cons.$swipeWrap = $('.cons-swipe-wp');
		        Cons.swipe();
		        html = template('proTemp',$.parseJSON(data));
		        $('.pro-swipe-ul').html(html);
				Cons.$swipeWrap = $('.pro-swipe-wp');
		        Cons.swipe();		        
			}) 	
		},
		swipe:function(){//轮播图效果
			Swipe(this.$swipeWrap[0],{
	    		speed:300,
	    		continuous:true,
	    		auto:0,
	    		callback: function(index, element){
	    			var $ul = $(element).parents('.swipe-ul'),
	    				$li = $ul.find('li'),
	    				lens = $li.length,prev,next;
	    			prev = index - 1 < 0 ? lens - 1 : index - 1;
	    			next = index + 1 >= lens ? lens - 1 : index + 1;
	    			$li.removeClass('zIndex').removeClass('cur');
	    			$($li[prev]).addClass('zIndex');
	    			$($li[next]).addClass('zIndex');
	    			$(element).addClass('zIndex').addClass('cur');
	    		}
			})
		},
	}
	Cons.init();
})