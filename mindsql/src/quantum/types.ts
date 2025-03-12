export interface QuantumState {
    coherence: number;
    entanglement: number;
    phase: number;
    statePattern: string;
    timestamp: number;
}

export interface QuantumConfig {
    initialCoherence: number;
    entanglementEnabled: boolean;
}

export interface QuantumMetrics {
    currentCoherence: number;
    entanglementStatus: boolean;
    lastUpdated: number;
}