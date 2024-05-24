import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const userParams = {
  query: '',
  page: 1,
  perPage: 15,
  maxPAge: '',
};

export function fetchImages() {
  const params = {
    params: {
      key: '43998127-099fd85a2e7628fabdc2ccde0',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      q: userParams.query,
      page: userParams.page,
      per_page: userParams.perPage,
    },
  };

  return axios.get('', params);
}
