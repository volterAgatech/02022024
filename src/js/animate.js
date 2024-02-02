//hi from left
const title = document.querySelector("#mtitle");
const subTitle = document.querySelector("#msubtitle");
const service = document.querySelector("#mservice");
//hi from right

const form = document.querySelector("#mform");
const bg1 = document.querySelector("#mbg1");
const bg2 = document.querySelector("#mbg2");

//прокручиваем body
let step = 0;
let elem;
console.log(document.body.clientWidth);
if (document.body.clientWidth > 1000) {
    elem = document.body;

    if (elem.addEventListener) {
        if ("onwheel" in document) {
            // IE9+, FF17+
            elem.addEventListener("wheel", onWheel);
        } else if ("onmousewheel" in document) {
            // устаревший вариант события
            elem.addEventListener("mousewheel", onWheel);
        } else {
            // Firefox < 17
            elem.addEventListener("MozMousePixelScroll", onWheel);
        }
    } else {
        // IE8-
        elem.attachEvent("onmousewheel", onWheel);
    }

    let sum = 0;
    // Это решение предусматривает поддержку IE8-
    function onWheel(e) {
        e = e || window.event;

        // deltaY, detail содержат пиксели
        // wheelDelta не дает возможность узнать количество пикселей
        // onwheel || MozMousePixelScroll || onmousewheel
        let delta = e.deltaY || e.detail || e.wheelDelta;

        sum = sum + delta;
        console.log(sum);
        if (sum > 1000) {
            title.classList.add("show");
        }
        if (sum > 2000) {
            subTitle.classList.add("show");
        }
        if (sum > 4000) {
            service.classList.add("show");
        }
        if (sum > 5000) {
            bg1.classList.add("show");
        }
        if (sum > 6000) {
            form.classList.add("show");
        }
        if (sum > 7000) {
            bg2.classList.add("show");
        }

        //e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }
} else {
    //я бы все переписал 
    elem = document.body;
    elem.style.overflow = "hidden";
    let startY, endY;
    let deltaY;
    document.addEventListener(
        "touchmove",
        (e) => {
            e.preventDefault();
        },
        { passive: false }
    );

    document.addEventListener("touchstart", function (event) {
        startY = event.touches[0].clientY;
    });

    document.addEventListener("touchmove", function (event) {
        endY = event.touches[0].clientY;
        deltaY = startY - endY;

        step++;
        console.log(deltaY);
        if (deltaY < -50) {
            document.querySelector("#top").scrollIntoView({
                behavior: "smooth",
            });
        }
        mobileAnimation(step);
    });
}
function mobileAnimation(step) {
    if (step > 10) {
        title.classList.add("show");
    }
    if (step > 20) {
        subTitle.classList.add("show");
    }
    if (step > 40) {
        service.classList.add("show");
    }
    if (step > 60) {
        form.classList.add("show");
        document.querySelector("#topright").scrollIntoView({
            behavior: "smooth",
        });
        setTimeout(() => {
            bg2.classList.add("show");
            elem.style.overflow = "auto";

        }, 1000);
    }
}
