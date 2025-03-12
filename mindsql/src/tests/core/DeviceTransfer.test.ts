import { DigitalDNA } from '../../core/identity/DigitalDNA';
import { describe, test, expect } from '../../quantum/testing';

describe("🔄 MindSQL Device Transfer", () => {
    let dna: DigitalDNA;

    test("transfers identity to new device", () => {
        dna = new DigitalDNA();

        // Original device
        const originalDevice = {
            deviceId: "original-device",
            rhythm: {
                active: [9, 10, 11],
                typing: [80, 85, 82],
                movement: [[100,200], [150,300]]
            }
        };

        // Register original device
        const identity = dna.registerDevice("test-user", originalDevice);

        // New device requesting transfer
        const newDevice = {
            deviceId: "new-device",
            rhythm: {
                active: [9, 10, 11],  // Similar pattern
                typing: [78, 83, 80], // Slight variation
                movement: [[105,205], [155,305]] // Close enough
            }
        };

        // Initiate transfer using original device to authorize
        const transferResult = dna.transferIdentity({
            name: "test-user",
            sourceDevice: originalDevice,
            targetDevice: newDevice
        });

        expect(transferResult.success).toBe(true);
        console.log("🔄 Device transfer complete!");
    });
});