const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const dateSpan = document.querySelector('.date');
const alarmInput = document.querySelector('#alarm-input');
const alarmButton = document.querySelector('#alarm-button');
const alarmMessage = document.querySelector('.alarm-message');

let alarmTime = null;
let alarmInterval = null;

function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  dateSpan.textContent = now.toLocaleDateString(undefined, dateOptions);

  if (alarmTime && now >= alarmTime) {
    playAlarm();
  }

  requestAnimationFrame(setDate); // Optimize animation
}


function setAlarm() {
    const currentTime = new Date();
    const inputTime = alarmInput.value;

    if (!inputTime.match(/^\d{2}:\d{2}$/)) {
      alarmMessage.textContent = 'Invalid time format. Please use HH:MM.';
      return;
    }

    const [hours, minutes] = inputTime.split(':');
    const alarmDate = new Date();
    alarmDate.setHours(hours, minutes, 0, 0);

    if (alarmDate < currentTime) {
      alarmDate.setDate(alarmDate.getDate() + 1); // Set alarm for the next day
    }

    alarmTime = alarmDate.getTime();
    alarmMessage.textContent = `Alarm set for ${hours}:${minutes}.`;

    clearInterval(alarmInterval);
    alarmInterval = setInterval(checkAlarm, 1000);
  }

  function checkAlarm() {
    const currentTime = new Date().getTime();

    if (alarmTime && currentTime >= alarmTime) {
      clearInterval(alarmInterval);
      alarmMessage.textContent = 'Alarm triggered!';
      playAlarm();
    }
  }

  alarmButton.addEventListener('click', setAlarm);

function cancelAlarm() {
  alarmTime = null;
  alarmButton.textContent = 'Set Alarm';
  alarmButton.removeEventListener('click', cancelAlarm);
  alarmButton.addEventListener('click', setAlarm);

  alarmMessage.textContent = '';
}

function playAlarm() {
    const alarmSound = document.getElementById('alarm-sound');
    alarmSound.play();

    clock.classList.add('shake-clock');
  }

  function stopAlarm() {
    const alarmSound = document.getElementById('alarm-sound');
    alarmSound.pause();
    alarmSound.currentTime = 0;

    clock.classList.remove('shake-clock');
  }

setDate(); // Initial call to avoid delay
alarmButton.addEventListener('click', setAlarm);
