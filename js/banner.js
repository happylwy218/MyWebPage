$(function () {
    // 自动轮播
    let banners = $('.banner_box img');
    let count = 1;
    let timer = null;
    banners[0].className = 'banner_show';
    timerPlay();

    function timerPlay() {
        timer = setInterval(() => {
            count++
            if (count > banners.length) count = 1;
            for (let i = 0; i < banners.length; i++) {
                banners[i].className = 'banner_hide'
            }
            banners[count - 1].className = 'banner_show';
        }, 3000);
    }

    let bannerBox = $('.banner_box');
    bannerBox[0].onmouseover = function () {
        clearInterval(timer);
        timer = null;
        // console.log('我停止了定时器');
    };
    bannerBox[0].onmouseout = function () {
        timerPlay();
        // console.log('我开启了定时器');
    };

    $('#let_last').click(function (e) {
        e.preventDefault();
        count--
        if (count === 0) count = 3;
        for (let i = 0; i < banners.length; i++) {
            banners[i].className = 'banner_hide'
        }
        banners[count - 1].className = 'banner_show';
    });

    $('#let_next').click(function (e) {
        e.preventDefault();
        count++
        if (count > banners.length) count = 1;
        for (let i = 0; i < banners.length; i++) {
            banners[i].className = 'banner_hide'
        }
        banners[count - 1].className = 'banner_show';
    });
});