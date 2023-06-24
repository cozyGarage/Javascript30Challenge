const nav = document.querySelector('#main');
const topOfNav = nav.offsetTop;

function fixNav() {
    // console.log(topOfNav, window.scrollY);
    if (window.scrollY >= topOfNav) {
        document.body.classList.add('fixed-nav');
        document.body.style.paddingTop = `${nav.offsetHeight}px`;
    } else {
        document.body.classList.remove('fixed-nav');
        document.body.style.paddingTop = `0px`;
    }

}

window.addEventListener('scroll', fixNav);