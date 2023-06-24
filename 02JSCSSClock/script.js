const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const dateSpan = document.querySelector('.date');
const alarmInput = document.querySelector('#alarm-input');
const alarmButton = document.querySelector('#alarm-button');
const alarmMessage = document.querySelector('.alarm-message');

let alarmTime = null;

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
  const inputTime = alarmInput.value;
  if (!inputTime) return;

  const [hours, minutes] = inputTime.split(':');
  const now = new Date();
  const alarmDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );

  if (alarmDate < now) {
    // If the alarm time is in the past, set it for tomorrow
    alarmDate.setDate(alarmDate.getDate() + 1);
  }

  alarmTime = alarmDate;
  alarmButton.textContent = 'Cancel Alarm';
  alarmButton.removeEventListener('click', setAlarm);
  alarmButton.addEventListener('click', cancelAlarm);

  alarmMessage.textContent = `Alarm set for ${alarmDate.toLocaleTimeString()}`;
  alarmInput.value = '';
}

function cancelAlarm() {
  alarmTime = null;
  alarmButton.textContent = 'Set Alarm';
  alarmButton.removeEventListener('click', cancelAlarm);
  alarmButton.addEventListener('click', setAlarm);

  alarmMessage.textContent = '';
}

function playAlarm() {
  // Replace this with your desired alarm behavior
  alert('ALARM!');
}

setDate(); // Initial call to avoid delay
alarmButton.addEventListener('click', setAlarm);
