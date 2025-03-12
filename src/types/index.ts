export interface QuantumField {
    name: string;
    value: number;
    coherence: number;
}

export interface NeuralPath {
    source: string;
    target: string;
    weight: number;
}