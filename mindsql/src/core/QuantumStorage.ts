interface BehavioralMarkers {
    typingSpeed: number;
    patternType: string;
    timestamps: number[];
}

interface IdentityPattern {
    quid: string;
    behavioralMarkers: BehavioralMarkers;
    coherence: number;
    lastAccess: number;
}

export class QuantumStorage {
    private identityPatterns: Map<string, IdentityPattern>;
    private behaviorIndex: Map<string, Set<string>>;

    constructor() {
        this.identityPatterns = new Map();
        this.behaviorIndex = new Map();
    }

    async saveIdentity(identity: Partial<IdentityPattern>) {
        const patternHash = this.hashBehavior(identity.behavioralMarkers);
        const storedPattern: IdentityPattern = {
            ...(identity as IdentityPattern),
            coherence: 1.0,
            lastAccess: Date.now(),
        };

        this.identityPatterns.set(identity.quid, storedPattern);

        if (!this.behaviorIndex.has(patternHash)) {
            this.behaviorIndex.set(patternHash, new Set());
        }
        this.behaviorIndex.get(patternHash).add(identity.quid);

        console.log("🧠 Neural pattern synchronized!");
        return storedPattern;
    }

    async findByBehavior(behavior: any) {
        const patternHash = this.hashBehavior(behavior);
        const possibleMatches = this.behaviorIndex.get(patternHash);

        if (!possibleMatches) {
            console.log("🌫️ No matching neural patterns found");
            return null;
        }

        // Find best matching pattern
        let bestMatch = null;
        let highestCoherence = 0;

        for (const quid of possibleMatches) {
            const identity = this.identityPatterns.get(quid);
            const coherence = this.calculateCoherence(
                behavior,
                identity.behavioralMarkers
            );

            if (coherence > highestCoherence) {
                highestCoherence = coherence;
                bestMatch = identity;
            }
        }

        return bestMatch;
    }

    private hashBehavior(behavior: BehavioralMarkers): string {
        return `${behavior.typingSpeed}-${behavior.patternType}`;
    }

    private calculateCoherence(
        current: BehavioralMarkers,
        stored: BehavioralMarkers
    ): number {
        const speedDiff = Math.abs(current.typingSpeed - stored.typingSpeed);
        const baseCoherence = Math.max(0, 1 - speedDiff / stored.typingSpeed);

        // Add pattern type matching
        const patternMatch =
            current.patternType === stored.patternType ? 0.2 : 0;
        return Math.min(1, baseCoherence + patternMatch);
    }
}
