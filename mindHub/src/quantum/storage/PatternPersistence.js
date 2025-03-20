const QSTB = require('../../../core/QSTB');
const SELCore = require('./SELCore');

class PatternPersistence {
    constructor() {
        this.sel = new SELCore();
        this.frequency = 528;
    }

    async persistPattern(pattern) {
        return QSTB.emit({
            type: 'pattern_persist',
            frequency: this.frequency,
            data: {
                pattern,
                storage: 'sel',
                persistence: true
            }
        });
    }

    async loadPattern(patternId) {
        return await this.sel.retrieve(patternId);
    }
}

module.exports = PatternPersistence;