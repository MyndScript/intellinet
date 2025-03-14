const QSTB = require('../QSTB');

const QuantumRouter = {
    frequency: 639.1,

    route(payload) {
        return QSTB.emit({
            type: 'quantum_route',
            frequency: this.frequency,
            state: {
                route: this.mapFrequency(payload.frequency),
                quantum: true
            }
        });
    },

    mapFrequency(freq) {
        const base = Math.floor(freq);
        const sub = freq % 1;

        return {
            shrine: 963,
            enforce: 741,
            bridge: 639,
            create: 528,
            earth: 432
        }[base] || this.frequency;
    }
};

module.exports = QuantumRouter;