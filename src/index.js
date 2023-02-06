import fetchCountries from './fetchCountries.js';

import './css/styles.css';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

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
        if (currentInputValue === '') {
          countryList.innerHTML = '';
          countryInfo.innerHTML = '';
        } else if (country.length > 10) {
          Notiflix.Notify.warning(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (country.length > 1 && country.length < 10) {
          console.log(country.length);
          preRenderCountries(country);
          countryInfo.innerHTML = '';
          // return country;
        } else if (country.length <= 1 && country.length > 0) {
          console.log(country);
          renderCountryInfo(country);
          countryList.innerHTML = '';
        }
    })
    .catch(error => {
      console.log('ERRRRRRROOOORRRR');
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
}

function preRenderCountries(country) {
  country.map(e => {
    countryList.innerHTML += `<li><img src=${e.flags.svg} width = 60, height = 40><h2>${e.name.official}</h2></li>`;
  });
}
