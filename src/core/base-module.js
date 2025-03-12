class BaseModule {
    constructor(name) {
        this.name = name;
        this.dependencies = new Set();
    }

    export(implementation) {
        QuantumModules.define(this.name, implementation);
    }
}
