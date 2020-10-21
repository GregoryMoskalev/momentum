// DOM Elements
const date = document.getElementById('date'),
  time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus'),
  backgroundButton = document.getElementById('background-btn'),
  quote = document.getElementById('quote'),
  quoteBtn = document.getElementById('quote-btn'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  humidity = document.querySelector('.humidity'),
  windSpeed = document.querySelector('.wind-speed'),
  city = document.getElementById('city'),
  errorText = document.querySelector('.error'),
  contrast = document.getElementById('contrast'),
  wrappers = document.querySelectorAll('.toning-wrapper');

const weekdayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

let bgList = [];

let modifier = 0;
// Options
const showAmPm = false;

// Get weather

async function getWeather(city) {
  if (!city || city === '[Enter city]') return;

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?', {
      params: {
        q: city,
        lang: 'en',
        appid: '08f2a575dda978b9c539199e54df03b0',
        units: 'metric'
      }
    });

    weatherIcon.classList.add(`owf-${response.data.weather[0].id}`);
    temperature.textContent = `${response.data.main.temp}°C`;
    weatherDescription.textContent = response.data.weather[0].description;
    humidity.textContent = `Humidity: ${response.data.main.humidity}`;
    windSpeed.textContent = `Wind speed: ${response.data.wind.speed}`;
  } catch (error) {
    errorText.innerText = error;
    console.error(error);
  }
}

// Get quote

async function randomQuote() {
  try {
    const response = await axios.get('https://icanhazdadjoke.com/', {
      headers: { Accept: 'text/plain' }
    });

    //no to big jokes!
    if (response.data.length > 250) {
      console.log('🚨 too long joke');
      randomQuote();
    } else {
      quote.innerText = response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

// Generate background list
function generateBgList() {
  for (let i = 0; i < 4; i++) {
    const set = new Set();
    while (set.size < 6) {
      set.add(addZero(Math.floor(Math.random() * 19 + 1)));
    }
    bgList = bgList.concat([ ...set ]);
  }
}

// Next background on button click

function bgNumber(hour, modifier) {
  return (hour + modifier) % 24;
}

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    amPm;

  //change background every hour

  if (min == 0 && sec == 0) {
    modifier = 0;
    setBg();
  }

  if (showAmPm) {
    // Set AM or PM
    amPm = hour >= 12 ? 'PM' : 'AM';

    // 12hr Format
    hour = hour % 12 || 12;
  }
  //Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}${showAmPm
    ? ' ' + amPm
    : ''}`;

  setTimeout(showTime, 1000);
}

// Add zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Show date
function showDate() {
  let today = new Date(),
    month = monthNames[today.getMonth()],
    day = today.getDate(),
    weekday = weekdayNames[today.getDay()];

  //Output date
  date.innerHTML = `${weekday}, ${month} ${day}`;
}

// Set greeting
function setGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 6) {
    //Night

    greeting.textContent = 'Good Night,';
  } else if (hour < 12) {
    //Morning

    greeting.textContent = 'Good Morning,';
  } else if (hour < 18) {
    //Afternoon

    greeting.textContent = 'Good Afternoon,';
  } else if (hour < 24) {
    // Evening

    greeting.textContent = 'Good Evening,';
  }
}

// Set background
function setBg() {
  let today = new Date(),
    hour = today.getHours();

  let bg = bgNumber(hour, modifier);

  if (bg < 6) {
    //Night
    document.body.style.backgroundImage = `url(./assets/images/overlay.png), url(./assets/images/night/${bgList[
      bg
    ]}.jpg)`;

    document.body.style.color = 'white';
  } else if (bg < 12) {
    //Morning
    document.body.style.backgroundImage = `url(./assets/images/overlay.png), url(./assets/images/morning/${bgList[
      bg
    ]}.jpg)`;
  } else if (bg < 18) {
    //Afternoon
    document.body.style.backgroundImage = `url(./assets/images/overlay.png), url(./assets/images/day/${bgList[
      bg
    ]}.jpg)`;
  } else if (bg < 24) {
    //Evening
    document.body.style.backgroundImage = `url(./assets/images/overlay.png), url(./assets/images/evening/${bgList[
      bg
    ]}.jpg)`;

    document.body.style.color = 'white';
  }
}

// Change background

function changeBg(e) {
  backgroundButton.disabled = true;
  setTimeout(() => {
    backgroundButton.disabled = false;
  }, 1000);
  modifier++;
  setBg();
}

// Get name
function getName() {
  if (!localStorage.getItem('name')) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (!name.textContent) return;
  if (e.type === 'keypress') {
    //Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get focus
function getFocus() {
  if (!localStorage.getItem('focus')) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set focus

function setFocus(e) {
  if (!name.textContent) return;
  if (e.type === 'keypress') {
    //Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

// Get city

function getCity() {
  if (!localStorage.getItem('city')) {
    city.textContent = '[Enter city]';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

// Set city

function setCity(e) {
  if (!city.textContent) return;
  if (e.type === 'keypress') {
    //Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('city', e.target.innerText);
      city.blur();
    }
  } else {
    localStorage.setItem('city', e.target.innerText);
  }
}

// Clear field

function clearField(field) {
  let temp = field.textContent;

  field.textContent = '';

  field.addEventListener('keypress', (e) => {
    if (e.which == 13 || e.keyCode == 13) {
      if (field.textContent == '') {
        field.textContent = temp;
      } else {
        temp = field.textContent;
      }
      field.blur();
    }
  });

  field.addEventListener('blur', () => {
    if (field.textContent == '') {
      field.textContent = temp;
    } else {
      temp = field.textContent;
    }
  });
}

//change contrast

function changeContrast() {
  wrappers.forEach((elem) => {
    elem.className = `${elem.className.replace(
      / contrast-\d{1,3}/g,
      ''
    )} contrast-${contrast.value}`;
  });
}

// debounce

const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

name.addEventListener('focus', () => clearField(name));
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('focus', () => clearField(focus));
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

quoteBtn.addEventListener('click', () => randomQuote());

city.addEventListener('focus', () => clearField(city));
city.addEventListener('input', debounce(() => getWeather(city.textContent), 1000));
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

contrast.addEventListener('change', changeContrast);

backgroundButton.addEventListener('click', changeBg);

//Run
generateBgList();
showTime();
showDate();
setGreet();
getName();
getFocus();
getCity();
setBg();
randomQuote();
getWeather(city.textContent);
