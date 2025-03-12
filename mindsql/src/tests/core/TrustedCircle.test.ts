import { DigitalDNA } from '../../core/identity/DigitalDNA';
import { describe, test, expect } from '../../quantum/testing';

describe("🛡️ MindSQL Trusted Circle", () => {
    let dna: DigitalDNA;

    test("recovers access through trusted device", () => {
        dna = new DigitalDNA();

        // Primary device
        const primaryDevice = {
            deviceId: "primary-device",
            rhythm: {
                active: [9, 10, 11],
                typing: [80, 85, 82],
                movement: [[100,200], [150,300]]
            }
        };

        // Trusted backup device
        const trustedDevice = {
            deviceId: "trusted-device",
            rhythm: {
                active: [10, 11, 12],
                typing: [75, 78, 80],
                movement: [[120,220], [170,320]]
            }
        };

        // Register primary device
        const identity = dna.registerDevice("test-user", primaryDevice);
        
        // Add trusted device
        dna.addTrustedDevice(identity.chosenName, trustedDevice);

        // Simulate recovery using trusted device
        const recoveryResult = dna.recoverThroughTrustedDevice({
            name: "test-user",
            recoveryDevice: trustedDevice
        });

        expect(recoveryResult.recovered).toBe(true);
        console.log("🛡️ Access recovered through trusted device!");
    });
});