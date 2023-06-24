const content = document.querySelector('.content');
const text = content.querySelector('p');
const maxShadowDistance = 8; // 8px: maximum distance for the text shadow effect

function shadow(e) {
    const width = content.offsetWidth;
    const height = content.offsetHeight;

    let x = e.offsetX;
    let y = e.offsetY;
    // const { offsetWidth: width, offsetHeight: height } = content;
    // let { offsetX: x, offsetY: y } = e;

    if (this !== e.target) {
        x += e.target.offsetLeft;
        y += e.target.offsetTop;
    }

    const xWalk = Math.round(
        (x / width) * maxShadowDistance - maxShadowDistance / 2,
    );
    const yWalk = Math.round(
        (y / height) * maxShadowDistance - maxShadowDistance / 2,
    );

    text.style.textShadow = `
      ${xWalk}px ${yWalk}px 0 var(--shadow),
      ${xWalk * -1}px ${yWalk}px 0 var(--shadow),
      ${xWalk}px ${yWalk * -1}px 0 var(--shadow),
      ${xWalk * -1}px ${yWalk * -1}px 0 var(--shadow)
    `;
}

content.addEventListener('mousemove', shadow);
