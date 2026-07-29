// ----- Image Lightbox -----
const imageModal = document.getElementById("imageModal");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const imageClose = document.querySelector(".image-close");
const galleryLinks = [...document.querySelectorAll(".gallery-item a")];

let currentIndex = 0;

const prevButton = document.querySelector(".lightbox-nav.prev");
const nextButton = document.querySelector(".lightbox-nav.next");

galleryLinks.forEach((link, index) => {

    link.addEventListener("click", e => {

        e.preventDefault();
        currentIndex = index;
        console.log("Lightbox clicked");

        showImage(index);

        imageModal.classList.add("open");
        imageModal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

        imageClose.focus();

    });

});

function showImage(index) {

    currentIndex = index;

    const link = galleryLinks[currentIndex];
    const img = link.querySelector("img");

    lightboxImage.src = link.href;
    lightboxImage.alt = img.alt;

    const caption =
        link.closest(".gallery-item")
        .querySelector("figcaption");

    lightboxCaption.textContent =
        caption ? caption.textContent : "";
}

prevButton.addEventListener("click", () => {

    currentIndex =
        (currentIndex - 1 + galleryLinks.length) %
        galleryLinks.length;

    showImage(currentIndex);

});

nextButton.addEventListener("click", () => {

    currentIndex =
        (currentIndex + 1) %
        galleryLinks.length;

    showImage(currentIndex);

});

function closeImage() {

    imageModal.classList.remove("open");

    imageModal.setAttribute("aria-hidden", "true");

    lightboxImage.src = "";

    document.body.classList.remove("modal-open");

}

imageClose.addEventListener("click", closeImage);

imageModal.addEventListener("click", e => {

    if (e.target === imageModal) {

        closeImage();

    }

});
// ----- Keyboard Shortcuts -----

document.addEventListener("keydown", e => {

    if (!imageModal.classList.contains("open")) return;

    if (e.key === "Escape") {
        closeImage();
        return;
    }

    if (e.key === "ArrowLeft") {
        prevButton.click();
    }

    if (e.key === "ArrowRight") {
        nextButton.click();
    }

});