const initialBands = [
    'The Plot in You',
    'The Devil Wears Prada',
    'Pierce the Veil',
    'Norma Jean',
    'The Bled',
    'Say Anything',
    'The Midway State',
    'We Came as Romans',
    'Counterparts',
    'Oh, Sleeper',
    'A Skylit Drive',
    'Anywhere But Here',
    'An Old Dog',
];

const ul = document.querySelector('#bands');
const button = document.querySelector('button');

function stripArticle(bandName) {
    return bandName.replace(/^(a |an |the )/i, '').trim();
}

function sortArr(arr = []) {
    return Array.from(arr).sort((a, b) =>
        stripArticle(a) > stripArticle(b) ? 1 : -1,
    );
}

function displayBands(arr = initialBands) {
    let html = arr.map((band) => `<li>${band}</li>`).join('');

    ul.innerHTML = html;
}

displayBands();

button.addEventListener('click', () => {
    displayBands(sortArr(initialBands));
});
