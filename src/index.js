import fetchCountries from './fetchCountries.js';

import './css/styles.css';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

fetch('https://restcountries.com/v3.1/name/usa')
  .then(response => {
    return response.json();
  })
  .then(country => {
    console.log(country);
  })
  .catch(error => {
    Notiflix.Notify.success('Oops, there is no country with that name');
    console.log(error);
  });

// Notiflix.Notify.success('Oops, there is no country with that name');

// Notiflix.Notify.failure('Oops, there is no country with that name');

// Notiflix.Notify.warning('Oops, there is no country with that name');

// Notiflix.Notify.info('Oops, there is no country with that name');
