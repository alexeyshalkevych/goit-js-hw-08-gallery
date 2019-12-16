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
let imgU;
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
  imgU = urlImage;
  console.log(urlImage);

  replaceSourceImage(refs.modalWindow, urlImage, altImage);

  refs.modalWindow.classList.add("is-open");

  window.addEventListener("keydown", handleKeyPress);
  window.addEventListener("keydown", leftClick);
  window.addEventListener("keydown", rightClick);
};

const closeModalWindow = () => {
  replaceSourceImage(refs.modalWindow, "", "");

  refs.modalWindow.classList.remove("is-open");

  window.removeEventListener("keydown", handleKeyPress);
  window.removeEventListener("keydown", leftClick);
  window.removeEventListener("keydown", rightClick);
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
let k;
function rightClick(e) {
  if (e.code !== "ArrowRight") {
    return;
  }
  let count;
  gallery.forEach((item, index) => {
    

    if (imgU === item.original) {
      count = index + 1;
    }
    if (count === gallery.length) {
     
      console.log("bla");
      console.log(index);
    }
    if (count === index) {
      imgU = item.original;
      replaceSourceImage(refs.modalWindow, imgU, "altImage");

      // console.log(count);
      // console.log(imgU);
    }

   

    // console.log(item.original);
  });

  console.log(e.code);
}

function leftClick(e) {
  if (e.code !== "ArrowLeft") {
    return;
  }
  let count = gallery.length;
  gallery.forEach((item, index) => {
    if (imgU === item.original) {
      count = index - 1;
    }

    if (count === index) {
      imgU = item.original;
      replaceSourceImage(refs.modalWindow, imgU, "altImage");
    }

    // console.log(item.original);
  });

  console.log(e.code);
}

refs.galleryList.addEventListener("click", handleListClick);
refs.closeModalWindowBtn.addEventListener("click", closeModalWindow);
refs.boxOverlay.addEventListener("click", handleBackDropClick);
