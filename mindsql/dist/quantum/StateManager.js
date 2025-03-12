"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateManager = void 0;
const QSTB_1 = require("./QSTB");
class StateManager {
    constructor() {
        this.qstb = new QSTB_1.QSTB();
        this.currentState = this.qstb.initializeState();
    }
    getCurrentState() {
        return this.currentState;
    }
}
exports.StateManager = StateManager;
