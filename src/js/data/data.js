/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-23 15:28:22
 * @version $Id$
 */
var Mock = require('mockjs');

//首页轮播数据
Mock.mock('http://swipe-data.cn',{
  "swipeList|3-5": [{
    imageUrl:Mock.Random.image('750x340', '#000', '#FFF', '')
  }]
})

//首页模块数据
Mock.mock('http://topic-data.cn',{
  	"topicList|15": [{
	  	title:'轻松下午茶',
	    "proList|3":[{
	    	imageUrl:Mock.Random.image('630x265', '#50B347', '#FFF', ''),
	    	smallImageUrl:Mock.Random.image('185x185', '#50B347', '#FFF', ''),
	    	name:'我脸大醋香奶茶',
	    	price:10
	    }]
  	}]
})

//星座点单
Mock.mock('http://cons-data.cn',{
  	"consList": [{
	  	name:'狮子座',
	  	imageUrl:Mock.Random.image('560x560', '#34ecd0', '#FFF', '')
  	},
  	{
	  	name:'巨蟹座',
	  	imageUrl:Mock.Random.image('560x560', '#8d79bb', '#FFF', '')
  	},
  	{
	  	name:'处女座',
	  	imageUrl:Mock.Random.image('560x560', '#f34f29', '#FFF', '')
  	},
  	{
	  	name:'水瓶座',
	  	imageUrl:Mock.Random.image('560x560', '#f4f706', '#FFF', '')
  	},
  	{
	  	name:'天蝎座',
	  	imageUrl:Mock.Random.image('560x560', '#f50c4e', '#FFF', '')
  	},
  	{
	  	name:'射手座',
	  	imageUrl:Mock.Random.image('560x560', '#ff857d', '#FFF', '')
  	},
  	{
	  	name:'双子座',
	  	imageUrl:Mock.Random.image('560x560', '#50B347', '#FFF', '')
  	}]
})
