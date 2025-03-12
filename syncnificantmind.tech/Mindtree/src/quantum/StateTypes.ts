import { QuantumState } from '../../../../mindsql/src/quantum/State';

export interface QuantumTreeNode {
    state: QuantumState;
    coherence: number;
    entanglement: {
        level: number;
        connections: string[];
    };
    temporal: {
        timestamp: Date;
        foundation: boolean;
    };
}