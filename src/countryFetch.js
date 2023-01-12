export function countryFetch(country) {
  return fetch(
    `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`
  ).then(res => {
    return res.json();
  });
}
