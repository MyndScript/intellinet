"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateLogger = void 0;
class StateLogger {
    constructor() {
        this.logBuffer = [];
        this.maxBufferSize = 1000;
        this.listeners = [];
    }
    static getInstance() {
        if (!StateLogger.instance) {
            StateLogger.instance = new StateLogger();
        }
        return StateLogger.instance;
    }
    clear() {
        this.logBuffer = [];
        this.listeners = [];
    }
    log(state) {
        const logEntry = `[${new Date().toISOString()}] ${state.toString()}`;
        this.logBuffer.push(logEntry);
        if (this.logBuffer.length > this.maxBufferSize) {
            this.logBuffer = this.logBuffer.slice(-this.maxBufferSize);
        }
        this.listeners.forEach(listener => listener(state));
    }
    getBuffer() {
        return [...this.logBuffer];
    }
    addListener(callback) {
        this.listeners.push(callback);
    }
    removeListener(callback) {
        this.listeners = this.listeners.filter(l => l !== callback);
    }
}
exports.StateLogger = StateLogger;
