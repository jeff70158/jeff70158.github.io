//將 container height 設為當前 window height
var container = document.getElementById("page-container");
//獲得 window height
var window_height = document.documentElement.clientHeight;
//獲得頁面個數
var page_num = document.getElementsByClassName("page").length;
//將當前 window 與頂部的距離設為 0
var current_position = 0;
//設定 container height
container.style.height = window_height + "px";

function goDown() {
    if (current_position > -window_height * (page_num - 1)) {
        current_position = current_position - window_height;
        container.style.top = current_position + "px";
    }
}

function goUp() {
    if (current_position < 0) {
        current_position = current_position + window_height;
        container.style.top = current_position + "px";
    }
}

function wheelThrottle(fn, wait_time) {
    //獲得當前的時間
    let current_time = Date.now();
    return function () {
        if (((current_time + wait_time) - Date.now()) < 0) {
            fn.apply(this, arguments);
            current_time = Date.now();
        }
    };
}

function scrollMove(e) {
    if (e.deltaY > 0)
        goDown();
    else
        goUp();
}

var wheel_func = wheelThrottle(scrollMove, 1000);

if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
    //如果使用的不是firefox，進行這項設定
    document.addEventListener("mousewheel", wheel_func);
} else {
    //否則進行這項設定
    document.addEventListener("DOMMouseScroll", wheel_func);
}

//手機端的設定
var touch_start_y = 0;
document.addEventListener("touchstart", (e) => {
    touch_start_y = e.touches[0].pageY;
});
function touchMove(e) {
    var touch_end_y = e.changedTouches[0].pageY;
    if (touch_end_y - touch_start_y < 0)
        goDown();
    else
        goUp();
}

var touch_func = wheelThrottle(touchMove, 500);
document.addEventListener('touchend', touch_func);