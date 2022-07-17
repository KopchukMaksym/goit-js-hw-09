const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let intervallId = null;
stopBtn.disabled = true;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const addColorRandom = () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  intervallId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

startBtn.addEventListener('click', addColorRandom);

stopBtn.addEventListener('click', () => {
  clearInterval(intervallId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
