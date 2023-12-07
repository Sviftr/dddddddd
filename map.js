




// Вибираємо елемент з класом .flag
const flag = document.querySelector(".flag");
// Вибираємо інформаційний блок
const infoBlock = document.querySelector('.p__info');
const infoBlockk = document.querySelector('.p__inf');
const infoPlase = document.querySelector('.p__plase') //1
const infoVvp = document.querySelector('.p__vvp')
const infoIlr = document.querySelector('.p__ilr')
const infoMoney = document.querySelector('.p__money')
const infoPeople = document.querySelector('.p__people')
// Функція для відображення прапора країни
function displayCountryFlag(countryID, countryInfo, countryInf, countryPlase, countryVVP, countryILR, countryMoney, countryPeople) { //4
  // Обробник події, викликається при успішному завантаженні зображення
  flag.onload = function() {
    console.log(`Прапор для ${countryID} завантажено`);
    // Оновлюємо інформаційний блок з додатковою інформацією про країну //3
    updateCountryInfo(countryInfo);
    updateCountryInf(countryInf);
    updateCountryPlase(countryPlase) 
    updateCountryVVP(countryVVP)
    updateCountryIlr(countryILR)
    updateCountryMoney(countryMoney)
    updateCountryPeople(countryPeople)
  };

  // Обробник події, викликається при помилці завантаження зображення
  flag.onerror = function() {
    console.error(`Помилка завантаження прапора для ${countryID}`);
  };

  // Задаємо джерело зображення для прапора
  flag.src = `https://flagsapi.com/${countryID}/flat/64.png`;
}

// Функція для оновлення інформації про країну
function updateCountryInfo(countryInfo) {
  // Оновлюємо текст в інформаційному блоку
  infoBlock.textContent = countryInfo;
}

function updateCountryPlase(countryPlase) { //2
  infoPlase.textContent = countryPlase
}

function updateCountryVVP(countryVVP) {
  infoVvp.textContent = countryVVP
}

function updateCountryIlr(countryILR) {
  infoIlr.textContent = countryILR
}

function updateCountryMoney(countryMoney) {
  infoMoney.textContent = countryMoney
}

function updateCountryPeople(countryPeople) {
  infoPeople.textContent = countryPeople
}

// Функція для оновлення інформації про країну
function updateCountryInf(countryInf) {
  // Оновлюємо текст в інформаційному блоку
  infoBlockk.textContent = countryInf;
}

// Отримуємо всі елементи з ID 'countries'
let countryElements = document.getElementById('countries').childNodes;  
let countryCount = countryElements.length; 

// Функція для отримання погоди для країни
function getWeatherForCountry(countryName) {
  const APIKey = '185dbcc57e27f9315a49d3f1c762ebd7';
  const countryTemp = document.querySelector(".temperature-map");

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const temperature = data.main.temp.toFixed(0);
        countryTemp.textContent = `${temperature}°`;

        const DenmarkImg = document.querySelector(".status-map")
        switch (data.weather[0].main) {
          case 'Clear':
              DenmarkImg.src = 'img/clear.png';
              break;

          case 'Rain':
              DenmarkImg.src = 'img/rain.png';
              break;

          case 'Snow':
              DenmarkImg.src = 'img/snow.png';
              break;

          case 'Clouds':
              DenmarkImg.src = 'img/cloud.png';
              break;

          case 'Haze':
              DenmarkImg.src = 'img/mist.png';
              break;

          default:
              DenmarkImg.src = '';
        }
      } else {
        countryTemp.textContent = '-';
      }
    })
    .catch(error => {
      console.error('Помилка запиту до API: ', error);
    });
}

// Цикл для призначення обробника події кліка на елементи країн
for (let i = 0; i < countryCount; i++) {
  let countryElement = countryElements[i];

  countryElement.onclick = function() {
    // Отримуємо атрибути країни
    const countryName = this.getAttribute('data-name');
    const countryID = this.getAttribute('data-id');
    const countryInfo = this.getAttribute('data-info');
    const countryInf = this.getAttribute('data-inf');
    const countryPlase = this.getAttribute('data-plase') //5
    const countryVVP = this.getAttribute('data-vvp')
    const countryILR = this.getAttribute('data-ilr')
    const countryMoney = this.getAttribute('data-money')
    const countryPeople = this.getAttribute('data-people')
    // Знаходимо елемент заголовка і оновлюємо його текст
    let h2 = document.querySelector('.svg__map-name');
    h2.textContent = countryName;

    // Викликаємо функції для отримання погоди та відображення прапора з інформацією про країну
    getWeatherForCountry(countryName);
    displayCountryFlag(countryID, countryInfo, countryInf, countryPlase, countryVVP, countryILR, countryMoney, countryPeople); //6
  };
}





