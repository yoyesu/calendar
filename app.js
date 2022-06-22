let nav = 0; //this will help to count the months, 0 = current month
let clicked = null; //day the user clicks on
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; // we're saving events in LS, but we want to save objects and LS doesn't accept objects that's why we need to convert to json. The condition is to make sure the event is stored in LS before trying to convert to json and getting an error if the event is not stored in LS

const calendar = document.querySelector('#calendar');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function loadCalendar(){
  const date = new Date();
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

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    if (i > paddingDays){
      daySquare.innerText = i - paddingDays;

      daySquare.addEventListener('click', ()=> console.log('click'))
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);
  }

  console.log('padding days' +' '+ paddingDays);
  console.log('current date' + `${day} ${month} ${year}`);
  console.log('numbers of days in current month' + daysInMonth);
  console.log('current date in string format' + dateString);
}

loadCalendar();