import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayInput = document.querySelector('[name="delay"]');
const stepInput = document.querySelector('[name="step"]');
const amountInput = document.querySelector('[name="amount"]');
const btnEl = document.querySelector('button');

let intervallId;

const createPromise = (position, delay) => {
  const promise = new Promise((resolve, reject) => {
    intervallId = setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
};

formEl.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);
  let timeout = delay;
  for (let i = 1; i <= amount; i += 1) {
    const promise = createPromise(i, timeout);
    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    timeout += step;
  }
});
