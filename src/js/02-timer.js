import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/confetti.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const inputValueList = document.querySelectorAll('span.value');
const timerHtml = document.querySelector('.timer');

let selectedDate = null;
let intervalId = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    startBtn.disabled = false;

    if (selectedDate < Date.now()) {
      Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    }

    inputValueList.forEach(value => (value.textContent = '00'));

    clearInterval(intervalId);
  },
  start() {
    intervalId = setInterval(() => {
      const currentValue = selectedDate - Date.now();
      console.log(selectedDate);
      startBtn.disabled = true;

      if (currentValue >= 0) {
        const convertDate = convertMs(currentValue);
        renderDate(convertDate);
      }
      if (currentValue <= 300000 && currentValue >= 0) {
        timerHtml.style.color = 'tomato';
      }
      if (currentValue <= 1000 && currentValue >= 0) {
        Notify.success('Countdown finished');
        timerHtml.style.color = 'inherit';
      }
    }, 1000);
  },
};

startBtn.addEventListener('click', () => {
  options.start();
});

function renderDate(date) {
  for (const key in date) {
    if (key) {
      document.querySelector(`span[data-${key}]`).textContent = addLeadingZero(
        date[`${key}`]
      );
    }
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr(input, options);
