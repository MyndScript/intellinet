import { QuantumState } from '../quantum/State';

export class StateLogger {
    private static instance: StateLogger;
    private logBuffer: string[] = [];
    private maxBufferSize = 1000;
    private listeners: ((state: QuantumState) => void)[] = [];

    private constructor() {}

    static getInstance(): StateLogger {
        if (!StateLogger.instance) {
            StateLogger.instance = new StateLogger();
        }
        return StateLogger.instance;
    }

    clear(): void {
        this.logBuffer = [];
        this.listeners = [];
    }

    log(state: QuantumState): void {
        const logEntry = `[${new Date().toISOString()}] ${state.toString()}`;
        this.logBuffer.push(logEntry);
        
        if (this.logBuffer.length > this.maxBufferSize) {
            this.logBuffer = this.logBuffer.slice(-this.maxBufferSize);
        }

        this.listeners.forEach(listener => listener(state));
    }

    getBuffer(): string[] {
        return [...this.logBuffer];
    }

    addListener(callback: (state: QuantumState) => void): void {
        this.listeners.push(callback);
    }

    removeListener(callback: (state: QuantumState) => void): void {
        this.listeners = this.listeners.filter(l => l !== callback);
    }
}