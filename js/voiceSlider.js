var voiceSlider = function() {
	
	this.musicObj = music;
	
	this.move_distance = 0;
	
	this.voice_tag = false;
	
	this.mousemove = false;
	
	this.progress = function(init_pageX, music) {
		var _that = this;
		
		$(".operate .volm-point").on("mousedown", function(e) {
			_that.voice_tag = true;
			_that.mousemove = true;
		})
		
		// $(".operate .progress").on("mousemove", function(e) {
		// 	if(_that.voice_tag === true && _that.mousemove === true) {
		// 		console.log(e.pageX);
		// 		_that.move_distance = (e.pageX - init_pageX) / 140 * 100;
		// 		_that.changeVoice(music);
		// 	}
		// })

		$(".operate .progress").on("click", function(e) {
			// if(_that.voice_tag === true && _that.mousemove === true) {
				console.log(e.pageX);
				_that.move_distance = (e.pageX - init_pageX) / 140 * 100;
				_that.changeVoice(music);
			// }
		})
		
		$(".operate .progress").on("mouseup", function(e) {
			if(_that.mousemove === true) {
				_that.music_tag = false;
				_that.mousemove = false;
			}
		})
	}
	
	this.changeVoice = function(music) {
		if(this.move_distance <= 100) {
			music.volume = this.move_distance / 100;
			$(".volm-progress .bar").css({"width":　this.move_distance + "%"});
		}
	}
}
