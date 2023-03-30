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

   html = `<div class="error-block parent-block">
               <div class="error-title">${errorMessage}</div>
               <div class="close-btn" onclick="removeErrorBlock(this)">&times;</div>
            </div>`

   //* Выводим карточку при ошибке 
   header.insertAdjacentHTML('afterend', html)

   setTimeout(() => {
      //* Удаляем карточку через 2 секунды
      const errorBlock = document.querySelector('.error-block')
      errorBlock.remove()
   }, 3000);
}
function removeErrorBlock(btn) {
   btn.closest('.parent-block').remove()
}
function showCard({name, country, temp, condition}) {
   html = `<div class="card">
            <div class="card__title">${name} <span>${country}</span></div>
            <div class="card__body">
               <div class="card__weather">${temp}°с</div>
               <div class="card__img"><img src="img/8.png" alt=""></div>
            </div>
            <div class="card-desc">${condition}</div>
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

      const weatherData = {
         name: data.location.name,
         country: data.location.country,
         temp: data.current.temp_c,
         condition: data.current.condition.text
      }

      showCard(weatherData)
   }
})