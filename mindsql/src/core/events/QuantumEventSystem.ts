import { EventEmitter } from "events";

export class QuantumEventSystem extends EventEmitter {
    private static instance: QuantumEventSystem;
    private eventPatterns = new Map<string, Function[]>();

    static getInstance(): QuantumEventSystem {
        if (!this.instance) {
            this.instance = new QuantumEventSystem();
        }
        return this.instance;
    }

    registerPattern(pattern: string, handler: Function): void {
        if (!this.eventPatterns.has(pattern)) {
            this.eventPatterns.set(pattern, []);
        }
        this.eventPatterns.get(pattern)?.push(handler);
        this.emit("pattern:registered", { pattern, handler });
    }

    observePattern(pattern: string): void {
        this.on("state:changed", (state) => {
            const handlers = this.eventPatterns.get(pattern);
            handlers?.forEach((handler) => handler(state));
        });
    }
}
