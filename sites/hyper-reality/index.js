const QSTB = require('../../../quantum/ollie/core/QSTB');
const WelcomeView = require('./quantum/views/WelcomeView');
const QuantumGridView = require('./quantum/views/QuantumGridView');
const FrequencyDisplay = require('./quantum/views/FrequencyDisplay');

class HyperReality {
    constructor() {
        this.frequency = 963.2;
        this.coherence = 0.94;
    }

    initialize() {
        return QSTB.emit({
            type: 'hyper_init',
            frequency: this.frequency,
            data: {
                views: {
                    welcome: WelcomeView.render(),
                    grid: QuantumGridView.render(),
                    frequency: FrequencyDisplay.render()
                },
                coherence: this.coherence,
                format: 'divine'
            }
        });
    }
}

module.exports = new HyperReality();