/*
 * - Пагинация
 *   - страница и кол-во на странице
 * - Загружаем статьи при сабмите формы
 * - Загружаем статьи при нажатии на кнопку «Загрузить еще»
 * - Обновляем страницу в параметрах запроса
 * - Рисуем статьи
 * - Сброс значения при поиске по новому критерию
 *
 * https://newsapi.org/
 * 4330ebfabc654a6992c2aa792f3173a3
 * http://newsapi.org/v2/everything?q=cat&language=en&pageSize=5&page=1
 */

// import articlesTpl from './templates/articles.hbs';
import '../css/styles.css';
import NewsApiService from '../js/news-service';
// import LoadMoreBtn from './js/components/load-more-btn';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]')
};

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });
const newsApiService = new NewsApiService();
console.log(newsApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
// loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value;
  newsApiService.resetPage();

  // newsApiService.fetchArticles(searchQuery);
   newsApiService.fetchArticles();//*--вже не передаємо searchQuery, бо викор-є this.query

    
}

function onLoadMore() {
  // newsApiService.fetchArticles(searchQuery);

   newsApiService.fetchArticles();//*--вже не передаємо searchQuery, бо викор-є this.query
}
// function onSearch(e) {
//   e.preventDefault();

//   newsApiService.query = e.currentTarget.elements.query.value;

//   if (newsApiService.query === '') {
//     return alert('Введи что-то нормальное');
//   }

//   loadMoreBtn.show();
//   newsApiService.resetPage();
//   clearArticlesContainer();
//   fetchArticles();
// }

// function fetchArticles() {
//   loadMoreBtn.disable();
//   newsApiService.fetchArticles().then(articles => {
//     appendArticlesMarkup(articles);
//     loadMoreBtn.enable();
//   });
// }

// function appendArticlesMarkup(articles) {
//   refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
// }

// function clearArticlesContainer() {
//   refs.articlesContainer.innerHTML = '';
// }




//============================================================================================================
// fetch('https://newsapi.org/v2/everything?q=cat&from=2022-05-06&sortBy=publishedAt&apiKey=b91142d7163a48d3a24979e3bb660e88&language=en&pageSize=5')
//   .then(r => r.json())
//   .then(console.log());

