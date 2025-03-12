import { 
    QuantumState, 
    SynapticPattern, 
    ProcessedPattern,
    ClassicalProcessor,
    QuantumCore 
} from '../types/quantum';

export class QuantumProcessor {
    private classicalCore: ClassicalProcessor;
    private quantumCore: QuantumCore;
    private readonly QUANTUM_THRESHOLD = 0.8;

    constructor() {
        this.classicalCore = new ClassicalProcessor();
        this.quantumCore = new QuantumCore();
    }

    async process(pattern: SynapticPattern): Promise<void> {
        const preprocessed = this.classicalCore.preprocess(pattern);
        
        if (this.requiresQuantumProcessing(preprocessed)) {
            return this.quantumCore.process(preprocessed);
        }
    }

    private requiresQuantumProcessing(pattern: ProcessedPattern): boolean {
        return pattern.complexity > this.QUANTUM_THRESHOLD;
    }
}