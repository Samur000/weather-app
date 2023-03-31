import conditions from "./conditions.js";

const apiKey = 'ad81299e02d24ad1bc2194250232603';

// Получаем используемые элементы
const form = document.querySelector('.form');
const inputCity = form.querySelector('input');
const header = document.querySelector('.header')

function removeCard() {
   const prevCard = document.querySelector('.card')
   if (prevCard) prevCard.remove()
}
function showError(errorMessage) {

   const html = `<div class="error-block parent-block"><div class="error-title">${errorMessage}</div></div>`

   //* Выводим карточку при ошибке 
   header.insertAdjacentHTML('afterend', html)

   setTimeout(() => {
      //* Удаляем карточку через 2 секунды
      const errorBlock = document.querySelector('.error-block')
      errorBlock.remove()
   }, 3000);
}
function showCard({ name, country, temp, condition, img }) {
   const html = `<div class="card">
            <div class="card__title">${name || ''} <span>${country || ''}</span></div>
            <div class="card__body">
               <div class="card__weather">${temp || ''}°с</div>
               <div class="card__img"><img src="${img || ''} " alt=""></div>
            </div>
            <div class="card-desc">${condition || ''}</div>
         </div>`

   header.insertAdjacentHTML('afterend', html)
}
async function getWeather(city) {
   const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
   const response = await fetch(url)
   const data = await response.json()
   return data
}


form.addEventListener('submit', async function (e) {

   //  Отмена отпраки формы
   e.preventDefault()
   // Получаем значение из инпута
   let city = inputCity.value.trim()
   // Получаем данные с сервера 
   const data = await getWeather(city)

   if (data.error) {
      //! Еслм есть ошибка - выводим ошибку
      removeCard()
      showError(data.error.message)
   } else {
      //* Еслм нет ошибки выодим карточку
      removeCard()

      const info = conditions.find(obj => obj.code === data.current.condition.code)

      const condition = data.current.is_day ? info.languages[23]['day_text'] : info.languages[23]['night_text']

      const weatherData = {
         name: data.location.name,
         country: data.location.country,
         temp: data.current.temp_c,
         condition: condition,
         img: data.current.condition.icon
      }

      showCard(weatherData)
   }
})