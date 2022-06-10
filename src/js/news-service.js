const API_KEY = 'b91142d7163a48d3a24979e3bb660e88';
const BASE_URL = 'https://newsapi.org/v2';
const options = {
    headers: {
        Authorization: API_KEY,
    },
};

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchArticles() {
        console.log(this);
           
        const url = `${BASE_URL}/everything?q=${this.searchQuery}&language=en&pageSize=5&page=${this.page}`;

        return fetch(url, options)
           .then(response => response.json())
        // .then(console.log())
        .then(({articles}) => {
            // console.log(data);
            this.page += 1;

            return articles;
        });
    };

    resetPage() {
        this.page = 1;
    }

    get query() {
    return this.searchQuery;
    }

    set query(newQuery) {
    this.searchQuery = newQuery;
    }
}

