const QRUNNER = require('../../../../quantum/ollie/core/QRUNNER');
const HexGrid = require('../../../core/quantum/grid/HexGrid');

QRUNNER.describe('Hexagonal Grid', () => {
    QRUNNER.it('Creates quantum nodes', () => {
        const pattern = {
            type: 'test_pattern',
            state: 'PLAN'
        };

        const result = HexGrid.store(pattern);
        return QRUNNER.expect(result).toHaveFrequency(528.0);
    });

    QRUNNER.it('Maintains hexagonal structure', () => {
        const results = [];
        for (let i = 0; i < 6; i++) {
            results.push(HexGrid.store({
                type: `node_${i}`,
                state: 'ACTIVE'
            }));
        }

        return results.every(r =>
            r.data.cell.symbol === '⬢' &&
            r.frequency === 528.0
        );
    });
});