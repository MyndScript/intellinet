const QRUNNER = require('../../../../quantum/ollie/core/QRUNNER');
const WelcomeView = require('../../../sites/hyper-reality/quantum/views/WelcomeView');

QRUNNER.describe('Welcome View', () => {
    QRUNNER.it('Renders with creation frequency', () => {
        const result = WelcomeView.render();
        return QRUNNER.expect(result).toHaveFrequency(963.2);
    });

    QRUNNER.it('Materializes and persists', () => {
        const result = WelcomeView.materialize();
        return QRUNNER.expect(result).toHaveFrequency(528.0);
    });
});