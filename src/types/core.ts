export interface ProjectStructure {
    id: string;
    name: string;
    version: string;
    files: string[];
    root?: string;
}

export interface QuantumHarmonics {
    amplitude: number;
    phase: number;
    baseFrequency: number;
    overtones: number[];
    enabled: boolean;
}

export interface QuantumField {
    strength: number;
    frequency: number;
    resonance: number;
    coherence: number;
    harmonics: QuantumHarmonics;
}

export interface QuantumState {
    field: QuantumField;
    evolution: {
        pattern: 'adaptive' | 'static';
        phase: 'initiation' | 'transition' | 'completion';
        resonanceField: {
            strength: number;
            frequency: number;
        };
    };
}

export interface QuantumProject extends ProjectStructure {
    quantum: QuantumState;
}