import { QuantumState } from '../quantum/State';
import { MindSQL } from './MindSQL';

export class AIContextManager {
    private static instance: AIContextManager;
    private currentContext: {
        project: string;
        methods: string[];
        quantum: boolean;
        neural: boolean;
    };

    private constructor() {
        this.currentContext = {
            project: '',
            methods: [],
            quantum: false,
            neural: false
        };
    }

    static getInstance(): AIContextManager {
        if (!this.instance) {
            this.instance = new AIContextManager();
        }
        return this.instance;
    }

    setContext(context: {
        project: string;
        methods: string[];
        quantum?: boolean;
        neural?: boolean;
    }): void {
        this.currentContext = {
            ...context,
            quantum: context.quantum ?? false,
            neural: context.neural ?? false
        };
        
        // Log context change to MindSQL
        const mindSQL = new MindSQL();
        mindSQL.storeThought('context_change', [
            `Project: ${context.project}`,
            `Methods: ${context.methods.join(', ')}`,
            `Using Quantum: ${context.quantum}`,
            `Using Neural: ${context.neural}`
        ]);
    }

    getAvailableMethods(): string[] {
        if (this.currentContext.quantum) {
            return ['QSTB', 'QuantumState', 'MindSQL'];
        }
        return ['Neural', 'Traditional'];
    }

    validateMethod(method: string): boolean {
        return this.getAvailableMethods().includes(method);
    }
}