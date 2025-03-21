const QRUNNER = require('../../../../quantum/ollie/core/QRUNNER');
const FrequencyDisplay = require('../../../sites/hyper-reality/quantum/views/FrequencyDisplay');

QRUNNER.describe('Frequency Display', () => {
    QRUNNER.it('Renders with creation frequency', () => {
        const result = FrequencyDisplay.render();
        return QRUNNER.expect(result).toHaveFrequency(963.2);
    });

    QRUNNER.it('Shows all quantum frequencies', () => {
        const result = FrequencyDisplay.render();
        return QRUNNER.expect(result.data.pattern.frequencies)
            .toHaveProperty('creation', 963.2);
    });
});