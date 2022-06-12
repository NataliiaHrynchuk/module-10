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
console.log(refs.input);

refs.input.addEventListener('input', onSearch);

function onSearch(e) {
    e.preventDefault();
    console.log(e.target.value);

    fetchCountriesServise.query = e.target.value;
    
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