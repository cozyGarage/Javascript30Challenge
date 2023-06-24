const buttons = document.querySelectorAll('[data-time]');
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time > span');
const alarmSound = new Audio('./assets/alarm.mp3');
const alarmOnButton = document.getElementById('alarmOnButton');
const alarmOffButton = document.getElementById('alarmOffButton');
let countDown;
let isAlarmOn = true; // Track the state of the alarm

function timer(seconds) {
    // clear any existing timers
    clearInterval(countDown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countDown);
            if (isAlarmOn) {
                playAlarmSound(); // Call the function to play the alarm sound if it's turned on
            }
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    let display;
    if (seconds > 86400) {
        displayErrorMessage();
        return;
    }

    clearErrorMessage();

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    display = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayErrorMessage() {
    timerDisplay.textContent = 'Please enter a duration within 24 hours.';
    timerDisplay.style.fontSize = '1.2rem';
    timerDisplay.style.color = 'red';
    timerDisplay.style.textShadow = 'none';
    timerDisplay.style.fontWeight = '900';
}

function clearErrorMessage() {
    timerDisplay.style.fontSize = '4rem';
    timerDisplay.style.color = 'var(--color1)';
    timerDisplay.style.textShadow = '2px 2px var(--color4)';
    timerDisplay.style.fontWeight = '100';
}

function displayEndTime(timestamp) {
    end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

function playAlarmSound() {
    alarmSound.play(); // Play the alarm sound
}

function toggleAlarmOn() {
    isAlarmOn = true;
    alarmOnButton.classList.add('active');
    alarmOffButton.classList.remove('active');
}

function toggleAlarmOff() {
    isAlarmOn = false;
    alarmSound.pause();
    alarmOnButton.classList.remove('active');
    alarmOffButton.classList.add('active');
}

buttons.forEach((button) => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    const seconds = mins * 60;
    this.reset();
    timer(seconds);
});

alarmOnButton.addEventListener('click', toggleAlarmOn);
alarmOffButton.addEventListener('click', toggleAlarmOff);
