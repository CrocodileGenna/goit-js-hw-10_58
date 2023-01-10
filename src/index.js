import './css/styles.css';
import { countryFetch } from './countryFetch';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const variables = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  сountryСard: document.querySelector('.country-info'),
};

variables.input.addEventListener('input', el => {
  const country = el.target.value;
  if (country === '') {
    return;
  }
  countryFetch(country)
    .then(res => {
      let object = res.length;
      variables.ul.innerHTML = '';

      if (object > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (object >= 2 && object <= 10) {
        titleRender(res);
      } else {
        fullRender(res);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(`"Oops, there is no country with that name"`);
    });
});

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
  console.log(res);
  res.map(({ name, flags }) => {
    return (variables.ul.innerHTML += `<li class="country-list__li">
        <img src="${flags.png}" alt="${name}" width="60px" height="45px"/>
        <h1>${name.official}</h1>
        </li>`);
  });
}
