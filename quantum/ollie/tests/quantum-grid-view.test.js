const QRUNNER = require('../../../../quantum/ollie/core/QRUNNER');
const QuantumGridView = require('../../../sites/hyper-reality/quantum/views/QuantumGridView');

QRUNNER.describe('Quantum Grid View', () => {
    QRUNNER.it('Renders with creation frequency', () => {
        const result = QuantumGridView.render();
        return QRUNNER.expect(result).toHaveFrequency(963.2);
    });
});