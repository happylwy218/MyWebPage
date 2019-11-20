$(function () {
	let musicImg;
	$.ajax({
		type: 'get',
		timeout: 10000,
		url: 'http://47.106.38.84:8000/v1/img/list',
		success: function (data) {
			for (let i = 0; i < data.data.length; i++) {
				data.data[i] = 'http://47.106.38.84:8000/' + data.data[i];
			}
			musicImg = data.data;
			let imagesBg = `<img id="imgs" src="${musicImg[0]}">`
			$('#music_bg').html(imagesBg);
			let imagesMask = `<img id="music_bg_animation" class="music_bg_animation" src="${musicImg[0]}">`
			$('#mask').html(imagesMask);
			// console.log('音乐图片列表 == > ', data);
		},
		error: function (err) {
			// console.log(err);
		},
		complete: function (XMLHttpRequest, status) {
			// console.log('XMLHttpRequest', XMLHttpRequest);
			// console.log('status', status);
		}
	});
	let musicList;
	$.ajax({
		type: 'get',
		timeout: 10000,
		url: 'http://47.106.38.84:8000/v1/music/list',
		success: function (data) {
			for (let i = 0; i < data.data.length; i++) {
				data.data[i] = 'http://47.106.38.84:8000/' + data.data[i];
			}
			musicList = data.data;
			let source = `<source src="${musicList[0]}">`;
			$('#audio').html(source);
			// console.log('音乐列表 == > ', data);
		},
		error: function (err) {
			// console.log(err);
		},
		complete: function (XMLHttpRequest, status) {
			// console.log('XMLHttpRequest', XMLHttpRequest);
			// console.log('status', status);
		}
	});
	let musicListNum = 0;
	let playStatus = true;
	$('.player_btn').delegate('#play', 'click', function (e) {
		e.preventDefault();
		if (!playStatus) {
			playStatus = true;
			$('#audio')[0].play();
			let playerBtn = `<span id="last" class="last"></span>
							<span id="play" class="play"></span>
							<span id="next" class="next"></span>`;
			$('.player_btn').html(playerBtn);
		} else {
			playStatus = false;
			$('#audio')[0].pause();
			let playerBtn = `<span id="last" class="last"></span>
							<span id="play" class="suspend"></span>
							<span id="next" class="next"></span>`;
			$('.player_btn').html(playerBtn);
		}
	});
	$('.player_btn').delegate('#last', 'click', function (e) {
		e.preventDefault();
		musicListNum--;
		if (musicListNum == -1) musicListNum = musicList.length - 1;
		$('#audio')[0].src = musicList[musicListNum];
		$('#imgs').attr('src', musicImg[musicListNum]);
		$('#music_bg_animation').attr('src', musicImg[musicListNum]);
	});
	$('.player_btn').delegate('#next', 'click', function (e) {
		e.preventDefault();
		musicListNum++;
		if (musicListNum > musicList.length - 1) musicListNum = 0;
		$('#audio')[0].src = musicList[musicListNum];
		$('#imgs').attr('src', musicImg[musicListNum]);
		$('#music_bg_animation').attr('src', musicImg[musicListNum]);
	});
	$('#audio').bind('ended', function () {
		musicListNum++;
		if (musicListNum > musicList.length - 1) musicListNum = 0;
		$('#audio')[0].src = musicList[musicListNum];
		$('#imgs').attr('src', musicImg[musicListNum]);
		$('#music_bg_animation').attr('src', musicImg[musicListNum]);
	});
});