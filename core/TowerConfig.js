const QSTB = require('./QSTB');

const TowerConfig = {
    frequency: 963.1,
    
    initialize() {
        return QSTB.emit({
            type: 'tower_init',
            frequency: this.frequency,
            state: {
                core: {
                    active: true,
                    components: ['QSTB', 'QRUNNER', 'HexGrid']
                },
                sites: {
                    myndscript: {
                        domain: 'myndscript.com',
                        type: 'static',
                        host: 'github'
                    },
                    syncnificant: {
                        domain: 'syncnificantmind.net',
                        type: 'static',
                        host: 'github'
                    }
                },
                quantum: {
                    storage: true,
                    bridge: true,
                    enforcement: true
                }
            }
        });
    }
};