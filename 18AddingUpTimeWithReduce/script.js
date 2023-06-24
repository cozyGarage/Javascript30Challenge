const timeNodes = document.querySelectorAll('[data-time]');
const resultButton = document.querySelector('button');
const resultSpan = document.querySelector('.result');

const totalDurationInSec = [...timeNodes]
    .map((node) => node.dataset.time)
    .map((timeStr) => {
        const [mins, secs] = timeStr.split(':').map(Number);
        return mins * 60 + secs;
    })
    .reduce((total, videoDurationSeconds) => total + videoDurationSeconds, 0);

function countHoursFromSeconds(seconds) {
    const SECONDS_PER_HOUR = 3600;
    const SECONDS_PER_MINUTE = 60;
    const hours = Math.floor(seconds / SECONDS_PER_HOUR);
    const minutes = Math.floor(
        (seconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE,
    );
    const remainingSeconds = seconds % SECONDS_PER_MINUTE;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    return formattedTime;
}

resultButton.addEventListener('click', () => {
    resultSpan.innerText = countHoursFromSeconds(totalDurationInSec);
});
