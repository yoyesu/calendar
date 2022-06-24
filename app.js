let nav = 0; //this will help to count the months, 0 = current month
let clicked = null; //day the user clicks on
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; // we're saving events in LS, but we want to save objects and LS doesn't accept objects that's why we need to convert to json. The condition is to make sure the event is stored in LS before trying to convert to json and getting an error if the event is not stored in LS

const calendar = document.querySelector('#calendar');
const newEvent = document.querySelector('#new-event');
const eventPopUp = document.querySelector('#event-popup');
const eventTitleInput = document.querySelector('#event-title-input');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function openEventScreen(date){
  clicked = date;

  const eventForDay = events.find(e => e.date == clicked);

  if(eventForDay){
    console.log('event already exists');
  } else {
    newEvent.style.display = 'block';
  }

  eventPopUp.style.display = 'block';
}

function loadCalendar(){
  const date = new Date();

  if (nav !== 0) {
    date.setMonth(new Date().getMonth() + nav);
  }

  const day = date.getDate();
  const month = date.getMonth(); //this gives you the months with index order, that is Jan is 0, Feb is 1, etc.
  const year = date.getFullYear();
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month +1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }); //since firstDayOfMonth is an object we need to convert to string

  const paddingDays = weekdays.indexOf(dateString.split(',')[0]); //this will give you the number of days before the current day. So if it's wednesday, paddingDays = 2 (Monday + Tuesday)

  const monthYearTitle = document.querySelector('#month-display').innerText = 
  `${date.toLocaleDateString('en-GB', {month: 'long',})} ${year}`;


  calendar.innerHTML = ''; //this is so that every time you call the loadCalendar function with the back/nest btns, the calendar empties. So when you load the page, the calendar will be created with the nav 0. If you click one of the next/back btns you need to remove the month that was displayed and before creating the new one (for loop will create it)

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    if (i > paddingDays){
      daySquare.innerText = i - paddingDays;

      daySquare.addEventListener('click', ()=> openEventScreen(`${i - paddingDays}/${month +1}/${year}`))
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);
  }
}

function closePopUp(){
  newEvent.style.display = 'none';
  eventPopUp.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
}

function saveEvent(){
  
}

function changeMonthBtns(){
  document.querySelector('#next-btn').addEventListener('click', () => {
    nav++;
    loadCalendar();
  });
  
  document.querySelector('#back-btn').addEventListener('click', () => {
    nav--;
    loadCalendar();
  });
  
}

function popUpBtns(){
  document.querySelector('#save-btn').addEventListener('click', saveEvent);

  document.querySelector('#cancel-btn').addEventListener('click',
    closePopUp);
}

popUpBtns();
changeMonthBtns();
loadCalendar();