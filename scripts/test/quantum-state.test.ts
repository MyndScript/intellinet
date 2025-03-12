import { AIEnhancedEventEmitter } from '../../src/core/event-system.js';
import { QuantumStateManager } from '../../src/core/quantum/state-manager.js';

interface QuantumState {
    path: string;
    type: 'directory' | 'file';
    metadata: {
        quantum_id: string;
        created: number;
    };
}

export class QuantumStateTester {
    private events: AIEnhancedEventEmitter;
    private quantum: QuantumStateManager;

    constructor() {
        this.events = new AIEnhancedEventEmitter();
        this.quantum = new QuantumStateManager();
        this.initializeEvents();
    }

    private initializeEvents(): void {
        this.events.on('test:start', () => {
            console.log('🔬 Starting quantum state tests...');
            this.runTests();
        });

        this.events.on('quantum:state:created', (state: QuantumState) => {
            console.log('✨ Quantum state created:', state.path);
            this.verifyState(state);
        });
    }

    private verifyState(state: QuantumState): void {
        const tests = [
            {
                name: 'Has quantum ID',
                test: () => state.metadata?.quantum_id?.startsWith('q_')
            },
            {
                name: 'State is coherent',
                test: () => state.type === 'directory' || state.type === 'file'
            }
        ];

        tests.forEach(({ name, test }) => {
            const result = test();
            console.log(`${result ? '✅' : '❌'} ${name}`);
        });
    }

    runTests(): void {
        const testPaths = [
            '/var/www/IdeaHub/active-projects',
            '/var/www/IdeaHub/parked-ideas',
            '/var/www/IdeaHub/docs'
        ];

        testPaths.forEach(path => {
            this.quantum.createState({
                path,
                type: 'directory',
                metadata: {
                    created: Date.now(),
                    quantum_id: this.quantum.generateQUID()
                }
            });
        });
    }
}