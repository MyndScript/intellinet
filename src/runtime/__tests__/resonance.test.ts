import { ResonanceSystem } from '../resonance';
import { QuantumState } from '../../types/quantum';

describe('ResonanceSystem', () => {
    let system: ResonanceSystem;
    let mockState: QuantumState;

    beforeEach(() => {
        mockState = {
            field: {
                strength: 1.0,
                frequency: 0.8,
                resonance: 0.95,
                coherence: 1.0,
                harmonics: {
                    amplitude: 1.0,
                    phase: 0.0,
                    baseFrequency: 440,
                    overtones: [1, 2, 3],
                    enabled: true
                }
            },
            evolution: {
                pattern: 'adaptive',
                phase: 'initiation',
                resonanceField: {
                    strength: 1.0,
                    frequency: 0.8
                }
            }
        };
        system = new ResonanceSystem(mockState);
    });

    test('processes resonance when harmonics enabled', () => {
        system.processResonance();
        expect(mockState.field.resonance).not.toBe(0.95);
    });
});