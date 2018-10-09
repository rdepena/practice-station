import { html, render } from '..//node_modules/lit-html/lit-html.js';
import { setVolume } from './beep.js';

export class VolumeControl extends HTMLElement {
    constructor() {
        super();
        const value = this.getAttribute('value');
        this.render = this.render.bind(this);
        this.render(+value);
    }
    render(val) {
        window.requestAnimationFrame(() => {
            setVolume(val);
            const met = (val) => html`
            <form>
                <div class="form-group">
                    <label for="volumeRange">Volume:</label>
                    <input @change=${(e) => this.render(e.srcElement.valueAsNumber)}
                        type="range" min="0" max="100" .value="${val}"
                        class="custom-range" step="1" id="volumeRange">
                </div>
                <div class="form-group">
                    <span>${val} %</span>
                </div>
            </form>`;

            render(met(val), this);
        });
    }
}

customElements.define('volume-display', VolumeControl);