export function countryFetch(country) {
  return fetch(
    `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`
  ).then(res => {
    if (res.status === 404) {
      return;
    }
    return res.json();
  });
}
