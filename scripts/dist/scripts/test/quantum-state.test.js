import { AIEnhancedEventEmitter } from '../../src/core/event-system.js';
import { QuantumStateManager } from '../../src/core/quantum/state-manager.js';
class QuantumStateTester {
    events;
    quantum;
    constructor() {
        this.events = new AIEnhancedEventEmitter();
        this.quantum = new QuantumStateManager();
        this.initializeEvents();
    }
    initializeEvents() {
        this.events.on('test:start', () => {
            console.log('🔬 Starting quantum state tests...');
            this.runTests();
        });
        this.events.on('quantum:state:created', (state) => {
            console.log('✨ Quantum state created:', state.path);
            this.verifyState(state);
        });
    }
    verifyState(state) {
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
    runTests() {
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
