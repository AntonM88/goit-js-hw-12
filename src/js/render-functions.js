export function imagesTemplate(arr) {
  return arr.map(imgTemplate).join('');
}

function imgTemplate(img) {
  return `<li class="gallery-item">
<div class='gallery'>
  <a class="img-link" href="${img.largeImageURL}">
    <img class="img-item" src="${img.webformatURL}" alt="${img.tags}" />
  </a>
</div>
<div class='text-box'>
        <p class="text">Likes ${img.likes}</p>
        <p class="text">Views ${img.views}</p>
        <p class="text">Comments ${img.comments}</p>
        <p class="text">Downloads ${img.downloads}</p>
  </div>
</li>`;
}
