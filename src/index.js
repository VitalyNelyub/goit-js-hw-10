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
      //   preRenderCountries;
      return country;
    })
    .then(preRenderCountries)
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountryInfo(country) {
  console.log(country[0]);
  countryInfo.innerHTML = `<img src=${
    country[0].flags.svg
  } width = 150, height = 90><h2>${
    country[0].name.official
  }</h2><ul><li>Capital: ${country[0].capital}</li>
    <li>Population: ${
      country[0].population
    } citizens</li><li>Languages: ${Object.values(
    country[0].languages
  )}</li></ul>`;
  //   console.log('ПРИВЕТ Я ИСКОМАЯ СТРАНА');
}

// preRenderCountries()

function preRenderCountries(country) {
  country.map(e => {
    countryList.innerHTML += `<li><img src=${e.flags.svg} width = 60, height = 40><h2>${e.name.official}</h2></li>`;
  });
 }

// function preRenderCountries(country) {
//   for (let i = 0; i <= country.length; i++) console.log([i]);
//   countryList.insertAdjacentHTML(
//     'beforeend',
//     `<li><img src=${country[i].flags.svg} width = 60, height = 40><h2>${country[i].name.official}</h2></li>`
//   );
// }

//

// Notiflix.Notify.success('Oops, there is no country with that name');

// Notiflix.Notify.failure('Oops, there is no country with that name');

// Notiflix.Notify.warning('Oops, there is no country with that name');

// Notiflix.Notify.info('Oops, there is no country with that name');
