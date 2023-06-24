const utterance = new SpeechSynthesisUtterance();
utterance.text = document.querySelector('[name="text" ]').value;
let voices = [];
const voiceDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakBtn = document.querySelector('#speak');
const stopBtn = document.querySelector('#stop');

function popuateVoices() {
    voices = this.getVoices();
    const voiceOptions = voices
        .filter(
            (voice) =>
                voice.lang.includes('en') ||
                voice.lang.includes('ru') ||
                voice.lang.includes('fi'),
        )
        .map(
            (voice) =>
                `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`,
        )
        .join('');
    voiceDropdown.innerHTML = voiceOptions;
}

function setVoice() {
    utterance.voice = voices.find((voice) => voice.name === this.value);
    toggle();
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(utterance);
    }
}

function setOption() {
    utterance[this.name] = this.value;
    toggle();
}

//The speechSynthesis is a global object in JavaScript,
// which provides methods to control the speech synthesis process.
speechSynthesis.addEventListener('voiceschanged', popuateVoices);

voiceDropdown.addEventListener('change', () => setVoice(true));
options.forEach((option) => option.addEventListener('change', setOption));

speakBtn.addEventListener('click', toggle);
stopBtn.addEventListener('click', () => toggle(false));
