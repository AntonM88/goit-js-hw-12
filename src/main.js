import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchImages } from './js/pixabay-api';
import { imagesTemplate } from './js/render-functions';

let lightbox = new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
  formEl: document.querySelector('.js-form'),
  inputEl: document.querySelector('.js-input'),
  galleryEl: document.querySelector('.js-gallery'),
  loader: document.querySelector('.loader'),
};

refs.formEl.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  refs.galleryEl.innerHTML = '';

  showLoader();

  const userRequest = refs.inputEl.value.trim();

  if (userRequest === '') {
    noImageMessage();
    return;
  }

  searchImages(userRequest)
    .then(img => {
      if (img.hits.length === 0) {
        noImageMessage();
        return;
      }
      const markup = imagesTemplate(img.hits);
      refs.galleryEl.innerHTML = markup;
      lightbox.refresh();
    })

    .catch(console.log)
    .finally(() => {
      hideLoader();
      e.target.reset();
    });
}

function noImageMessage() {
  iziToast.error({
    title: 'Error',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
    backgroundColor: 'tomato',
    messageColor: 'white',
  });
}

function showLoader() {
  refs.loader.classList.remove('is-hidden');
}

function hideLoader() {
  refs.loader.classList.add('is-hidden');
}
