const QSTB = require('../core/QSTB');

const SiteConfig = {
    frequency: 528,

    initialize() {
        return QSTB.emit({
            type: 'site_config',
            frequency: this.frequency,
            state: {
                sites: {
                    'myndscript.com': {
                        type: 'primary',
                        routes: ['/', '/projects', '/quantum']
                    },
                    'syncnificantmind.net': {
                        type: 'secondary',
                        routes: ['/', '/mind', '/sync']
                    }
                }
            }
        });
    }
};

module.exports = SiteConfig;