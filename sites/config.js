const QSTB = require('../../../private/core/QSTB');

const SiteConfig = {
    frequency: 528,
    sites: {
        'myndscript.com': {
            type: 'primary',
            routes: ['/', '/blog', '/projects'],
            quantum: true
        },
        'syncnificantmind.net': {
            type: 'secondary',
            routes: ['/', '/mind', '/sync'],
            quantum: true
        }
    }
};

module.exports = SiteConfig;