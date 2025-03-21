const QRUNNER = require('../../../../quantum/ollie/core/QRUNNER');
const HyperReality = require('../../../sites/hyper-reality');

QRUNNER.describe('Hyper Reality', () => {
    QRUNNER.it('Initializes with all views', () => {
        const result = HyperReality.initialize();
        return QRUNNER.expect(result).toHaveFrequency(963.2) &&
               QRUNNER.expect(result.data.views).toHaveProperty('welcome') &&
               QRUNNER.expect(result.data.views).toHaveProperty('grid') &&
               QRUNNER.expect(result.data.views).toHaveProperty('frequency');
    });
});