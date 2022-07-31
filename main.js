

function getwheel(event) {

    const container = document.getElementById("container");

    if (event.deltaY > 0) {
        console.log(container.offsetHeight);
        console.log(container.getBoundingClientRect().top);
        console.log(window.innerHeight);
        console.log(container.getBoundingClientRect().top / window.innerHeight);
        throttle(window.scrollTo(0, (-container.getBoundingClientRect().top) + window.innerHeight), 1000);
        //window.scrollTo(0, (-container.getBoundingClientRect().top) + window.innerHeight);
    }
    else {
        throttle(window.scrollTo(0, (-container.getBoundingClientRect().top) - window.innerHeight), 1000);
        //window.scrollTo(0, (-container.getBoundingClientRect().top) - window.innerHeight);
    }
}

const throttle = (func, limit) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}


window.scrollTo({
    top: 0,
    behavior: "smooth"
});



/*
document.getElementById("page1").addEventListener("click", () => {
    window.scrollTo(0, window.innerHeight);

});
document.getElementById("page2").addEventListener("click", () => {
    window.scrollTo(0, -window.innerHeight);

});
document.getElementById("page3").addEventListener("click", () => {
    window.scrollTo(0, 0);

});
*/