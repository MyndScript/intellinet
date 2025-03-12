class StateManager {
    constructor(initialState) {
        this.currentState = initialState;
        this.stateHistory = [];
    }

    // State management (Soft yellow)
    updateState(newState) {
        this.stateHistory.push({ ...this.currentState });
        this.currentState = {
            ...this.currentState,
            ...newState,
        };
    }

    // Core operations (Bright yellow)
    evolveState() {
        const evolutionRate = this.currentState.evolution.rate;
        this.currentState.field.resonance *= evolutionRate;
    }
}

module.exports = StateManager;
