function initVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
}
initVh();
let menu = document.querySelector(".menu-contain");
let subMenu = document.querySelector(".sub-menu");
let subMenuM = document.querySelector(".header__mobil-nav .sub-menu");

let mobmenu = document.querySelector(".header__mobil-nav .menu-contain");
let mobilBtn = document.querySelector("button.btn.mobile-menu");

let popupBtn = document.querySelector(".btn.popupbtn");
let popup = document.querySelector(".popupform");
let closePopup = document.querySelector(".btn.small");
//headermenu
menu.addEventListener("click", () => {
    subMenu.classList.toggle("show");
});
//popup form show hide
closePopup.addEventListener("click", () => {
    popup.classList.remove("show");
});
popupBtn.addEventListener("click", () => {
    popup.classList.toggle("show");
});
//mobilemenu
mobmenu.addEventListener("click", () => {
    subMenuM.classList.toggle("show");
});
mobilBtn.addEventListener("click", () => {
    document.querySelector(".header__mobil-navcontainer").classList.add("show");
    document.body.style.overflow = "hidden";
});
document.querySelector(".closebtn").addEventListener("click", () => {
    document
        .querySelector(".header__mobil-navcontainer")
        .classList.remove("show");
    document.body.style.overflow = "auto";
});
document.querySelector("#myForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let art = document.querySelector("#articule").value;
    let data_body = "art=" + art;
    let jsonIner = document.querySelector(".stat");

    function parseJsone(jsone) {
        if (jsone == "nodata") {
            jsonIner.innerHTML = "<h2>Нет даты</h2>";
        } else {
            jsone = JSON.parse(jsone);

            const table = document.getElementById("productTable");

            jsone.forEach((product) => {
                const row = document.createElement("tr");
                row.innerHTML = `
              <td>${product.art}</td>
              <td>${product.brand}</td>
              <td>${product.d_deliv}</td>
              <td>${product.grid}</td>
              <td>${product.h_deliv}</td>
              <td>${product.is_returnable}</td>
              <td>${product.kr}</td>
              <td>${product.name}</td>
              <td>${product.num}</td>
              <td>${product.price}</td>
              <td>${product.whse}</td>
          `;
                table.appendChild(row);
            });
        }
    }
    fetch("./api/functions.php", {
        method: "POST",
        body: data_body,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    })
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject();
            }
            return response.text();
        })
        .then((i) => parseJsone(i));

    // Ваш код для обработки формы здесь
});
//скрипты для модалного окна в шапке сайта
document
    .querySelector("#mypopupform")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        let email = document.querySelector("#pemail").value;
        let data_body = "email=" + email;
        fetch("./api/mailer/mail.php", {
            method: "POST",
            body: data_body,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
        })
            .then((response) => {
                if (response.status !== 200) {
                    return Promise.reject();
                }
                return response.text();
            })
            .then((i) => parseJsone(i));
    });
