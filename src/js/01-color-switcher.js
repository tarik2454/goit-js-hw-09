const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId = null;

document.body.addEventListener('click', onButtonClick);

function onButtonClick({ target }) {
  if (target.hasAttribute('data-start')) {
    target.disabled = true;
    stopBtn.disabled = false;
    intervalId = setInterval(() => {
      document.body.style.background = getRandomHexColor();
    }, 1000);
  }
  if (target.hasAttribute('data-stop')) {
    clearInterval(intervalId);
    startBtn.disabled = false;
    target.disabled = true;
  }

  return;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
