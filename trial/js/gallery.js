// ----- Image Lightbox -----
const imageModal = document.getElementById("imageModal");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const imageClose = document.querySelector(".image-close");
let galleryLinks = [];
let currentIndex = 0;

const prevButton = document.querySelector(".lightbox-nav.prev");
const nextButton = document.querySelector(".lightbox-nav.next");

document.querySelectorAll(".gallery-item a").forEach(link => {

    link.addEventListener("click", e => {

        e.preventDefault();

        const gallery =
            link.closest(".gallery-stills, .gallery-bts");

        galleryLinks = [...gallery.querySelectorAll(".gallery-item a")];

        currentIndex = galleryLinks.indexOf(link);

        showImage(currentIndex);

        imageModal.classList.add("open");
        imageModal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

        updateNavButtons();

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
    
    updateNavButtons();    
}

prevButton.addEventListener("click", () => {

    if (currentIndex > 0) {
		currentIndex--;
		showImage(currentIndex);
		updateNavButtons();
	}

});

nextButton.addEventListener("click", () => {

    if (currentIndex < galleryLinks.length - 1) {
		currentIndex++;
		showImage(currentIndex);
		updateNavButtons();
	}

});

function updateNavButtons() {

    prevButton.disabled = (currentIndex === 0);

    nextButton.disabled =
        (currentIndex === galleryLinks.length - 1);

}

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