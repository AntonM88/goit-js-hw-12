import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages, userParams } from './js/pixabay-api';

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
  btnLoad: document.querySelector('.js-btn-load'),
};

refs.formEl.addEventListener('submit', handleSubmit);
refs.btnLoad.addEventListener('click', onLoad);

function handleSubmit(e) {
  e.preventDefault();
  refs.galleryEl.innerHTML = '';
  hideBtnLoad();
  userParams.query = e.target.elements.query.value.trim();
  userParams.page = 1;

  showLoader();

  if (userParams.query === '') {
    noImageMessage('Please enter a search query', 'tomato');

    hideLoader();
    return;
  }

  renderImg(userParams.query);

  e.target.reset();
}

async function renderImg() {
  try {
    const {
      data: { hits, totalHits },
    } = await fetchImages(userParams.query);

    showBtnLoad();
    if (hits.length === 0) {
      hideBtnLoad();
      noImageMessage(
        'Sorry, there are no images matching your search query. Please try again!',
        'red'
      );
      return;
    }

    refs.galleryEl.innerHTML = imagesTemplate(hits);

    lightbox.refresh();

    if (totalHits < userParams.perPage) {
      hideBtnLoad();
    } else {
      showBtnLoad();
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}

async function onLoad() {
  showLoader();

  userParams.page += 1;

  try {
    const {
      data: { hits, totalHits },
    } = await fetchImages();

    if (hits.length === 0) {
      noImageMessage(
        'We are sorry, but you`ve reached the end of search results',
        'DeepSkyBlue'
      );

      hideBtnLoad();

      return;
    }

    const lastPage = Math.ceil(totalHits / userParams.perPage);

    if (lastPage === userParams.page) {
      hideBtnLoad();
    }

    refs.galleryEl.insertAdjacentHTML('beforeend', imagesTemplate(hits));

    scrollPage();

    lightbox.refresh();
  } catch (error) {
    noImageMessage('Error', 'red');
  } finally {
    hideLoader();
    scrollPage();
  }
}

// ==================

function noImageMessage(message, backgroundColor) {
  iziToast.error({
    title: '',
    message,
    position: 'topRight',
    backgroundColor,
    messageColor: 'white',
  });
}

// ==================

function showLoader() {
  refs.loader.classList.remove('is-hidden');
}

function hideLoader() {
  refs.loader.classList.add('is-hidden');
}

// ==================

function showBtnLoad() {
  refs.btnLoad.classList.remove('is-hidden');
}

function hideBtnLoad() {
  refs.btnLoad.classList.add('is-hidden');
}

// ==================

function scrollPage() {
  const liEl = refs.galleryEl.firstChild;
  const height = liEl.getBoundingClientRect().height;

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
