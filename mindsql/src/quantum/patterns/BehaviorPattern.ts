export class BehaviorPattern {
    private patterns: Map<string, any> = new Map();

    storePattern(identity: string, pattern: {
        typing: number[],
        mousePath: number[][],
        focusPoints: string[],
        timeSignature: number[]
    }) {
        this.patterns.set(identity, {
            ...pattern,
            timestamp: Date.now(),
            coherence: this.calculateCoherence(pattern)
        });
    }
}