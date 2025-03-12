import { TestRunner } from './testUtils';
import * as path from 'path';
import { QuantumTestBench } from '../quantum/testing';

describe('HelloWorld consciousness', () => {
    it('should process quantum fields correctly', async () => {
        const testFile = path.join(__dirname, 'hello.ms');
        const result = await TestRunner.runTest(testFile);
        expect(result.message).toBe('Hello Quantum World');
    });
});

describe('HelloWorld Quantum Performance', () => {
    const bench = new QuantumTestBench();
    
    test('should outperform React rendering', async () => {
        const component = await bench.initialize('HelloWorld');
        const metrics = await bench.runPerformanceTest({
            iterations: 1000,
            stateChanges: true,
            parallelOperations: true
        });

        expect(metrics.renderTime).toBeLessThan(bench.getReactBaseline());
        expect(metrics.memoryUsage).toBeLessThan(bench.getReactBaseline('memory'));
        expect(metrics.stateCoherence).toBeGreaterThan(0.95);
    });
});