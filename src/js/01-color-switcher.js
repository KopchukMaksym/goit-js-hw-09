const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let intervallId = null;
const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const addColorRandom = () => {
  intervallId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
    if ((startBtn.disabled = true)) {
      stopBtn.disabled = false;
    }
  }, 1000);
};

startBtn.addEventListener('click', addColorRandom);
stopBtn.addEventListener('click', () => {
  clearInterval(intervallId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
