const QSTB = require('../../private/core/QSTB');
const HexGrid = require('../../private/core/HexGrid');

const GitBridge = {
    frequency: 639,

    initialize() {
        return QSTB.emit({
            type: 'git_bridge',
            frequency: this.frequency,
            state: {
                sites: ['myndscript.com', 'syncnificantmind.net'],
                storage: HexGrid.initialize(),
                public: true
            }
        });
    },

    syncContent(content) {
        return QSTB.emit({
            type: 'git_sync',
            frequency: this.frequency,
            state: {
                content: HexGrid.store(content),
                public: true
            }
        });
    }
};

module.exports = GitBridge;
```
# .gitignore
node_modules/
.DS_Store
*.log