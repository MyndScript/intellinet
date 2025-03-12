"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const State_1 = require("../../quantum/State");
const globals_1 = require("@jest/globals");
(0, globals_1.describe)('QuantumState', () => {
    let state;
    (0, globals_1.beforeEach)(() => {
        state = new State_1.QuantumState();
    });
    (0, globals_1.test)('should initialize with correct quantum values', () => {
        const properties = state.observe();
        (0, globals_1.expect)(properties.coherence).toBe(1.0);
        (0, globals_1.expect)(properties.entanglement).toBe(0.8);
        (0, globals_1.expect)(properties.phase).toBeDefined();
    });
    (0, globals_1.test)('should properly entangle with other quantum properties', () => {
        const initial = state.observe();
        const otherProperties = {
            coherence: 0.5,
            entanglement: 0.5,
            phase: Math.PI
        };
        state.entangleWith(otherProperties);
        const after = state.observe();
        (0, globals_1.expect)(after.coherence).toBeGreaterThan(0);
        (0, globals_1.expect)(after.coherence).toBeLessThanOrEqual(1);
        (0, globals_1.expect)(after.coherence).not.toBe(initial.coherence);
    });
});
