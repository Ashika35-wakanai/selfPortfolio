let z = 10;        // the window you touch last goes on top
let opened = 0;    // so new windows don't cover each other exactly

// Show or hide the nav
function toggleNav() {
    document.getElementById("Nav").classList.toggle("show");
    document.getElementById("slime-hint").classList.add("gone");
}

// Open a window: middle of the screen, a little lower each time
function openPopup(id) {
    const win = document.getElementById(id);
    win.classList.add("open");
    z++;
    win.style.zIndex = z;

    const shift = (opened % 4) * 22;
    opened++;

    const x = (window.innerWidth - win.offsetWidth) / 2 + shift;
    win.style.left = Math.max(0, Math.min(x, window.innerWidth - win.offsetWidth)) + "px";
    win.style.top = (90 + shift) + "px";
}

// Close a window
function closePopup(id) {
    document.getElementById(id).classList.remove("open");
}

// Keep windows inside the screen when the screen size changes
window.onresize = function () {
    document.querySelectorAll(".window.open").forEach(function (win) {
        const maxX = window.innerWidth - win.offsetWidth;
        win.style.left = Math.max(0, Math.min(win.offsetLeft, maxX)) + "px";
    });
};

// ----- ZOOM -----
function zoomImage(img) {
    document.getElementById("zoom-img").src = img.src;
    document.getElementById("zoom").classList.add("open");
}

function closeZoom() {
    document.getElementById("zoom").classList.remove("open");
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeZoom();
});

// ----- CERTIFICATES CAROUSEL -----
function slideCerts(direction) {
    const row = document.getElementById("cert-row");
    row.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: "smooth" });
}

// ----- DRAG WINDOWS (mouse or finger, by the dark bar) -----
document.querySelectorAll(".window").forEach(function (win) {
    const bar = win.querySelector(".window-title");

    win.onpointerdown = function () {
        z++;
        win.style.zIndex = z;
    };

    bar.onpointerdown = function (e) {
        if (e.target.tagName === "BUTTON") return;

        const dx = e.clientX - win.offsetLeft;
        const dy = e.clientY - win.offsetTop;

        bar.setPointerCapture(e.pointerId);

        bar.onpointermove = function (e) {
            let x = e.clientX - dx;
            let y = e.clientY - dy;

            x = Math.max(0, Math.min(x, window.innerWidth - win.offsetWidth));
            y = Math.max(0, Math.min(y, window.innerHeight - 40));

            win.style.left = x + "px";
            win.style.top = y + "px";
        };

        bar.onpointerup = function () {
            bar.onpointermove = null;
        };
    };
});