var lyric = [];
// 歌词滚动距离
var scroll_top = 0;
// 歌曲总时间
var song_time = 0; 
// 当前播放到的时间
var cur_time = 0;
// 计时器，用于实时显示当前播放到的时间
var interval = null;


$.get("music/lyric.lrc", function(content) {
	var list = content.split("\n");
	var html = "";
	lyric = parseLyric(list);
	for(var i in lyric) {
		html += "<p id='lrc_"+i+"'>"+lyric[i]+"</p>";
	}
	$(".lyric .content").html(html);
})

var music = document.getElementById("music");
music.volume = 0.3;
//$(".volm-progress .bar").css({"width":　"30%"});

$(".front").click(function() {
	music.currentTime = 21;
	console.log(music.currentTime);
})


var musicProgress = new ProgressSlider();
musicProgress.progress(".process .point", 390, music);
musicProgress.endDrag(music);


var voiceProgress = new voiceSlider();
voiceProgress.progress(1020, music);


$(".start").on("click", function() {
	cur_time = musicProgress.cur_time;
	$.startMusic(music, this, interval);
})


music.addEventListener("timeupdate", function() {
	$.lyricScroll(music, lyric);
})

music.addEventListener("canplaythrough", function() {
	song_time = $.secondToMin(music.duration);
	$(".total-time").text(song_time);
})


$(".add-voice").on("click", function() {
	if(music.volume < 1) {
		music.volume = music.volume+0.1 >= 1 ? 1 : music.volume+0.1;
	}
})


$(".dec-voice").on("click", function() {
	if(music.volume > 0 && music.volume <= 1) {
		music.volume = music.volume-0.1 <= 0 ? 0 : music.volume-0.1;
	}
})




function parseLyric(list) {
	var lyric = [];
	$.each(list, function(index, value) {
		var reg = /\[(\d{2}):(\d{2}.\d{2})\]/;
		var lrc_text = value.replace(reg, "");
		var t = value.match(reg);
		var miniute = Number(t[1]);
		var second = Number(t[2]);
		var time = Math.round(miniute * 60 + second);
		lyric[time] = lrc_text;
	})
	return lyric;
}

jQuery.secondToMin = function(s) {
	var min = parseInt(s / 60);
	var sec = parseInt(s % 60);
	if(min < 10) {
		min = "0"+min;
	}
	if(sec < 10) {
		sec = "0"+sec;
	}
	return min + ":" + sec;
}



jQuery.startMusic = function(musicObj, dom) {
	if($(dom).data("play") == "1") {
		$(dom).css("background-position", "-28px -30px");
		musicObj.play();
		interval = setInterval(function() {
			if(cur_time <= parseInt(music.duration)) {
				cur_time++;	
				$(".current-time").text($.secondToMin(cur_time));
			}
		}, 1000);
		$(dom).data("play", "0");
	} else {
		clearInterval(interval);
		$(dom).css("background-position", "-28px 0px");
		musicObj.pause();	
		$(dom).data("play", "1");
	}
}


/*
 * 播放进行中，歌词与进度条滚动
 */
jQuery.lyricScroll = function(musicObj, lyric) {
	/* 进度条 */
	var progress = musicObj.currentTime / musicObj.duration * 100;
	if(progress <= 100) {
		$(".process .bar").css("width", progress + "%");	
	}
	var c_time = Math.round(musicObj.currentTime);
	if(typeof(lyric[c_time]) !== "undefined" && music.paused === false) {
		/* 歌词滚动，当前歌词变色 */
		if($("#lrc_"+c_time).css('color') != 'rgb(255, 0, 0)') {
			scroll_top += 30;
			$(".lyric").animate({scrollTop: scroll_top + 'px'}, 800);
			$("#lrc_"+c_time).css({color: 'red'}).siblings().css({color: 'black'});	
		}
	}
}

function endDrag() {
	$(".start").trigger("click");
}
