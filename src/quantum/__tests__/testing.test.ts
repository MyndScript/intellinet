import { QuantumTestBench } from '../testing';
import { QSTB } from '../bridge';

describe('QuantumTestBench', () => {
    const bench = new QuantumTestBench();
    const bridge = new QSTB();

    test('should initialize component', () => {
        bridge.quantum(() => {
            const component = bench.initialize('TestComponent');
            expect(component.quantum_state).toBe('initialized');
        });
    });

    test('should measure performance metrics', () => {
        bridge.quantum(() => {
            const metrics = bench.runPerformanceTest({
                iterations: 1000,
                stateChanges: true,
                parallelOperations: true,
                entanglement_factor: 0.95
            });

            expect(metrics.renderTime).toBeLessThan(16.67); // Better than React's 60fps
            expect(metrics.memoryUsage).toBeLessThan(2048); // Less memory than React
            expect(metrics.stateCoherence).toBeGreaterThan(0.95);
            expect(metrics.quantumEfficiency).toBeGreaterThan(0.9);
            expect(metrics.entanglement).toBeDefined();
        });
    });

    test('should maintain quantum coherence', () => {
        bridge.quantum(() => {
            const coherenceLevel = bench.measureCoherence();
            expect(coherenceLevel).toBeGreaterThan(0.9);
        });
    });
});