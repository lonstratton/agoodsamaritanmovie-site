// ----- Navigation -----
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.getElementById("site-nav");

const modal = document.getElementById("creditsModal");
const creditsLink = document.getElementById("credits-link");
const modalClose = document.querySelector("#creditsModal .modal-close");

const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const videoClose = document.querySelector(".video-close");

function closeMenu() {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
}

navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

siteNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

// ----- Credits Modal -----

function openCredits() {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalClose.focus();
}

function closeCredits() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    creditsLink.focus();
}

creditsLink.addEventListener("click", e => {
    e.preventDefault();
    openCredits();
});

modalClose.addEventListener("click", closeCredits);

modal.addEventListener("click", e => {
    if (e.target === modal) {
        closeCredits();
    }
});

// ----- Video Modal -----

document.querySelectorAll(".video-link").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        videoFrame.src = link.href + "?autoplay=1";
        videoModal.classList.add("open");
        videoModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        videoClose.focus();
    });
});

function closeVideo() {
    videoModal.classList.remove("open");
    videoModal.setAttribute("aria-hidden", "true");
    videoFrame.src = "";
    document.body.classList.remove("modal-open");
}

videoClose.addEventListener("click", closeVideo);

videoModal.addEventListener("click", e => {
    if (e.target === videoModal) {
        closeVideo();
    }
});


// ----- Keyboard Shortcuts -----

document.addEventListener("keydown", e => {

    if (e.key !== "Escape") return;

    if (modal.classList.contains("open")) {
        closeCredits();
    }

    if (videoModal.classList.contains("open")) {
        closeVideo();
    }

    closeMenu();

});

const contact = document.getElementById("footer-contact");

if (contact) {
    const email = [
        "ryanstrattonmusic",
        "gmail.com"
    ].join("@");

    contact.href = `mailto:${email}`;
    contact.textContent = "CONTACT";
}