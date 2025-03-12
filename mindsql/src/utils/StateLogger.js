"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateLogger = void 0;
class StateLogger {
    constructor() {
        this.logBuffer = [];
    }
    static getInstance() {
        if (!StateLogger.instance) {
            StateLogger.instance = new StateLogger();
        }
        return StateLogger.instance;
    }
    log(state) {
        this.logBuffer.push(state.toString());
        console.log(`[${new Date().toISOString()}] ${state.toString()}`);
    }
    getBuffer() {
        return [...this.logBuffer];
    }
}
exports.StateLogger = StateLogger;
