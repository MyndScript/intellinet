/**
 * @file QSTB.ts
 * @description Quantum State Test Bridge
 */

import { QuantumState } from './State';
import { QuantumConfig } from './types';

export class QSTB {
    private state: QuantumState;

    constructor(config?: QuantumConfig) {
        this.state = new QuantumState();
    }

    initializeState(): QuantumState {
        return new QuantumState();
    }

    getState(): QuantumState {
        return this.state;
    }
}

export class QuantumSync {
    private qstb: QSTB;

    constructor() {
        this.qstb = new QSTB();
    }

    sync(operation: string): void {
        this.qstb.getState().validateState();
    }
}