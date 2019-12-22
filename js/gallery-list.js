"use strict";

import gallery from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  modalWindow: document.querySelector(".js-lightbox"),
  closeModalWindowBtn: document.querySelector(
    "button[data-action=close-lightbox]"
  ),
  boxOverlay: document.querySelector(".lightbox__content"),
  imgUrlCopy: new String(),
  count: 0
};

const createItemMurkup = ({ preview, original, description }) => {
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
  e.preventDefault();

  if (e.target === e.currentTarget) {
    return;
  }

  const urlImage = e.target.dataset.source;
  const altImage = e.target.getAttribute("alt");

  refs.imgUrlCopy = urlImage;

  replaceSourceImage(refs.modalWindow, urlImage, altImage);

  refs.modalWindow.classList.add("is-open");

  window.addEventListener("keydown", handleKeyPress);
  // window.addEventListener("keydown", leftPressKey);
  window.addEventListener("keydown", pressKeyRightAndLeft);
};

const closeModalWindow = () => {
  replaceSourceImage(refs.modalWindow, "", "");

  refs.modalWindow.classList.remove("is-open");

  window.removeEventListener("keydown", handleKeyPress);
  // window.removeEventListener("keydown", leftPressKey);
  window.removeEventListener("keydown", pressKeyRightAndLeft);
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

// function pressKeyRightAndLeft(e) {
//   refs.count = gallery.findIndex(item => item.original === refs.imgUrlCopy);

//   if (e.code === "ArrowLeft") {
//     refs.count = refs.count === 0 ? gallery.length - 1 : --refs.count;
//   }

//   if (e.code === "ArrowRight") {
//     refs.count = refs.count === gallery.length - 1 ? 0 : ++refs.count;
//   }

//   refs.imgUrlCopy = gallery[refs.count].original;
//   replaceSourceImage(refs.modalWindow, refs.imgUrlCopy, "altImage");

//   return;
// }

function pressKeyRightAndLeft(e) {
  refs.count = gallery.findIndex(item => item.original === refs.imgUrlCopy);
  // ок получил индекс элемента
  // но если он 0 то куда ты еще собираешься листать? по хорошему и кнопку надо задизеблить
  // на первом и последнем слайдах
  if (e.code === "ArrowLeft") {
    if (!e.code) return;
    --refs.count;
  } else {
    if (e.code === gallery.length - 1) return;
    ++refs.count;
  }
  refs.imgUrlCopy = gallery[refs.count].original;
  replaceSourceImage(refs.modalWindow, refs.imgUrlCopy, "altImage");
  return;
}

// if (refs.count === 0) {
//   refs.count = gallery.length - 1;
// } else {
//   refs.count--;
// }

// if (refs.count === gallery.length - 1) {
//   refs.count = 0;
// } else {
//   refs.count++;
// }

// function rightPressKey(e) {
//   // if (e.code !== "ArrowRight") {
//   //   return;
//   // }

//   // gallery.forEach((item, index) => {
//   //   if (refs.imgUrlCopy === item.original) {
//   //     refs.count = index;
//   //   }
//   // });

//   // if (refs.count === gallery.length - 1) {
//   //   refs.count = 0;

//   //   refs.imgUrlCopy = gallery[refs.count].original;
//   //   replaceSourceImage(refs.modalWindow, refs.imgUrlCopy, "altImage");
//   // } else {
//   //   refs.count++;

//   //   refs.imgUrlCopy = gallery[refs.count].original;
//   //   replaceSourceImage(refs.modalWindow, refs.imgUrlCopy, "altImage");
//   // }
// }

// function leftPressKey(e) {
//   // if (e.code !== "ArrowLeft") {
//   //   return;
//   // }

//   // gallery.forEach((item, index) => {
//   //   if (refs.imgUrlCopy === item.original) {
//   //     refs.count = index;
//   //   }
//   // });

//   // if (refs.count === 0) {
//   //   refs.count = gallery.length - 1;

//   //   refs.imgUrlCopy = gallery[refs.count].original;
//   //   replaceSourceImage(refs.modalWindow, refs.imgUrlCopy, "altImage");
//   // } else {
//   //   refs.count--;

//   //   refs.imgUrlCopy = gallery[refs.count].original;
//   //   replaceSourceImage(refs.modalWindow, refs.imgUrlCopy, "altImage");
//   // }
// }

refs.galleryList.addEventListener("click", handleListClick);
refs.closeModalWindowBtn.addEventListener("click", closeModalWindow);
refs.boxOverlay.addEventListener("click", handleBackDropClick);
