// ===========
// BELLINGHAM
// ===========
console.log("RIDLEYLAB initialized");


// ======
// PEDRI
// ======
document.addEventListener("DOMContentLoaded", () => {

    console.log("All sections loaded");

    initPageMode();
    initHeaderScroll();
    initSmoothScroll();
    initActiveNav();
});


// ======
// YAMAL
// ======
function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}


// =========
// MO SALAH
// =========
function initPageMode() {

    const header = document.querySelector("#ridleyHeader");

    if (!header) return;

    const page = document.body.classList;

    let mode = "home";

    if (page.contains("page-online-course")) {
        mode = "course";
    }

    if (page.contains("page-offline-mentoring")) {
        mode = "mentoring";
    }

    header.classList.add(`mode-${mode}`);
}


// =======
// ZIDANE
// =======
function initHeaderScroll() {

    const header = document.querySelector("#ridleyHeader");

    if (!header) return;

    const update = () => {

        if (window.scrollY > 40) {

            header.classList.add("is-scrolled");
            header.classList.remove("is-top");

        } else {

            header.classList.add("is-top");
            header.classList.remove("is-scrolled");
        }
    };

    update();

    window.addEventListener("scroll", update);
    window.addEventListener("load", update);
}


// =====
// ÖZIL
// =====
function initActiveNav() {

    const links = document.querySelectorAll("#ridleyHeader nav a");

    if (!links.length) return;

    const currentPath = window.location.pathname;

    links.forEach(link => {

        const href = link.getAttribute("href");

        if (!href) return;

        if (href === currentPath) {
            link.classList.add("active");
        }
    });
}