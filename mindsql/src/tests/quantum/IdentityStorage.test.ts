import { QuantumIdentitySystem } from '../../core/QuantumIdentity';
import { QuantumStorage } from '../../core/QuantumStorage';
import { describe, test, expect } from '../../quantum/testing';

describe('Brain Storage System', () => {
    let storage: QuantumStorage;
    let identity: QuantumIdentitySystem;

    test('remembers new identities perfectly', async () => {
        storage = new QuantumStorage();
        identity = new QuantumIdentitySystem();

        const newPerson = await identity.createIdentity({
            realName: { first: 'Michael', last: 'Cole' },
            behavioralMarkers: await identity.captureCurrentBehavior()
        });

        const stored = await storage.saveIdentity(newPerson);
        console.log('🧠 New neural pattern saved!');
        expect(stored.coherence).toBe(1.0);
    });

    test('recalls identity by natural patterns', async () => {
        const behavior = await identity.captureCurrentBehavior();
        const found = await storage.findByBehavior(behavior);

        console.log('🎯 Searching neural patterns...');
        expect(found.realName.first).toBe('Michael');
    });

    test('adapts to slight behavior changes', async () => {
        const slightlyDifferentBehavior = await identity.captureCurrentBehavior();
        slightlyDifferentBehavior.typingSpeed *= 0.9; // Slightly slower typing

        const stillRecognized = await storage.findByBehavior(slightlyDifferentBehavior);
        console.log('🔄 Adapting to your current rhythm...');
        expect(stillRecognized).toBeDefined();
    });
});