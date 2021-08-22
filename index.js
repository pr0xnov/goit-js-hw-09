import galleryItems from "./js/app.js";

const galleryList = document.querySelector(".js-gallery");
const lightBox = document.querySelector(".js-lightbox");
const lightBoxImage = document.querySelector(".lightbox__image");
const overlay = document.querySelector(".lightbox__overlay");

const galleryCards = createGalerryElements(galleryItems);

galleryList.addEventListener("click", ongalleryListClick);
galleryList.insertAdjacentHTML("beforeend", galleryCards);

function createGalerryElements(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

function ongalleryListClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const elem = evt.target;
  const srcElem = elem.dataset.source;
  onOpenModal();
  lightBoxImage.src = srcElem;
}

function onOpenModal(evt) {
  lightBox.classList.add("is-open");
  const btnClose = document.querySelector(".lightbox__button");

  btnClose.addEventListener("click", onCloseModal);
  window.addEventListener("keydown", onEscKeyPress);
  window.addEventListener('keydown', onRightButtonPressed);
  window.addEventListener('keydown', onLeftButtonPressed);
}

function onCloseModal(el) {
  lightBox.classList.remove("is-open");

  lightBoxImage.src = '';
  lightBoxImage.alt = '';

  window.removeEventListener("keydown", onEscKeyPress);
  window.removeEventListener('keydown', onRightButtonPressed);
  window.removeEventListener('keydown', onLeftButtonPressed);
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = "Escape";
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

overlay.addEventListener("click", onOverlayClick);
function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

const onRightButtonPressed = (event) => {
  if (event.code !== "ArrowRight") {
    return;
  }

  const currentItemIndex = galleryItems.findIndex(
    (item) => item.original === lightBoxImage.src
  );

  const nextGalleryItem = galleryItems[currentItemIndex + 1];

  if (nextGalleryItem) {
    lightBoxImage.src = nextGalleryItem.original;
    lightBoxImage.alt = nextGalleryItem.alt;
  }
};

const onLeftButtonPressed = (event) => {
  if (event.code !== "ArrowLeft") {
    return;
  }

  const currentItemIndex = galleryItems.findIndex(
    (item) => item.original === lightBoxImage.src
  );

  const prevItemIndex = currentItemIndex - 1;

  const prevGalleryItem = galleryItems[prevItemIndex];

  if (prevGalleryItem) {
    lightBoxImage.src = prevGalleryItem.original;
    lightBoxImage.alt = prevGalleryItem.alt;
  }
};
