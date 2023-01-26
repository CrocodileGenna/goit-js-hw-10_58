export default function fetchCountrys(val) {
  return fetch(`https://restcountries.com/v3.1/name/${val}`).then(result => {
    return result.json();
  });
}
