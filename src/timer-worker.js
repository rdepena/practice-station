let timerId = void 0;

self.onmessage = (evt) => {
    //expecting { action, interval } to be passed.
    const { action, interval } = evt.data;

    if (action === 'start') {
        postMessage('tick');
        timerId = setInterval(() => postMessage('tick'), interval);
    } else if (action === 'stop') {
        clearInterval(timerId);
        timerId = void 0;
    }

};