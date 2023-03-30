const apiKey = 'ad81299e02d24ad1bc2194250232603';

// Получаем используемые элементы
const form = document.querySelector('.form');
const inputCity = form.querySelector('input');
const header = document.querySelector('.header')

function removeErrorBlock(btn) {
   btn.closest('.parent-block').remove()
}

form.addEventListener('submit', (e) => {

   //  Отмена отпраки формы
   e.preventDefault()

   // Получаем значение из инпута
   let city = inputCity.value.trim()
   console.log(city);

   // Адрес запроса
   const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

   fetch(url)
   .then(res => res.json())
   .then(data => {

      if (data.error) {
         const prevCard = document.querySelector('.card')
         if (prevCard) prevCard.remove()
         
         html = `<div class="error-block parent-block">
                     <div class="error-title">Такого города нет</div>
                     <div class="close-btn" onclick="removeErrorBlock(this)">&times;</div>
                  </div>`
            header.insertAdjacentHTML('afterend', html)
         setTimeout(() => {
            const errorBlock = document.querySelector('.error-block')
            errorBlock.remove()
         }, 2000);
      } else {
         const prevCard = document.querySelector('.card')
         if (prevCard) prevCard.remove()

         html =  `<div class="card">
                     <div class="card__title">${data.location.name} <span>${data.location.country}</span></div>
               
                     <div class="card__body">
                        <div class="card__weather">${data.current.temp_c}°с</div>
                        <div class="card__img"><img src="img/8.png" alt=""></div>
                     </div>
                     <div class="card-desc">${data.current.condition.text}</div>
                  </div>`

         header.insertAdjacentHTML('afterend', html)
      }


         // console.log(data);
         // console.log(data.location.name);
         // console.log(data.location.country);
         // console.log(data.current.temp_c);
         // console.log(data.current.condition.text);
      })
})