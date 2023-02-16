const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  intervalId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
