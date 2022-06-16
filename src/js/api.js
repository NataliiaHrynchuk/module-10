// ---- API ----
const URL = 'https://62a82e01a89585c1770df7cf.mockapi.io/api/todos';

// ---- fetch ----
// export const fetchTodos = () => fetch(URL).then((response) => response.json());

// export const deleteTodo = (id) =>
//   fetch(`${URL}/${id}`, {
//     method: 'DELETE',
//   });

// export const updateTodo = (id, data) =>
//   fetch(`${URL}/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });

// export const createTodo = (data) =>
//   fetch(URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   }).then((resp) => resp.json());

// ---- axios ----
//*--Якщо в html-файлі підключити бібліотеку axios:
{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.0.0-alpha.1/axios.min.js" integrity="sha512-xIPqqrfvUAc/Cspuj7Bq0UtHNo/5qkdyngx6Vwt+tmbvTLDszzXM0G6c91LXmGrRx8KEPulT+AfOOez+TeVylg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> */}
//*--замінюємо fetch на axios, а метод вказуємо ч-з крапку.
//*--В response нам приходить об'єкт, з якого одразу можна 
//*--забрати data.Тому нема необхідності викликати json
export const fetchTodos = () =>
  axios.get(URL).then((response) => {
    console.log(response);

    return response.data;
  });

export const deleteTodo = (id) => axios.delete(`${URL}/${id}`);

export const updateTodo = (id, data) => axios.put(`${URL}/${id}`, data);

export const createTodo = (newItem) =>
  axios.post(URL, newItem).then(({ data }) => data);