import { html, render } from '..//node_modules/lit-html/lit-html.js';
import { ding } from './beep.js';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class Timer  extends HTMLElement {
    constructor() {
        super();

        this.timeWorker = new Worker('src/timer-worker.js');
        this.selectedTime = 0;
        this.time = 0;
        this.running = false;

        this.timeWorker.onmessage = async (e) => {
            if (e.data === 'tick') {
                if (this.time-- === 0) {
                    ding();
                    await timeout(1000);
                    ding();
                    await timeout(1000);
                    ding();
                    this.time = this.selectedTime*60;
                    this.stop();
                }
                this.render(this.time);
            }
        };

        this.render = this.render.bind(this);
        this.toggle = this.toggle.bind(this);
        this.select = this.select.bind(this);
        this.start = this.start.bind(this);
        this.stop= this.stop.bind(this);
        this.select(5);
    }

    stop() {
        this.timeWorker.postMessage({ interval: 1000, action: 'stop' });
        this.running = false;
    }

    start() {
        this.timeWorker.postMessage({ interval: 1000, action: 'start' });
        this.running = true;
    }

    toggle () {
        if (this.running) {
            this.stop();
        } else {
            this.start();
        }
    }

    select (val) {
        this.stop();
        this.selectedTime = val;
        this.time = this.selectedTime*60;
        this.render(this.time);
    }

    render (time) {
        window.requestAnimationFrame(() => {

            const timer = (minutes, seconds) => html`
            <form>
                <div class="form-group">
                    <label for="timerSelect">Timer:</label>
                    <select @change=${ (e) => this.select(e.target.value) } class="custom-select">
                        <option selected value="5">5 Minutes</option>
                        <option value="10">10 Minutes</option>
                        <option value="15">15 Minutes</option>
                        <option value="30">30 Minutes</option>  
                        <option value="60">60 Minutes</option>
                    </select>
                </div>
                <div class="form-group">
                    <button @click=${ this.toggle } type="button"
                        class="btn btn-primary">Start/Stop</button>
                </div>
                <div class="form-group">
                    <span>
                    ${ minutes }: ${ seconds < 10 ? '0' + seconds : seconds }</span>
                </div>
            </form>`;
            
            render(timer(Math.floor(time / 60), Math.floor(time % 60)), this);
        });
    }
}

customElements.define('timer-display', Timer);  