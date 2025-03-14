const QSTB = require('./QSTB');

const GitBridge = {
    frequency: 639,

    initialize() {
        return QSTB.emit({
            type: 'git_bridge',
            frequency: this.frequency,
            state: {
                sites: {
                    primary: 'myndscript.com',
                    secondary: 'syncnificantmind.net'
                },
                quantum: true
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