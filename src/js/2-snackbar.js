import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', handleCreate);

function handleCreate(event) {
  event.preventDefault();

  const delay = Number(form.delay.value);
  const state = form.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.show({
        message: `Fulfilled promise in ${delay}ms`,
        color: 'green',
        position: 'topCenter',
        timeout: `${delay}`,
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `Rejected promise in ${delay}ms`,
        color: 'red',
        position: 'topCenter',
        timeout: `${delay}`,
      });
    });
}