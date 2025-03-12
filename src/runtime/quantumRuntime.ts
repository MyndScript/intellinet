import { QuantumVirtualMachine } from './quantumVM';

export class QuantumRuntime {
    private neuralProcessor: QuantumVirtualMachine;

    constructor() {
        this.neuralProcessor = new QuantumVirtualMachine();
    }

    async processPattern(synapticPattern: Uint8Array): Promise<any> {
        // Convert Uint8Array to string before passing to run
        const patternString = new TextDecoder().decode(synapticPattern);
        return this.neuralProcessor.run(patternString);
    }
}
