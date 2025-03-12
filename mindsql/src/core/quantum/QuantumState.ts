export class QuantumState {
    protected grid: Map<string, any> = new Map();
    
    // Add grid-related methods
    setGridValue(key: string, value: any): void {
        this.grid.set(key, value);
    }

    getGridValue(key: string): any {
        return this.grid.get(key);
    }
}