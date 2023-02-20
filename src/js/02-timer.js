import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/confetti.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const input = document.querySelector('#datetime-picker');
const timerHtml = document.querySelector('.timer');

startBtn.addEventListener('click', () => {
  options.start();
});

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    }

    startBtn.disabled = false;
  },
  start() {
    this.intervalId = setInterval(() => {
      const deltaTime = new Date(input.value) - new Date();
      console.log(deltaTime);

      if (deltaTime >= 0) {
        const timeObject = convertMs(deltaTime);
        updateClockFace(timeObject);
        // Способ обновления текстовых полей .timer без использования функции updateClockFace()
        // for (const key in timeObject) {
        //   document.querySelector(`[data-${key}]`).textContent = addLeadingZero(
        //     timeObject[key]
        //   );
        // }
      }
      if (deltaTime <= 300000) {
        timerHtml.style.color = 'tomato';
      }
      if (deltaTime < 1000) {
        Notify.success('Countdown finished');
        timerHtml.style.color = 'inherit';
        clearInterval(this.intervalId);
      }
    }, 1000);
  },
};

const flatpickrInput = flatpickr('input#datetime-picker', options);

function updateClockFace({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(`${days}`);
  dataHours.textContent = addLeadingZero(`${hours}`);
  dataMinutes.textContent = addLeadingZero(`${minutes}`);
  dataSeconds.textContent = addLeadingZero(`${seconds}`);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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
