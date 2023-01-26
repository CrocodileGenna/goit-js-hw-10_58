import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';

const variables = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
};
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 400;
variables.input.addEventListener(
  'input',
  debounce(serchCounrty, DEBOUNCE_DELAY)
);
console.log('hi');
function serchCounrty(country) {
  let nameCountry = country.target.value;
  fetchCountries(nameCountry)
    .then(countrys => {
      if (nameCountry === '') {
        variables.ul.innerHTML = '';
        return;
      }
      if (countrys.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        variables.ul.innerHTML = '';
        return;
      }
      if (countrys.length >= 3 && countrys.length < 10) {
        variables.ul.innerHTML = '';
        titleCountryCard(countrys);
      } else {
        variables.ul.innerHTML = '';
        fullCountryCard(countrys);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(
        `Oops, there is no country with that ${nameCountry}`
      );
    });
}
function titleCountryCard(countrys) {
  countrys.map(country => {
    const { flags, name } = country;
    return (variables.ul.innerHTML += `
    <li>
      <img src="${flags.png}" />
      <h2>${name.official}</h2>
    </li>
    `);
  });
}
function fullCountryCard(countrys) {
  countrys.map(country => {
    const { altSpellings, capital, flags, name, population } = country;
    return (variables.ul.innerHTML += `
    <li>
      <img src="${flags.png}" />
      <h2>${name.official}</h2>
      <h4>Столиця: ${capital}</h4>
      <p>Населення: ${population}</p>
      <p>Оффіційна мова: ${altSpellings}</p>
    </li>
    `);
  });
}
