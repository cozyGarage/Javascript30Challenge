const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
canvas.willReadFrequently = true;
const context = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const takePhotoBtn = document.querySelector('button.takePhoto');
const filterButtons = document.querySelectorAll('.filter-btn');
let intervalId = null;

function getVideo() {
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((localMediaStream) => {
            console.log(localMediaStream);
            // video.src = window.URL.createObjectURL(localMediaStream); //depricated
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch((err) => {
            console.error('Oh no!', err);
        });
}

function paintToCanvas(filterEffect) {
    // clear any previous interval
    clearInterval(intervalId);

    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    intervalId = setInterval(() => {
        context.drawImage(video, 0, 0, width, height);
        let pixels = context.getImageData(0, 0, width, height); // take the pixel out
        pixels = filterEffect(pixels); // mess with them
        context.putImageData(pixels, 0, 0); // put them back
    }, 16);
}

// Filters start

function noEffect() {
    // clear any previous interval
    clearInterval(intervalId);

    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    intervalId = setInterval(() => {
        context.drawImage(video, 0, 0, width, height);
        let pixels = context.getImageData(0, 0, width, height); // take the pixel out
        context.putImageData(pixels, 0, 0); // put them back
    }, 16);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue
    }
    return pixels;
}

function rgbSplitEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // red
        pixels.data[i + 400] = pixels.data[i + 1]; // green
        pixels.data[i - 400] = pixels.data[i + 2]; // blue
    }
    return pixels;
}

function greenScreenEffect(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (
            red >= levels.rmin &&
            green >= levels.gmin &&
            blue >= levels.bmin &&
            red <= levels.rmax &&
            green <= levels.gmax &&
            blue <= levels.bmax
        ) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

function grayscaleEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        const average =
            (pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 3;
        pixels.data[i] = average;
        pixels.data[i + 1] = average;
        pixels.data[i + 2] = average;
    }
    return pixels;
}

function sepiaEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        const r = pixels.data[i];
        const g = pixels.data[i + 1];
        const b = pixels.data[i + 2];

        pixels.data[i] = r * 0.393 + g * 0.769 + b * 0.189;
        pixels.data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
        pixels.data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
    }
    return pixels;
}

function vintageEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        const r = pixels.data[i];
        const g = pixels.data[i + 1];
        const b = pixels.data[i + 2];

        pixels.data[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b + 40);
        pixels.data[i + 1] = Math.min(
            255,
            0.349 * r + 0.686 * g + 0.168 * b + 20,
        );
        pixels.data[i + 2] = Math.min(
            255,
            0.272 * r + 0.534 * g + 0.131 * b - 10,
        );
    }
    return pixels;
}

function glitchEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        // Randomly shift the RGB values of each pixel
        pixels.data[i] = pixels.data[i + Math.floor(Math.random() * 10) - 5];
        pixels.data[i + 1] =
            pixels.data[i + 1 + Math.floor(Math.random() * 10) - 5];
        pixels.data[i + 2] =
            pixels.data[i + 2 + Math.floor(Math.random() * 10) - 5];

        // Add some static noise to the alpha channel
        pixels.data[i + 3] += Math.floor(Math.random() * 10) - 5;
    }
    return pixels;
}

function popArtEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        // Increase the brightness of each color channel
        pixels.data[i] = Math.min(255, pixels.data[i] + 100);
        pixels.data[i + 1] = Math.min(255, pixels.data[i + 1] + 50);
        pixels.data[i + 2] = Math.min(255, pixels.data[i + 2] + 150);

        // Set the alpha channel to maximum
        pixels.data[i + 3] = 255;
    }
    return pixels;
}

// Filters end

function takePhoto() {
    // played thesound
    snap.currentTime = 0;
    snap.play();

    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('target', '_blank');
    link.setAttribute('download', 'pretty');
    // link.textContent = 'Download Image';
    link.innerHTML = `<img src='${data}' alt='Pretty Woman'/>`;
    strip.appendChild(link);
}

getVideo();

video.addEventListener('canplay', noEffect);
takePhotoBtn.addEventListener('click', takePhoto);

// Add event listeners to UI elements that trigger the filter change
filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const effectName = button.classList[1].split('-')[0] + 'Effect';
        //   clearInterval(intervalId); // stop the previously applied filter
        noEffect();
        paintToCanvas(window[effectName]);
    });
});
