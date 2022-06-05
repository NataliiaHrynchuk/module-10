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
import API from './api-servuce';
import getRefs from './get-refs';

// const r = fetch('https://pokeapi.co/api/v2/pokemon/2/');
// console.log(r);
//---------------------------------------------------------

// fetch('https://pokeapi.co/api/v2/pokemon/1');
//----------------------------------------------------------


// fetch('https://pokeapi.co/api/v2/pokemon/2/').then(data => {
//     console.log(data);
// });

//*============================================================

// const refs = {
//     cardContainer: document.querySelector('.js-card-container'),
//     searchForm: document.querySelector('.js-search-form'),
// }                                                   //*---виносимо це в окремий файл get-refs.js

//*---і викличемо ф-цію:

const refs = getRefs();

// fetch('https://pokeapi.co/api/v2/pokemon/4/')
//     .then(response => {
//     // console.log(response.json());
//     return response.json();
//     })
//     // .then(pokemon => {
//     //     console.log(pokemon);
//     //     const markup = pokemonCardTpl(pokemon);
//     //     console.log(markup);
//     //     refs.cardContainer.innerHTML = markup;
//     // }) //*--Спрощуємо:
//     .then(renderPokemonCard)
//     .catch(error => {
//         console.log(error);
//     });

    //*======== А тепер причешемо цей код ================
refs.searchForm.addEventListener('submit', onSearch); //*-- ми повісили на форму подію сабміт
                                                      //*-- під час неї буде викликатись ф-ція 
                                                      //*-- onSearch, в якій отримуєм посилання 
                                                    //*-- на значення інпута, яке вставляється в якості аргумента 
                                                    //*-- в ф-цію fetchPokemon

function onSearch(e) {
    e.preventDefault();

    const form = e.currentTarget;
    // console.log(form.elements);

    const searchQuery = form.elements.query.value; //*--значення інпуту під час сабміту форми

API.fetchPokemon(searchQuery)
    .then(renderPokemonCard)
    .catch(onFetchError)
    .finally(() => form.reset()); //*-- очищуємо форму по завершенню всього
}



//*------------Функція малювання інтерфейсу:

function renderPokemonCard(pokemon) {
  const markup = pokemonCardTpl(pokemon);
  refs.cardContainer.innerHTML = markup;
} 

//*------Ф-ція отримання даних про покемона:

// function fetchPokemon() {
//     fetch('https://pokeapi.co/api/v2/pokemon/4/')
//         .then(response => {
//             return response.json();
//     })
// }

//*---А тепер зробимо, щоб підставляти динамічний Id:
// function fetchPokemon(pokemonId) {
//     return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
//         .then(response => {
//             console.log(response);
//             return response.json();
//     })
// }

//*--Тепер ще більше спростимо:
// function fetchPokemon(pokemonId) {
//     const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
//     return fetch(url)
//         .then(response => response.json());
// } //*--перенесемо цю ф-цію в файл api-service.js, а потім імпортуємо її звідти



function onFetchError(error) {
  alert('Упс, щось пішло не так, і ми не знайшли вашого покемона!');
}

// // ===============Параметри запиту===============
fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
    .then(r => r.json())
    .then(console.log);


const url = 'https://newsapi.org/v2/everything?q=cars';
const options = {
  headers: {
    Authorization: '4330ebfabc654a6992c2aa792f3173a3',
  },
};

fetch(url, options)
  .then(r => r.json())
  .then(console.log);