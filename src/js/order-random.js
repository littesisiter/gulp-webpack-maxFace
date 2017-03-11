/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-25 19:53:19
 * @version $Id$
 */

require('./../css/common/base.css');
require('./../css/order-random.css'); // 载入 style.css

var zepto = require('zepto'),
 	Swipe = require('component/swipe.js'),
 	Shake = require('component/shake.js'),
	data = require('data/data.js');

$(function(){
	var random = {
		init:function(){
			var sound = document.getElementById('run');
			random.media = sound;
			//this.shake();
			this.getProData();
		},
		getProData:function(){
			$.ajax({
			    url: 'http://cons-data.cn',
			}).done(function(data, status, xhr){				
				$('#run').attr('src',$('#run').attr('data-match'));     
				random.audioPlay();
				setTimeout(function(){
					random.animateEnd = true;
					dealData(data);
				},1000)
				function dealData(data){
					$('.shake-sec,.load-sec').addClass('hide');
					$('.result-sec').removeClass('hide');		        
			        html = template('proTemp',$.parseJSON(data));
			        $('.pro-swipe-ul').html(html);
					random.$swipeWrap = $('.pro-swipe-wp');
			        random.swipe();
		    	}
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
		shake:function(){
			var	shake = new Shake({
	                threshold:10,
	                timeout:1000,
	                callBack:this.audioPlay
	            });
           	shake.start();
           	random.animateEnd = true;
   			window.addEventListener('shake', shakeEventDidOccur,true);
   			function shakeEventDidOccur(){
   				if(!random.animateEnd)return;
   				random.animateEnd = false;
   				$('.shake-icon').removeClass('animate');
   				$('#run').attr('src',$('#run').attr('data-sound'));
   				setTimeout(function(){
   					$('.random-wrap').addClass('split');
   				},1000);
   				setTimeout(function(){
   					$('.random-wrap').removeClass('split');
   					$('.load-sec').removeClass('hide');
   				},2000);
	   			setTimeout(function(){
	   				random.getProData();
	   			},3000)
			}
		},
		audioPlay:function(){
			wx.config({});
			wx.ready(function() {
				random.media.play();
			});
		}
	}
	random.init();
})