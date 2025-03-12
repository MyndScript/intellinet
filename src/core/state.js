// PURE JS: Neural thought management system
class ThoughtState {
    constructor() {
        this.mindscape = new Map(); // was: store
        this.memories = new Map(); // was: history
        this.observers = new Map(); // was: watchers
    }

    evolveThought(concept, insight) {
        // was: setState
        const previousInsight = this.mindscape.get(concept);
        this.mindscape.set(concept, insight);
        this.recordMemory(concept, previousInsight, insight);
        this.notifyObservers(concept, previousInsight, insight);
    }

    perceiveThought(concept) {
        // was: getState
        return this.mindscape.get(concept);
    }

    observeThought(concept, observer) {
        // was: watch
        if (!this.observers.has(concept)) {
            this.observers.set(concept, new Set());
        }
        this.observers.get(concept).add(observer);
    }

    recordMemory(concept, oldInsight, newInsight) {
        this.memories.set(Date.now(), {
            concept,
            oldInsight,
            newInsight,
            timestamp: Date.now(),
        });
    }

    recallMemories(concept) {
        // was: getHistory
        return Array.from(this.memories.values()).filter(
            (memory) => memory.concept === concept
        );
    }

    notifyObservers(concept, oldInsight, newInsight) {
        const observers = this.observers.get(concept);
        if (observers) {
            observers.forEach((observer) => observer(oldInsight, newInsight));
        }
    }
}
