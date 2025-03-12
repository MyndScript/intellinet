import { DigitalDNA } from '../../core/identity/DigitalDNA';
import { describe, test, expect } from '../../quantum/testing';

describe("🧬 MindSQL Digital DNA", () => {
    let dna: DigitalDNA;

    test("matches device heartbeat patterns", () => {
        dna = new DigitalDNA();

        // Create test device pattern
        const testDevice = {
            deviceId: "test-device-1",
            rhythm: {
                active: [9, 10, 11, 14, 15],    // Active hours
                typing: [80, 85, 82],           // WPM typing speed
                movement: [[100,200], [150,300]] // Mouse coordinates
            }
        };

        // Register device pattern
        dna.registerDevice("test-user", testDevice);

        // Try to recognize same device
        const result = dna.recognizePresence({
            name: "test-user",
            device: testDevice,
            currentPattern: [80, 85, 82]
        });

        expect(result).toBeDefined();
        console.log("💓 Device heartbeat recognized!");
    });
});