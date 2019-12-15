"use strict";

import gallery from "./gallery-items.js";
{
  /* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li> */
}

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  modalWindow: document.querySelector(".js-lightbox"),
  closeModalWindowBtn: document.querySelector(
    "button[data-action=close-lightbox]"
  ),
  boxOverlay: document.querySelector(".lightbox__content")
};

const createItemMurkup = ({ preview, original, description }) => {
  return `
  <li class="gallery__item">
    <a
      class="gallery__link"
      href="asd${original}asd"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
  `;
};

const createListItem = items =>
  items.reduce((markup, item) => (markup += createItemMurkup(item)), "");

const renderItems = (parentRef, elemet) => {
  parentRef.insertAdjacentHTML("beforeend", elemet);
};

const murkup = createListItem(gallery);

renderItems(refs.galleryList, murkup);

const replaceSourceImage = (item, newSource, newAlt) => {
  const imageItem = item.querySelector(".lightbox__image");

  imageItem.setAttribute("src", newSource);
  imageItem.setAttribute("alt", newAlt);
};

const handleListClick = e => {
  if (e.target === e.currentTarget) {
    return;
  }

  const urlImage = e.target.dataset.source;
  const altImage = e.target.getAttribute("alt");

  replaceSourceImage(refs.modalWindow, urlImage, altImage);

  refs.modalWindow.classList.add("is-open");

  window.addEventListener("keydown", handleKeyPress);
};

const closeModalWindow = () => {
  replaceSourceImage(refs.modalWindow, "", "");

  refs.modalWindow.classList.remove("is-open");

  window.removeEventListener("keydown", handleKeyPress);
  // window.removeEventListener("keydown", leftClick);
  // window.removeEventListener("keydown", rightClick);
};

const handleBackDropClick = e => {
  if (e.target !== e.currentTarget) {
    return;
  }

  closeModalWindow();
};

function handleKeyPress(e) {
  e.preventDefault();

  if (e.code !== "Escape") {
    return;
  }

  closeModalWindow();
}

refs.galleryList.addEventListener("click", handleListClick);
refs.closeModalWindowBtn.addEventListener("click", closeModalWindow);
refs.boxOverlay.addEventListener("click", handleBackDropClick);
