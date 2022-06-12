const DEBOUNCE_DELAY = 300;


import FetchCountriesServise from '../js/fetchCountries';
import countriesCardTpl from '../templates/countriesList.hbs';
const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

const fetchCountriesServise = new FetchCountriesServise;
console.log(fetchCountriesServise);

refs.input.addEventListener('input', onSearch);

function onSearch(e) {
    e.preventDefault();

    fetchCountriesServise.query = e.currentTarget.elements.query.value;
    if (fetchCountriesServise.query === '') {
        return alert('Too many matches found. Please enter a more specific name.');
    }
    fetchCountriesServise.fetchCountries();
}
function appendCountriesMarkup(countries) {
     
 }

// fetch('https://restcountries.com/v3.1/name/uk')
//     .then(response => {
//         return response.json();
//     })
//     .then(country => {
//         console.log(country);
//         const markup = countiesCardTpl(country);
//     })
//     .catch(error => {
//         console.log(error);
// })