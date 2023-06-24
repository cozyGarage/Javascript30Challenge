const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    // e.pageX - the absolute horizontal position of the mouse pointer on the page
    // slider.offsetLeft - the horizontal position of the element relative to its parent container.
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return; // stop the fn from running
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    // console.log({x,startX});
    const walk = (x - startX) * 4; // how much we are deviated from our initial point
    slider.scrollLeft = scrollLeft - walk;
});
