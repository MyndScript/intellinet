import '@jest/globals';
import { QuantumProperties } from '../../quantum/State';

declare global {
    function createMockQuantumState(): QuantumProperties;
    function debugQuantumState(state: QuantumProperties): void;
    function validateQuantumObservation(state: QuantumProperties): boolean;
}

beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
    jest.clearAllMocks();
});

global.createMockQuantumState = () => ({
    coherence: 1.0,
    entanglement: 0,
    phase: 0,
    statePattern: 'mock',
    timestamp: Date.now()
});

global.debugQuantumState = (state: QuantumProperties) => {
    console.log(JSON.stringify(state, null, 2));
};

global.validateQuantumObservation = (state: QuantumProperties): boolean => {
    return state.coherence >= 0 && 
           state.coherence <= 1 && 
           state.entanglement >= 0 && 
           state.entanglement <= 1;
};