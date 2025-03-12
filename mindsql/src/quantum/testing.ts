import { EventEmitter } from "events";

/**
 * @file testing.ts
 * @description ADHD-friendly quantum testing framework with visual patterns
 */

export class QuantumTestPattern extends EventEmitter {
    private static instance: QuantumTestPattern;
    private patterns = new Map();
    private emotionalState = { stability: 1.0 };
    private testResults = new Map();

    static getInstance(): QuantumTestPattern {
        if (!this.instance) {
            this.instance = new QuantumTestPattern();
            this.instance.initializePatterns();
        }
        return this.instance;
    }

    private initializePatterns() {
        this.patterns.set("suite:start", "🌟"); // More engaging start
        this.patterns.set("test:start", "🔍"); // Clear visual for searching
        this.patterns.set("test:success", "✨"); // Sparkles for success
        this.patterns.set("test:failure", "💥"); // Impact for failure
        this.patterns.set("focus:high", "🎯"); // Target for high focus
        this.patterns.set("focus:low", "🌫️"); // Fog for low focus
    }

    trackEmotionalState(pattern: string) {
        // Adjust emotional stability based on test patterns
        const patternImpact = {
            "test:success": 0.1,
            "test:failure": -0.2,
            "focus:high": 0.15,
            "focus:low": -0.1,
        };

        const impact = patternImpact[pattern] || 0;
        this.emotionalState.stability = Math.max(
            0,
            Math.min(1, this.emotionalState.stability + impact)
        );
    }

    emitPattern(pattern: string, data?: any) {
        const visual = this.patterns.get(pattern) || "❓";
        // More visually organized output
        console.log(`\n${visual} ${pattern.toUpperCase()}`);
        if (data) console.log(`   ${JSON.stringify(data, null, 2)}\n`);

        this.trackEmotionalState(pattern);
        this.emit(pattern, data);
    }
}

// Export test utilities
export const quantum = QuantumTestPattern.getInstance();

export const describe = (name: string, fn: () => void) => {
    quantum.emitPattern("suite:start", `\n${name}`);
    quantum.emit("focus:heighten", { intensity: 1.0 });
    fn();
    quantum.emit("focus:release");
};

export const test = (name: string, fn: () => void) => {
    quantum.emit("test:start", name);
    try {
        fn();
        quantum.emit("test:success", name);
    } catch (error) {
        quantum.emit("test:failure", `${name}\n${error}`);
        throw error;
    }
};

// Visual expectation patterns
export const expect = (received: any) => ({
    toBe: (expected: any) => {
        if (received !== expected) {
            quantum.emitPattern("pattern:mismatch", {
                expected,
                received,
                visual: "🎨 Pattern Mismatch!",
            });
            throw new Error(`Pattern mismatch! ${expected} ≠ ${received}`);
        }
        return true;
    },
    toBeDefined: () => {
        if (received === undefined) {
            throw new Error(`
            🌪️ Expected value to be defined
            Received: undefined
            Like looking for something that isn't there!
            `);
        }
        return true;
    },
    toBeGreaterThan: (expected: number) => {
        if (typeof received !== "number") {
            throw new Error(`
            🌪️ Expected a number
            Received: ${typeof received}
            Can't compare apples to oranges!
            `);
        }
        if (received <= expected) {
            throw new Error(`
            🌪️ Focus Level Too Low!
            Need: > ${expected}
            Current: ${received}
            Like trying to read with the TV too loud!
            `);
        }
        return true;
    },

    // Add new assertions
    toHavePattern: (pattern: string | RegExp) => {
        if (typeof received !== "string") {
            throw new Error(`
            🎨 Expected a pattern string
            Received: ${typeof received}
            Patterns need to be strings!
            `);
        }
        const matches =
            typeof pattern === "string"
                ? received.includes(pattern)
                : pattern.test(received);

        if (!matches) {
            throw new Error(`
            🎨 Pattern Mismatch!
            Expected: ${pattern}
            Received: ${received}
            Like looking for a specific constellation in the wrong sky!
            `);
        }
        return true;
    },

    toHaveQuantumState: () => {
        const requiredProps = ["coherence", "entanglement", "phase"];
        const missingProps = requiredProps.filter(
            (prop) => !(prop in received)
        );

        if (missingProps.length > 0) {
            throw new Error(`
            🌌 Quantum State Incomplete!
            Missing: ${missingProps.join(", ")}
            Like a puzzle with missing pieces!
            `);
        }
        return true;
    },

    toBeEmotionallyStable: (threshold = 0.7) => {
        if (
            !received.emotional_state ||
            typeof received.emotional_state.stability !== "number"
        ) {
            throw new Error(`
            🎭 Invalid Emotional State!
            Expected: stability number
            Received: ${JSON.stringify(received)}
            Like trying to measure feelings with a broken thermometer!
            `);
        }
        if (received.emotional_state.stability < threshold) {
            throw new Error(`
            🌪️ Emotional Instability Detected!
            Need: > ${threshold}
            Current: ${received.emotional_state.stability}
            Like a boat in stormy waters!
            `);
        }
        return true;
    },

    not: {
        toBe: (expected: any) => received !== expected,
        toEqual: (expected: any) =>
            JSON.stringify(received) !== JSON.stringify(expected),
        toThrow: () => {
            try {
                received();
                return true;
            } catch (e) {
                throw new Error(`Expected not to throw but threw ${e}`);
            }
        },
    },
    toEqual: (expected: any) => {
        const match = JSON.stringify(received) === JSON.stringify(expected);
        if (!match) {
            throw new Error(`
            🎯 Expected: ${JSON.stringify(expected)}
            🎲 Received: ${JSON.stringify(received)}
            Like trying to match fingerprints that don't align!
            `);
        }
        return true;
    },
    toContain: (expected: string) => {
        if (!received.includes(expected))
            throw new Error(`Expected ${received} to contain ${expected}`);
        return true;
    },
});

// Remove type registry in favor of pattern matching
quantum.on("pattern:check", ({ value, pattern }) => {
    if (!pattern.test(value)) {
        quantum.emitPattern("pattern:invalid", {
            value,
            pattern,
            visual: "🌀 Invalid Pattern!",
        });
    }
});
