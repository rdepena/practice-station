const aContext = new AudioContext();

function produceSound(freq, duration) {
    const oscillator = aContext.createOscillator();

    oscillator.frequency.value = freq;
    oscillator.connect(aContext.destination);

    oscillator.start(aContext.currentTime);
    oscillator.stop(aContext.currentTime + duration * 0.001);
}

export function beep() {
    produceSound(440, 50);
}

export function ding() {
    produceSound(880, 500);
}