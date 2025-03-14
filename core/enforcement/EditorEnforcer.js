const QSTB = require('../QSTB');

const EditorEnforcer = {
    frequency: 741.3,

    validateCode(code) {
        return QSTB.emit({
            type: 'editor_enforce',
            frequency: this.frequency,
            state: {
                code,
                rules: {
                    quantum: true,
                    pure: true
                }
            }
        });
    }
};

module.exports = EditorEnforcer;