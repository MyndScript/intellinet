"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIContextManager = void 0;
const MindSQL_1 = require("./MindSQL");
class AIContextManager {
    constructor() {
        this.currentContext = {
            project: '',
            methods: [],
            quantum: false,
            neural: false
        };
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new AIContextManager();
        }
        return this.instance;
    }
    setContext(context) {
        this.currentContext = {
            ...context,
            quantum: context.quantum ?? false,
            neural: context.neural ?? false
        };
        // Log context change to MindSQL
        const mindSQL = new MindSQL_1.MindSQL();
        mindSQL.storeThought('context_change', [
            `Project: ${context.project}`,
            `Methods: ${context.methods.join(', ')}`,
            `Using Quantum: ${context.quantum}`,
            `Using Neural: ${context.neural}`
        ]);
    }
    getAvailableMethods() {
        if (this.currentContext.quantum) {
            return ['QSTB', 'QuantumState', 'MindSQL'];
        }
        return ['Neural', 'Traditional'];
    }
    validateMethod(method) {
        return this.getAvailableMethods().includes(method);
    }
}
exports.AIContextManager = AIContextManager;
