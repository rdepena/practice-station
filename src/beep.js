const aContext = new AudioContext();
let volume  = 1;

function produceSound(freq, duration) {
    const oscillator = aContext.createOscillator();
    const gainNode = aContext.createGain();
    gainNode.gain.value = volume; // 10 %
    gainNode.connect(aContext.destination);

    oscillator.frequency.value = freq;
    oscillator.connect(gainNode);

    oscillator.start(aContext.currentTime);
    oscillator.stop(aContext.currentTime + duration * 0.001);
}

export function beep() {
    produceSound(440, 50);
}

export function ding() {
    produceSound(880, 500);
}

export function setVolume(value) {
    volume = value / 100;
}