export class StateTracker {
    private states: Map<string, Set<string>> = new Map();
    
    trackStateChange(nodeId: string, newState: string) {
        if (!this.states.has(nodeId)) {
            this.states.set(nodeId, new Set());
        }
        this.states.get(nodeId).add(newState);
    }
}