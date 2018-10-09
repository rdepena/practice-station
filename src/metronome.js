import { html, render } from '..//node_modules/lit-html/lit-html.js';
import { beep } from './beep.js';

export class Metronome extends HTMLElement {
    constructor() {
        super();
        const value = this.getAttribute('value');
        this.timeWorker = new Worker('src/timer-worker.js');

        this.timeWorker.onmessage = (e) => {
            if (e.data === 'tick') {
                beep();
            }
        };

        this.running = false;
        this.render = this.render.bind(this);
        this.toggle = this.toggle.bind(this);
        this.render(value);
    }
    toggle(val) {
        const interval = 60000 / val;
        const action = this.running ? 'stop' : 'start';
        
        this.timeWorker.postMessage({ interval, action });
        this.running = !this.running;
    }
    render(val) {
        window.requestAnimationFrame(() => {
            const met = (val) => html`
            <form>
                <div class="form-group">
                    <label for="formControlRange">Metronome:</label>
                    <input @change=${(e) => this.render(e.srcElement.valueAsNumber)}
                        type="range" min="0" max="260" .value="${val}"
                        class="custom-range" step="1" id="formControlRange">
                </div>
                <div class="form-group">
                    <span>${val} Bpm</span>
                </div>
                <div class="form-group" style="display: block; height: 20px;
                width: 20px; background-color:${display ? "blue": "gray" }"></div>
            </form>`;

            render(met(val), this);
        });
    }
}

customElements.define('metronome-display', Metronome);