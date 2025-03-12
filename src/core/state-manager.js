// PURE JS: Central state management system
class QuantumStateManager {
    constructor() {
        // PURE JS: Using Map for multiple state instances
        this.states = new Map();
    }

    createState(name) {
        const state = new QuantumState();
        this.states.set(name, state);
        return state;
    }

    getState(name) {
        return this.states.get(name);
    }
}
