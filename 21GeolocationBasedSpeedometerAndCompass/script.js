const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');

const successCallback = (position) => {
    const lat = position.coords.latitude.toFixed(4);
    const long = position.coords.longitude.toFixed(4);
    const spd = position.coords.speed ? position.coords.speed.toFixed(1) : 0;
    console.log(spd);

    latitude.textContent = lat;
    longitude.textContent = long;
    speed.textContent = spd;

    arrow.style.transform = `rotate(${position.coords.heading}deg)`;
};

const errorCallback = (error) => {
    if (error.code === 1) {
        alert('Please enable location access to use this feature');
    }
};

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(successCallback, errorCallback);
} else {
    alert('Geolocation is not supported by your browser');
}