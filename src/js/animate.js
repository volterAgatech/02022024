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
elem = document.body;

if (document.body.clientWidth > 1000) {

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
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);

    let yperem = null;
    let step = 0;
    function handleTouchStart(event) {
        // обработка события touchmove
        const touch = event.touches[0];
        yperem = touch.clientY;
       
    }
    function handleTouchMove(event) {
        if(!yperem){
            return false;
        }
        
        let yperemEnd = event.touches[0].clientY;
        let yDiff = yperemEnd - yperem;
        // обработка события touchmove
        if(yDiff < 0){
            step++;
        }
        if (step == 1) {
            title.classList.add("show");
        }
        if (step == 2) {
            subTitle.classList.add("show");
        }
        if (step == 3) {
            service.classList.add("show");
        }
        if (step == 4) {
           // 
           document.addEventListener("scroll", function() {
            console.clear();
            
            console.log(
              "↓↑ end:", this.scrollHeight === this.scrollTop + this.clientHeight,
          
              this.scrollHeight, this.scrollTop, this.clientHeight
            );
              
            console.log(
              "←→ end:", this.scrollWidth === this.scrollLeft + this.clientWidth,
          
              this.scrollWidth, this.scrollLeft, this.clientWidth
            );
          });
           //
            document.querySelector("#topright").scrollIntoView({
                behavior: "smooth",
            });
            elem.style.position = "relative";
            
            setTimeout(() => {
                form.classList.add("show");
                bg2.classList.add("show");
                //elem.style.position = "";
                elem.style.overflow = "auto";
                
            }, 1000);
        }
        yperem = null;
    }
}
