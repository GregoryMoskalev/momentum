// DOM Elements
const date = document.getElementById('date'),
  time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus');

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

// Options
const showAmPm = false;

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

// Set background and greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 6) {
    //Night
    document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Good Night,';
    document.body.style.color = 'white';
  } else if (hour < 12) {
    //Morning
    document.body.style.backgroundImage = "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Morning,';
  } else if (hour < 18) {
    //Afternoon
    document.body.style.backgroundImage = "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon,';
  } else if (hour < 24) {
    // Evening
    document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Good Evening,';
    document.body.style.color = 'white';
  }
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

//Run
showTime();
showDate();
setBgGreet();
getName();
getFocus();
