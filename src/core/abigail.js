const fs = require('fs');
const path = require('path');

class Abigail {
    constructor() {
        this.dependencies = {};
        this.dictionaryPath = path.resolve(
            __dirname,
            '../../dependencyDictionary.json'
        );
        this.loadDictionary();
        this.register('sample-dependency', {}); // Register a sample dependency
        console.log('Sample dependency registered:', this.dependencies); // Log the registration
    }

    loadDictionary() {
        if (fs.existsSync(this.dictionaryPath)) {
            const data = fs.readFileSync(this.dictionaryPath, 'utf8');
            this.dependencies = JSON.parse(data).dependencies;
        }
    }

    saveDictionary() {
        const data = JSON.stringify(
            { dependencies: this.dependencies },
            null,
            2
        );
        fs.writeFileSync(this.dictionaryPath, data, 'utf8');
    }

    register(name, implementation) {
        this.dependencies[name] = implementation;
        this.saveDictionary();
    }

    resolve(name) {
        if (!this.dependencies[name]) {
            throw new Error(`Dependency ${name} not found`);
        }
        return this.dependencies[name];
    }

    listDependencies() {
        return Object.keys(this.dependencies);
    }
}

module.exports = new Abigail();
