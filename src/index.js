import './css/styles.css';
import { countryFetch } from './countryFetch';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
// var debounce = require('lodash.debounce');

const variables = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  сountryСard: document.querySelector('.country-info'),
};

console.log(variables.input);
variables.input.addEventListener('input', countrySearch);

function countrySearch(el) {
  const country = el.target.value;
  console.log(country);
  if (country === '') {
    return;
  }
  variables.ul.innerHTML = '';
  setTimeout(log => {
    countryFetch(country)
      .then(res => {
        let object = res.length;
        variables.ul.innerHTML = '';

        if (object >= 2 && object <= 10) {
          titleRender(res);
        } else {
          fullRender(res);
        }

        if (object >= 10) {
          return Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(error => {
        console.log(error);
        variables.ul.innerHTML = '';
        return Notiflix.Notify.failure(
          `"Oops, there is no country with that name"`
        );
      });
  }, DEBOUNCE_DELAY);
}

function fullRender(res) {
  res.map(({ name, capital, population, flags, languages }) => {
    return (variables.ul.innerHTML += `<li class="full-country-list">
        <div class="full-country-list__div">
          <img class="full-country-list__img" src="${
            flags.png
          }" alt="${name}" width="50px" height="35px"/>
          <h1 class="full-country-list__country">${name.official}</h1>
        </div>
        <p class="full-country-list__capital">Capital: ${capital}</p>
        <p class="full-country-list__population">Population: ${population}</p>
        <p class="full-country-list__language">Languages: ${Object.values(
          languages
        )}</p>
        </li>`);
  });
}

function titleRender(res) {
  res.map(({ name, flags }) => {
    return (variables.ul.innerHTML += `<li class="country-list__li">
        <img src="${flags.png}" alt="${name}" width="60px" height="45px"/>
        <h1>${name.official}</h1>
        </li>`);
  });
}
