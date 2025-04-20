import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTime = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topCenter',
        color: 'red',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTime, options);

class Timer {
  constructor() {
    this.isActive = false;
    this.intervalId = null;
    startButton.disabled = true;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = new Date();
      const deltaTime = userSelectedDate - currentTime;
      const time = convertMs(deltaTime);
      if (deltaTime < 0) {
        clearInterval(this.intervalId);
        dateTime.disabled = false;
        startButton.disabled = false;
        return;
      }

      dateTime.disabled = true;
      startButton.disabled = true;

      days.textContent = addLeadingZero(time.days);
      hours.textContent = addLeadingZero(time.hours);
      minutes.textContent = addLeadingZero(time.minutes);
      seconds.textContent = addLeadingZero(time.seconds);
    }, 1000);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second),
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const timer = new Timer();
startButton.addEventListener('click', timer.start.bind(timer));