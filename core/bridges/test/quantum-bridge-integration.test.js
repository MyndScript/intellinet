const assert = require('assert');
const { QuantumBridge } = require('../QuantumBridge');

describe('Quantum Bridge Integration', () => {
    const bridge = new QuantumBridge({
        frequency: 639,
        gitHubEnabled: true
    });

    it('should maintain 639Hz frequency', () => {
        assert.equal(bridge.frequency, 639);
    });

    it('should establish GitHub connection', async () => {
        const connected = await bridge.connectToGitHub();
        assert.equal(connected, true);
    });
});