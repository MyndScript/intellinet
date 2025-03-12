class WebIntegration {
    constructor() {
        this.webModules = new Map();
    }

    integrateModule(name, module) {
        if (!this.webModules.has(name)) {
            this.webModules.set(name, module);
        }
    }

    getModule(name) {
        return this.webModules.get(name);
    }
}

export default WebIntegration;
