import{S as c,i as u}from"./assets/vendor-8c59ed88.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();function d(t){const o="https://pixabay.com",s="/api/",n=new URLSearchParams({key:"43998127-099fd85a2e7628fabdc2ccde0",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0}),e=`${o}${s}?${n}`;return fetch(e).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()})}function f(t){return t.map(m).join("")}function m(t){return`<li class="gallery-item">
<div class='gallery'>
  <a class="img-link" href="${t.largeImageURL}">
    <img class="img-item" src="${t.webformatURL}" alt="${t.tags}" />
  </a>
</div>
<div class='text-box'>
        <p class="text">Likes ${t.likes}</p>
        <p class="text">Views ${t.views}</p>
        <p class="text">Comments ${t.comments}</p>
        <p class="text">Downloads ${t.downloads}</p>
  </div>
</li>`}let p=new c(".js-gallery a",{captionsData:"alt",captionDelay:250});const a={formEl:document.querySelector(".js-form"),inputEl:document.querySelector(".js-input"),galleryEl:document.querySelector(".js-gallery"),loader:document.querySelector(".loader")};a.formEl.addEventListener("submit",h);function h(t){t.preventDefault(),a.galleryEl.innerHTML="",g();const o=a.inputEl.value.trim();if(o===""){l();return}d(o).then(s=>{if(s.hits.length===0){l();return}const n=f(s.hits);a.galleryEl.innerHTML=n,p.refresh()}).catch(console.log).finally(()=>{y(),t.target.reset()})}function l(){u.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"tomato",messageColor:"white"})}function g(){a.loader.classList.remove("is-hidden")}function y(){a.loader.classList.add("is-hidden")}
//# sourceMappingURL=commonHelpers.js.map
