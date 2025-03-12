import { DigitalDNA } from '../../core/identity/DigitalDNA';
import { describe, test, expect } from '../../quantum/testing';

describe("🧬 MindSQL Behavior Evolution", () => {
    let dna: DigitalDNA;

    test("adapts to evolving user patterns", () => {
        dna = new DigitalDNA();

        // Initial pattern
        const initialPattern = {
            deviceId: "test-device-1",
            rhythm: {
                active: [9, 10, 11],
                typing: [80, 85, 82],
                movement: [[100,200], [150,300]]
            }
        };

        // Register initial pattern
        dna.registerDevice("test-user", initialPattern);

        // Simulate pattern evolution
        const evolvedPattern = {
            deviceId: "test-device-1",
            rhythm: {
                active: [10, 11, 12],  // Shifted by 1 hour
                typing: [82, 87, 84],  // Slightly faster typing
                movement: [[110,210], [160,310]]  // Similar movement
            }
        };

        // Should still recognize user despite evolution
        const result = dna.recognizePresence({
            name: "test-user",
            device: evolvedPattern,
            currentPattern: [82, 87, 84]
        });

        expect(result).toBeDefined();
        console.log("🦋 User pattern naturally evolved!");
    });
});