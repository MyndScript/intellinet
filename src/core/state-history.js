// PURE JS: Dedicated history tracking module
class QuantumStateHistory {
    constructor() {
        this.mainHistory = new Map();
        this.timeIndex = new Map();
        this.maxEntries = 1000; // Rolling history
    }

    track(entry) {
        const timestamp = Date.now();
        this.mainHistory.set(timestamp, entry);
        this.timeIndex.set(entry.key, timestamp);

        this.pruneOldEntries();
    }

    pruneOldEntries() {
        if (this.mainHistory.size > this.maxEntries) {
            const oldestKey = Math.min(...this.mainHistory.keys());
            this.mainHistory.delete(oldestKey);
        }
    }
}
