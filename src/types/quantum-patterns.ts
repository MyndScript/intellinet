export interface QuantumPattern {
    type: 'consciousness' | 'quantum_field' | 'neural_path';
    name: string;
    resonance: number;
    fields: Map<string, any>;
    neuralConnections: Set<string>;
}
