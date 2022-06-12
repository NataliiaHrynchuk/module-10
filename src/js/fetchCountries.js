const BASE_URL = 'https://restcountries.com/v3.1';

export default class FetchCountriesServise {
    constructor() {
        this.searchQuery = '';
    }
    fetchCountries() {
        console.log(this);
    
        return fetch(`${BASE_URL}/name/${this.searchQuery}`)
            .then(response => {
                return response.json();
            })
            .then(({ country }) => {
                console.log(country);
                return countries;
            })
            .catch(error => {
                console.log(error);
            })
    }
     get query() {
            return this.searchQuery;
        }

        set query(newQuery) {
            this.searchQuery = newQuery;
        }
}