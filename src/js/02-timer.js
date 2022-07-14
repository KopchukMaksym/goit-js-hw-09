import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const input = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("button");

let choosenTime = null;
btnStart.disabled = true;
console.log(choosenTime);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        if (selectedDates[0].getTime() <= options.defaultDate) {
            Notiflix.Notify.failure("Please choose a date in the future");
        } else {
            btnStart.disabled = false;
            choosenTime = selectedDates[0].getTime();
        }
    },
};

const addLeadingZero = (value) => String(value).padStart(2, 0);

const timer = {
    timerId: null,
    start() {
        this.timerId = setInterval(() => {
            const difference = choosenTime - Date.now();
            if (difference <= 0) {
                this.stop();
                return;
            }
            const { days, hours, minutes, seconds } =
                this.convertMs(difference);
            document.querySelector("[data-days]").textContent =
                addLeadingZero(days);
            document.querySelector("[data-hours]").textContent =
                addLeadingZero(hours);
            document.querySelector("[data-minutes]").textContent =
                addLeadingZero(minutes);
            document.querySelector("[data-seconds]").textContent =
                addLeadingZero(seconds);
        }, 1000);
    },
    stop() {
        clearInterval(this.timerId);
    },
    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
        return { days, hours, minutes, seconds };
    },
};

btnStart.addEventListener("click", () => timer.start());

flatpickr(input, options);
