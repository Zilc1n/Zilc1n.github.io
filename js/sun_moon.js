function switchNightMode() {
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>');

    setTimeout(function () {
        const body = document.querySelector('body');
        const modeIcon = document.getElementById('modeicon');

        if (body.classList.contains('DarkMode')) {
            body.classList.remove('DarkMode');
            localStorage.setItem('isDark', '0');
            modeIcon.setAttribute('xlink:href', '#icon-moon');
        } else {
            body.classList.add('DarkMode');
            localStorage.setItem('isDark', '1');
            modeIcon.setAttribute('xlink:href', '#icon-sun');
        }

        setTimeout(function () {
            const darkSky = document.getElementsByClassName('Cuteen_DarkSky')[0];
            darkSky.style.transition = 'opacity 3s';
            darkSky.style.opacity = '0';

            setTimeout(function () {
                darkSky.remove();
            }, 1000);
        }, 2000);
    });

    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

    if (nowMode === 'light') {
        activateDarkMode();
        saveToLocal.set('theme', 'dark', 2);

        if (GLOBAL_CONFIG.Snackbar !== undefined) {
            btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
        }

        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');
    } else {
        activateLightMode();
        saveToLocal.set('theme', 'light', 2);
        document.querySelector('body').classList.add('DarkMode');
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');
    }

    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme();
    typeof FB === 'object' && window.loadFBComment();
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);
}

//动态标题
var OriginTitile = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        //离开当前页面时标签显示内容
        document.title = 'w(ﾟДﾟ)w 不要走！再看看嘛！';
        clearTimeout(titleTime);
    }
    else {
        //返回当前页面时标签显示内容
        document.title = '♪(^∇^*)欢迎回来！' + OriginTitile;
        //两秒后变回正常标题
        titleTime = setTimeout(function () {
            document.title = OriginTitile;
        }, 2000);
    }
});