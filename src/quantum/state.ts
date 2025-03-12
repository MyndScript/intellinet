export class QuantumState {
    private state: Map<string, any>;

    constructor() {
        this.state = new Map();
    }

    setState(key: string, value: any): void {
        this.state.set(key, value);
    }

    getState(key: string): any {
        return this.state.get(key);
    }
}