import { createTodo, deleteTodo, updateTodo, fetchTodos } from '../js/api';

//*==========створимо 4 окремі ф-ції для роботи з бекендом (API):==================
//*-- fetchTodos, deleteTodo, updateTodo, createTodo
//*================Виносимо все, що стос-ся API, в окремий файл api.js============= 
// const URL = 'https://62a82e01a89585c1770df7cf.mockapi.io/api/todos';

// const fetchTodos = () => fetch(URL)
//         .then((response) => response.json());

// const deleteTodo = (id) =>
//     fetch(`${URL}/${id}`, {
//     method: 'DELETE',
// });

// const updateTodo = (id, data) =>
//     fetch(`${URL}/${id}`, {
//     method: 'PUT', 
//     headers: {
//         'Content-Type': 'Application/json',
//     },
//     body: JSON.stringify(data),
// });  

// const createTodo = (data) =>
//     fetch(URL, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'Application/json',
//     },
//     body: JSON.stringify(data),
// }).then((response) => response.json());

//*-----Робота з інтерфейсом (UI)--------

const itemTemplate = ({ id, isDone, text }) => `
<li data-id="${id}">
  <label>
    <input type="checkbox" ${isDone ? 'checked' : ''} />
    <span>${text}</span>
  </label>
  <button>x</button>
</li>`;

let items = [];

const refs = {
  ul: document.querySelector('ul'),
  form: document.querySelector('form'),
  loader: document.getElementById('loader'),
};

//*--Ф-ція, яка додає клас show, при якому стає видимим <p id="loader">Loading...</p>:
const showLoader = () => {
  refs.loader.classList.add('show');
};

//*--Ф-ція, яка прибирає клас show, без якого стає невидимим <p id="loader">Loading...</p>:
const hideLoader = () => {
  refs.loader.classList.remove('show');
};

//*--ф-ція loadData, яка завантажує дані:
//*--Було завантаження даних з локального сховища:

// const loadData = () => {
//     try {
//         items = JSON.parse(localStorage.getItem('todos'));
//     } catch (error) {
//         items = [];
//         console.log(error.message);
//     }
// };


//*--А тепер завантаження з сервера:

// const loadData = () =>
    // fetch('https://62a82e01a89585c1770df7cf.mockapi.io/api/todos')
    //     .then((response) => response.json())                 
    // .then((data) => {
    //         items = data;
    //     });

    
//*-- У ф-ції loadData fetch замінюємо на fetchTodos:
    
const loadData = () =>
  fetchTodos().then((data) => {
    items = data;
  });


//--ф-ція saveData, яка зберігає дані в localStorage (тепер не потрібна, бо ми зберігаємо на сервері)
// const saveData = () => {
//   localStorage.setItem('todos', JSON.stringify(items));
// };


//*--ф-ція handleSubmit, коли натисли сабміт, готується новий Item todo, включ-ся loader...,
//*--потім викликаємо fetch. При успішному завершенні фетча додаємо створений Item e масив,
//*--рендеримо цей масив, чистимо форму, ховаємо loader...
const handleSubmit = (event) => {
    event.preventDefault();
    const text = event.target.elements.text.value;
    const newItem = {
    // id: Date.now().toString(),  //*--вже не потрібно, бо id присвоює сервер
    text,
    isDone: false,
    };
    //saveAndRender();
    showLoader(); //*--показуємо завантаження
    createTodo(newItem)
        .then((data) => {
          items.push(data);
        })
        .then(() => {
            renderList();
        })
        .then(() => {
           refs.form.reset();
        })
        .catch((error) => {
            console.log(error.message);
        })
        .finally(() => {
         hideLoader(); //*--прибираємо показ завантаження
    });
};



//*--Ф-ція createItem, яка віддіасть дані на сервер, і коли сервер відповість, що все добре
//*-- тоді є резон додати його в список і зробити рендер

// const createItem = (newItem) => fetch('https://62a82e01a89585c1770df7cf.mockapi.io/api/todos', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'Application/json'
//     },
//     body: JSON.stringify(newItem),
// }).then((response) => response.json());

//*--Тепер замість ф-ції createItem є ф-ція createTodo


    //*-- Ф-ція toggleItem, яка фіксує встановлення чи зняття "галочок" :
// const toggleItem = (id) => {
//         items = items.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               isDone: !item.isDone,
//             }
//           : item,
//       );
// };

//*-- Ф-ція toggleItem перетворюється таким чином:
const toggleItem = (id) => {
  const item = items.find((item) => item.id === id);
  showLoader();
  updateTodo(id, { isDone: !item.isDone })
    .then(() => {
      items = items.map((item) =>
        item.id === id
          ? {
              ...item,
              isDone: !item.isDone,
            }
          : item,
      );
    })
    .then(() => {
      renderList();
    })
    .finally(() => {
      hideLoader();
    });
};

//*--Була ф-ція deleteItem на видалення елемента, при якій в новий список потрапляють лише ті item,
//*--у яких id не співпадає з id елемента, на кнопку якого клікнули:
// const deleteItem = (id) => {
// console.log('delete');
// items = items.filter(item => item.id !== id);
// }

//*--Тепер ф-ція deleteItem вмикає loader..., робить fetch для видалення,
//*--після фетча видаляє item з масиву, рендерить список, ховає loader...

const deleteItem = (id) => {
  showLoader();
  deleteTodo(id)
    .then(() => {
      items = items.filter((item) => item.id !== id);
    })
    .then(() => {
      renderList();
    })
    .finally(() => {
      hideLoader();
    });
};

const handleListClick = (event) => {
  if (event.target === event.currentTarget) return;

  const parent = event.target.closest('li');
  const { id } = parent.dataset; //отримуємо id елемента списку, по якому клікнули

  switch (event.target.nodeName) {
    case 'INPUT':
      toggleItem(id);
      break;

    case 'BUTTON':
      deleteItem(id);
      break;

    default:
      break;
  }
};

const renderList = () => {
  const list = items.map(itemTemplate).join('');

  refs.ul.innerHTML = '';
  refs.ul.insertAdjacentHTML('beforeend', list);
};


const loadAndRender = () => {
    showLoader(); //*--показуємо завантаження

  loadData()
    .then(() => {
      renderList();
    })
    .finally(() => {
      hideLoader(); //*--прибираємо показ завантаження
    });
};


refs.form.addEventListener('submit', handleSubmit);
refs.ul.addEventListener('click', handleListClick);

loadAndRender();