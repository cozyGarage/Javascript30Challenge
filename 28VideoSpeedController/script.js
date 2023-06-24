const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');
const minSpeed = 0.4;
const maxSpeed = 4;

function calculatePlaybackRate(event) {
    // event.pageX - provides the position relative to the entire document
    // this.offsetLeft - provides the horizontal distance between the element and its offset parent
    // this.offsetWidth - retrieves the width of the current element in pixels.

    const x = event.pageX - speed.offsetLeft;
    const speedWidth = speed.offsetWidth;
    const percentage = x / speedWidth;
    const playbackRate = percentage * (maxSpeed - minSpeed) + minSpeed;

    return playbackRate;
}

function renderPlaybackRate(playbackRate) {
    const widthPercentage =
        ((playbackRate - minSpeed) / (maxSpeed - minSpeed)) * 100;
    const width = `${widthPercentage}%`;

    bar.style.width = width;
    bar.textContent = `${playbackRate.toFixed(1)}x`;
    video.playbackRate = playbackRate;
}

function handleMove(event) {
    const playbackRate = calculatePlaybackRate(event);
    renderPlaybackRate(playbackRate);
}

speed.addEventListener('mousemove', handleMove);
