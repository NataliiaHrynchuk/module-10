export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
     }
    
    fetchArticles(searchQuery) {
        console.log(this);
         const options = {
    headers: {
        Authorization: 'b91142d7163a48d3a24979e3bb660e88',
    },
        };
        const url = `https://newsapi.org/v2/everything?q=${this.searchQuery}&language=en&pageSize=5&page=${this.page}`;

  fetch(url, options)
    .then(r => r.json())
      // .then(console.log())
      .then(data => {
          this.page += 1;
    });
    }

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

