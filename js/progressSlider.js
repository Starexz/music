var ProgressSlider = function() {
	
	this.music_tag = true;
	
	this.move_distance = 0;
	
	this.cur_time = 0;
	
	this.mousemove = false;
	
	this.progress = function(obj, init_pageX, music, cur_time, lyric) {
		var _that = this;
		$(obj).mousedown(function(e) {
			clearInterval(interval);
			if($(".start").data("play") == 0) {
				$.startMusic(music, '.start');
			}
			_that.music_tag = true;
			// _that.mousemove = true;
		})
		// $(".process .progress").mousemove(function(e1) {
		// 	if(_that.mousemove === true) {
		// 		$(obj).data('move', '1');
		// 		if(_that.music_tag === true) {
		// 			_that.move_distance = (e1.pageX - init_pageX) / 350 * 100;
		// 			_that.changeMusicTime(music, lyric);
		// 		}	
		// 	}
		// })

		$(".process .progress").click(function(e1) {
			_that.move_distance = (e1.pageX - init_pageX) / 350 * 100;
			_that.changeMusicTime(music, lyric);
			var scorll = 0;
			_that.music_tag = false;
			_that.cur_time = parseInt(music.duration * _that.move_distance / 100);
			for (var i in lyric) {
				if(i <= _that.cur_time) {
					scorll += 30;
				}
			}
			scroll_top = scorll;
			$(".lyric").animate({scrollTop: scroll_top + 'px'}, 800);
			$(".start").trigger("click");
			music.currentTime = music.duration * _that.move_distance / 100;
		})
	}
	
	this.endDrag = function(music) {
	// 	var _that = this;
	// 	$(".process .progress").mouseup(function(e) {
	// 		var point  = $(this).find("i");
	// 		if(point.data("move") == "1" && _that.mousemove === true) {
	// 			var scorll = 0;
	// 			_that.music_tag = false;
	// 			_that.cur_time = parseInt(music.duration * _that.move_distance / 100);
	// 			for (var i in lyric) {
	// 				if(i <= _that.cur_time) {
	// 					scorll += 30;
	// 				}
	// 			}
	// 			scroll_top = scorll;
	// 			$(".lyric").animate({scrollTop: scroll_top + 'px'}, 800);
	// //			$.lyricScroll(music, lyric);
	// 			$(".start").trigger("click");
	// 			point.data('move', '0');
	// 		}
	// 		music.currentTime = music.duration * _that.move_distance / 100;
	// 		_that.mousemove = false;
	// 	});
	}
	
	this.changeMusicTime = function(music, lyric) {
		if(this.move_distance <= 100) {
			var time = $.secondToMin(music.duration * this.move_distance / 100);
			$(".current-time").text(time);
			$(".process .bar").css({"width":　this.move_distance + "%"});
		}
	}
	
}

