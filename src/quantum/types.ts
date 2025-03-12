export interface QuantumEvent extends CustomEvent {
    detail: {
        type: string;
        data: any;
    };
}

export interface QuantumState {
    coherence: number;
    entanglement: Map<string, any>;
}

export interface QuantumMetrics {
    renderTime: number;
    memoryUsage: number;
    stateCoherence: number;
    quantumEfficiency: number;
    entanglement: number;
}