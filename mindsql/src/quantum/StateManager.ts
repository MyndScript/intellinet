import { QuantumState } from './State';
import { QSTB } from './QSTB';

export class StateManager {
    private currentState: QuantumState;
    private qstb: QSTB;

    constructor() {
        this.qstb = new QSTB();
        this.currentState = new QuantumState();
    }

    getCurrentState(): QuantumState {
        return this.currentState;
    }
}