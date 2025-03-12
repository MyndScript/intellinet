"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@jest/globals");
beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
});
afterEach(() => {
    jest.clearAllMocks();
});
global.createMockQuantumState = () => {
    return {
        coherence: 1.0,
        entanglement: 0.8,
        phase: Math.PI
    };
};
global.debugQuantumState = (state) => {
    console.log(JSON.stringify(state, null, 2));
};
global.validateQuantumObservation = (state) => {
    return state.coherence >= 0 &&
        state.coherence <= 1 &&
        state.entanglement >= 0 &&
        state.entanglement <= 1;
};
