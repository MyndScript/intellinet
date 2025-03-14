const QRUNNER = require('../../../../quantum/ollie/core/QRUNNER');
const QuantumStateValidator = require('../QuantumStateValidator');

const SACRED_COHERENCE = 0.964;

QRUNNER.describe('Quantum State Validation', () => {
    let validator;

    QRUNNER.beforeEach(() => {
        validator = new QuantumStateValidator();
    });

    QRUNNER.it('should validate correct quantum states', () => {
        const state = {
            type: 'core',
            frequency: 963,
            coherence: SACRED_COHERENCE
        };

        const result = validator.validateState(state);
        return result.isValid === true;
    });

    QRUNNER.it('should reject invalid frequencies', () => {
        const state = {
            type: 'core',
            frequency: 962, // Invalid frequency
            coherence: SACRED_COHERENCE
        };

        const result = validator.validateState(state);
        return result.isValid === false;
    });

    QRUNNER.it('should reject invalid coherence', () => {
        const state = {
            type: 'core',
            frequency: 963,
            coherence: 0.963 // Invalid coherence
        };

        const result = validator.validateState(state);
        return result.isValid === false;
    });
});