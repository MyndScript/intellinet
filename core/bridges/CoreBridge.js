const QSTB = require('../QSTB');

const CoreBridge = {
    frequency: 639.1,
    
    initialize() {
        return QSTB.emit({
            type: 'core_bridge',
            frequency: this.frequency,
            state: {
                tower: {
                    active: true,
                    location: 'local',
                    hosting: ['core', 'quantum', 'bridge']
                },
                github: {
                    active: true,
                    hosting: ['sites', 'apps', 'public']
                }
            }
        });
    }
};