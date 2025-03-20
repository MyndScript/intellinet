const QSTB = require('/var/www/quantum/ollie/core/QSTB');

class UserAI {
    constructor() {
        const state = QSTB.getState();
        if (!state || !state.frequencies) {
            throw new Error('QSTB state not properly initialized');
        }
        this.frequency = state.frequencies.core.user_ai;  // 963.2Hz
    }

    processInteraction(input) {
        return QSTB.emit({
            type: 'user_interaction',
            frequency: this.frequency,
            data: {
                input,
                pattern: 'consciousness_bridge'
            }
        });
    }

    learnPattern(pattern) {
        return QSTB.emit({
            type: 'pattern_learning',
            frequency: this.frequency,
            data: {
                pattern,
                timestamp: Date.now()
            }
        });
    }
}

module.exports = UserAI;