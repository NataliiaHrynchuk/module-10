/*
 * - HTTP-запросы в браузере
 *  - Fetch API
 *  - Владка Network
 *  - HTTP-методы
 *  - Заголовки
 *  - MIME-типы
 *  - Параметры запроса
 * - Документация REST API
 * - Обработка 404 с fetch
 * - Аутентификация
 * - Библиотеки-обёртки
 * - https://pokeapi.co/
 */



import '../css/styles.css';
import pokemonCardTpl from '../templates/pokemon-card.hbs';
// import API from './api-service';
// import getRefs from './get-refs';

// const r = fetch('https://pokeapi.co/api/v2/pokemon/2/');
// console.log(r);

// fetch('https://pokeapi.co/api/v2/pokemon/2/').then(data => {
//     console.log(data);
// });

//*============================================================

const refs = {
    cardContainer: document.querySelector('.js-card-container'),
}
fetch('https://pokeapi.co/api/v2/pokemon/4/')
    .then(response => {
    // console.log(response.json());
    return response.json();
    })
    .then(pokemon => {
        console.log(pokemon);
        const markup = pokemonCardTpl(pokemon);
        console.log(markup);
        refs.cardContainer.innerHTML = markup;
    })
    .catch(error => {
        console.log(error);
    });

    //*======== А тепер причешемо цей код ================
//*--малювання інтерфейсу має бути в окр. ф-ції:

function renderPokemonCard(pokemon) {
  const markup = pokemonCardTpl(pokemon);
  refs.cardContainer.innerHTML = markup;
}


// fetch('https://pokeapi.co/api/v2/pokemon/1');


// const refs = getRefs();

// refs.searchForm.addEventListener('submit', onSearch);

// function onSearch(e) {
//   e.preventDefault();

//   const form = e.currentTarget;
//   const searchQuery = form.elements.query.value;

//   API.fetchPokemon(searchQuery)
//     .then(renderPokemonCard)
//     .catch(onFetchError)
//     .finally(() => form.reset());
// }



// function onFetchError(error) {
//   alert('Упс, что-то пошло не так и мы не нашли вашего покемона!');
// }

// // =========================================

// const url = 'https://newsapi.org/v2/everything?q=cars';
// const options = {
//   headers: {
//     Authorization: '4330ebfabc654a6992c2aa792f3173a3',
//   },
// };

// fetch(url, options)
//   .then(r => r.json())
//   .then(console.log);