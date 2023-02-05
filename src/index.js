import fetchCountries from './fetchCountries.js';

import './css/styles.css';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 1500;

const inputField = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputField.addEventListener('input', debounce(getInputValue, DEBOUNCE_DELAY));

let currentInputValue = null;

function getInputValue(event) {
  currentInputValue = event.target.value.trim();
  console.log(currentInputValue);
  fetchCountry(currentInputValue);
}

// fetchCountry(currentInputValue)
//   .then(renderCountryInfo)
//   .catch(errorInput)
//   .finally();

function fetchCountry(country) {
  return fetch(
    `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(country => {
      console.log(country);
      return country;
    })
    .then(renderCountryInfo);
}

function renderCountryInfo(country) {
  console.log(country[0]);
  countryInfo.innerHTML = `<img src=${country[0].flags.svg} width = 60, height = 40><h2>${country[0].name.official}</h2><li>Capital: ${country[0].capital}</li>
    <li>Population: ${country[0].population}</li><li>Languages: ${country[0].languages}</li>`;
  //   console.log('ПРИВЕТ Я ИСКОМАЯ СТРАНА');
}

//

// Notiflix.Notify.success('Oops, there is no country with that name');

// Notiflix.Notify.failure('Oops, there is no country with that name');

// Notiflix.Notify.warning('Oops, there is no country with that name');

// Notiflix.Notify.info('Oops, there is no country with that name');
