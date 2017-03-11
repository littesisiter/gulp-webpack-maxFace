

var CountDown = function(opts) {
        function CountDown(e) {
            this.opts = e || {};
            this.obj = this.opts.obj;
            this.nowTime = this.opts.nowTime;
            this.startTime = this.opts.startTime;
            this.endTime = this.opts.endTime;
            this.dayNode = this.opts.dayNode || ".day-node";
            this.hourNode = this.opts.hourNode || ".hour-node";
            this.minuteNode = this.opts.minuteNode || ".minute-node";
            this.secondNode = this.opts.secondNode || ".second-node";
            this.beforeStart = this.opts.beforeStart || function() {}
            ;
            this.isStart = this.opts.isStart || function() {}
            ;
            this.callback = this.opts.callback || function() {}
            ;
            this.speed = this.opts.speed || 1000;
            this.timeOffset = 0;
            this.gap = [];
            this.auto = null 
        }
        CountDown.prototype = {
            init: function() {
                var e = this;
                e.timeOffset = e.nowTime - new Date().getTime();
                e.timer();
                e.run()
            },
            timer: function() {
                var e = this
                  , f = this.nowTime;
                if (e.startTime && parseInt(e.startTime) > parseInt(f)) {
                    e.gap = e.parse(e.startTime - f);
                    e.html();
                    this.beforeStart()
                } else {
                    if (e.endTime && parseInt(e.endTime) > parseInt(f)) {
                        e.gap = e.parse(e.endTime - f);
                        e.html();
                        this.isStart()
                    }
                }
                if (parseInt(e.endTime) < parseInt(this.nowTime)) {
                    clearTimeout(e.auto);
                    this.callback()
                }
                this.nowTime = new Date().getTime() + this.timeOffset
            },
            parse: function(g) {
                var e = this
                  , f = g / e.speed;
                e.second = Math.round(f % 60);
                e.minute = Math.floor((f / 60) % 60);
                e.hour = Math.floor((f / 60 / 60) % 24);
                e.day = Math.floor(f / 60 / 60 / 24);
                if (e.second < 10) {
                    e.second = "0" + e.second
                }
                if (e.minute < 10) {
                    e.minute = "0" + e.minute
                }
                if (e.hour < 10) {
                    e.hour = "0" + e.hour
                }
                if (e.day < 10) {
                    e.day = "0" + e.day
                }
                return [e.second, e.minute, e.hour, e.day]
            },
            html: function() {
                var e = this;
                e.obj.find(this.dayNode).html(e.gap[3]);
                e.obj.find(this.hourNode).html(e.gap[2]);
                e.obj.find(this.minuteNode).html(e.gap[1]);
                e.obj.find(this.secondNode).html(e.gap[0])
            },
            run: function() {
                var e = this;
                e.auto = setInterval(function() {
                    e.timer()
                }, 500)
            }
        };
        new CountDown(opts).init()
    }