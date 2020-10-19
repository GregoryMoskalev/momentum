// DOM Elements
const date = document.getElementById('date'),
  time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus'),
  backgroundButton = document.getElementById('background-btn'),
  joke = document.getElementById('joke');

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

// Get dad joke

async function dadJoke() {
  try {
    const response = await axios.get('https://icanhazdadjoke.com/', {
      headers: { Accept: 'text/plain' }
    });
    joke.innerText = response.data;
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
    // document.body.style.backgroundImage = `url(./assets/images/night/${bgList[
    //   bgNumber(hour, modifier)
    // ]}.jpg)`;
    greeting.textContent = 'Good Night,';
    // document.body.style.color = 'white';
  } else if (hour < 12) {
    //Morning
    // document.body.style.backgroundImage = `url(./assets/images/morning/${bgList[
    //   bgNumber(hour, modifier)
    // ]}.jpg)`;
    greeting.textContent = 'Good Morning,';
  } else if (hour < 18) {
    //Afternoon
    // document.body.style.backgroundImage = `url(./assets/images/day/${bgList[
    //   bgNumber(hour, modifier)
    // ]}.jpg)`;
    greeting.textContent = 'Good Afternoon,';
  } else if (hour < 24) {
    // Evening
    // document.body.style.backgroundImage = `url(./assets/images/evening/${bgList[
    //   bgNumber(hour, modifier)
    // ]}.jpg)`;
    greeting.textContent = 'Good Evening,';
    // document.body.style.color = 'white';
  }
}

// Set background
function setBg() {
  let today = new Date(),
    hour = today.getHours();

  let bg = bgNumber(hour, modifier);

  console.log('Background number from array 0-6 morning 6-12 day 12-18 evening 18-23 night:');
  console.log(bg);
  console.log('image name');
  console.log(`${bgList[bg]}.jpg`);
  console.log('List of random backgrounds:');
  console.log(bgList);

  if (bg < 6) {
    //Night
    document.body.style.backgroundImage = `url(./assets/images/night/${bgList[bg]}.jpg)`;

    document.body.style.color = 'white';
  } else if (bg < 12) {
    //Morning
    document.body.style.backgroundImage = `url(./assets/images/morning/${bgList[bg]}.jpg)`;
  } else if (bg < 18) {
    //Afternoon
    document.body.style.backgroundImage = `url(./assets/images/day/${bgList[bg]}.jpg)`;
  } else if (bg < 24) {
    //Evening
    document.body.style.backgroundImage = `url(./assets/images/evening/${bgList[bg]}.jpg)`;

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

name.addEventListener('focus', () => clearField(name));
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('focus', () => clearField(focus));
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

backgroundButton.addEventListener('click', changeBg);

//Run
generateBgList();
showTime();
showDate();
setGreet();
getName();
getFocus();
setBg();
dadJoke();
