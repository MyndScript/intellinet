import { AIEnhancedEventEmitter } from "../events";

/**
 * Digital DNA System
 *
 * Traditional Identity:
 * - Username + Password
 * - Email verification
 * - Security questions
 *
 * MindSQL Identity:
 * - Device heartbeat
 * - Natural behavior
 * - Usage patterns
 *
 * NO:
 * - Passwords
 * - Emails
 * - Async operations
 * - External dependencies
 *
 * YES:
 * - Direct recognition
 * - Event patterns
 * - Natural flow
 */

interface DeviceHeartbeat {
    deviceId: string; // Hardware fingerprint
    rhythm: {
        // Usage patterns
        active: number[]; // Daily active hours
        typing: number[]; // Typing patterns
        movement: number[][]; // Mouse/touch patterns
    };
}

interface BehaviorPattern {
    chosenName: string; // Any name they want
    devices: DeviceHeartbeat[];
    trustedDevices: string[]; // Recovery circle
    behaviorPrint: number[]; // Unique pattern
}

export class DigitalDNA {
    /**
     * Identity Storage
     * Traditional: Database tables
     * MindSQL: In-memory quantum state
     */
    private identities = new Map<string, any>();

    /**
     * Event System
     * Traditional: async/await, promises
     * MindSQL: Direct event emission
     */
    private events = new AIEnhancedEventEmitter();

    /**
     * Recognition System
     * Traditional: await db.findUser(username)
     * MindSQL: events.emit('recognition:starting')
     *
     * Flow:
     * 1. Emit start event
     * 2. Check device heartbeat
     * 3. Match behavior pattern
     * 4. Emit result event
     */
    recognizePresence(input: {
        name: string;
        device: DeviceHeartbeat;
        currentPattern: number[];
    }) {
        this.events.emit("recognition:starting", input.name);

        // Find matching patterns
        const matches = Array.from(this.identities.values()).filter(
            (identity) => identity.chosenName === input.name
        );

        // Check device heartbeat
        const deviceMatch = this.findDeviceMatch(matches, input.device);
        if (deviceMatch) {
            this.events.emit("heartbeat:matched", deviceMatch);
            return deviceMatch;
        }

        // Check behavior patterns
        const behaviorMatch = this.findBehaviorMatch(
            matches,
            input.currentPattern
        );
        if (behaviorMatch) {
            this.events.emit("pattern:matched", behaviorMatch);
            return behaviorMatch;
        }

        // No match found
        this.events.emit("recognition:failed", input);
        return null;
    }

    /**
     * Device Matching
     * Traditional: SELECT * FROM devices WHERE id = ?
     * MindSQL: Direct pattern matching
     */
    private findDeviceMatch(
        matches: BehaviorPattern[],
        device: DeviceHeartbeat
    ) {
        return matches.find((identity) =>
            identity.devices.some((d) => this.compareHeartbeats(d, device))
        );
    }

    /**
     * Heartbeat Comparison
     * Traditional: Compare hashed values
     * MindSQL: Compare rhythm patterns
     */
    private compareHeartbeats(a: DeviceHeartbeat, b: DeviceHeartbeat): boolean {
        return this.compareRhythms(a.rhythm, b.rhythm);
    }

    registerDevice(name: string, device: DeviceHeartbeat) {
        const identity = this.identities.get(name) || {
            chosenName: name,
            devices: [],
            trustedDevices: [],
            behaviorPrint: [],
        };

        identity.devices.push(device);
        this.identities.set(name, identity);
        this.events.emit("device:registered", { name, device });

        return identity;
    }

    private compareRhythms(a: any, b: any): boolean {
        // Compare active hours pattern
        const hourMatch = this.compareArrays(a.active, b.active, 0.8);

        // Compare typing speed pattern
        const typeMatch = this.compareArrays(a.typing, b.typing, 0.9);

        // Compare movement patterns
        const moveMatch = this.compareMovement(a.movement, b.movement);

        return hourMatch && typeMatch && moveMatch;
    }

    private compareArrays(
        a: number[],
        b: number[],
        threshold: number
    ): boolean {
        if (a.length !== b.length) return false;

        const differences = a.map((val, idx) => Math.abs(val - b[idx]) / val);

        const avgDifference =
            differences.reduce((sum, diff) => sum + diff, 0) /
            differences.length;

        return avgDifference <= 1 - threshold;
    }

    private compareMovement(a: number[][], b: number[][]): boolean {
        if (a.length !== b.length) return false;

        return a.every(
            (point, idx) =>
                Math.abs(point[0] - b[idx][0]) < 50 &&
                Math.abs(point[1] - b[idx][1]) < 50
        );
    }

    private updatePatternHistory(identity: BehaviorPattern, newPattern: any) {
        const patternDelta = {
            timestamp: Date.now(),
            changes: {
                activity: this.calculateDrift(
                    identity.devices[0].rhythm.active,
                    newPattern.rhythm.active
                ),
                typing: this.calculateDrift(
                    identity.devices[0].rhythm.typing,
                    newPattern.rhythm.typing
                ),
                movement: this.calculateMovementDrift(
                    identity.devices[0].rhythm.movement,
                    newPattern.rhythm.movement
                ),
            },
        };

        // If pattern evolved naturally, update baseline
        if (this.isNaturalEvolution(patternDelta)) {
            identity.devices[0].rhythm = {
                ...newPattern.rhythm,
                evolutionHistory: patternDelta,
            };

            this.events.emit("pattern:evolved", patternDelta);
        }
    }

    private isNaturalEvolution(delta: any): boolean {
        // Check if changes are within natural drift ranges
        return (
            delta.changes.activity < 0.3 && // Max 30% shift in active hours
            delta.changes.typing < 0.2 && // Max 20% change in typing speed
            delta.changes.movement < 0.25 // Max 25% drift in movement
        );
    }

    addTrustedDevice(name: string, device: DeviceHeartbeat) {
        const identity = this.identities.get(name);
        if (!identity) {
            this.events.emit("trust:failed", { reason: "identity-not-found" });
            return null;
        }

        // Store trusted device
        identity.trustedDevices.push(device.deviceId);
        identity.devices.push({
            ...device,
            isTrusted: true,
        });

        this.events.emit("device:trusted", { name, deviceId: device.deviceId });
        return identity;
    }

    recoverThroughTrustedDevice(input: {
        name: string;
        recoveryDevice: DeviceHeartbeat;
    }) {
        const identity = this.identities.get(input.name);

        if (!identity) {
            this.events.emit("recovery:failed", {
                reason: "identity-not-found",
            });
            return { recovered: false };
        }

        // Check if device is trusted
        const isTrusted = identity.trustedDevices.includes(
            input.recoveryDevice.deviceId
        );

        if (!isTrusted) {
            this.events.emit("recovery:failed", {
                reason: "device-not-trusted",
            });
            return { recovered: false };
        }

        this.events.emit("recovery:successful", {
            name: input.name,
            deviceId: input.recoveryDevice.deviceId,
        });

        return {
            recovered: true,
            identity,
        };
    }

    transferIdentity(input: {
        name: string;
        sourceDevice: DeviceHeartbeat;
        targetDevice: DeviceHeartbeat;
    }) {
        this.events.emit("transfer:starting", input);

        const identity = this.identities.get(input.name);
        if (!identity) {
            this.events.emit("transfer:failed", {
                reason: "identity-not-found",
            });
            return { success: false };
        }

        // Verify source device
        const isSourceValid = identity.devices.some((device) =>
            this.compareHeartbeats(device, input.sourceDevice)
        );

        if (!isSourceValid) {
            this.events.emit("transfer:failed", { reason: "invalid-source" });
            return { success: false };
        }

        // Register new device
        identity.devices.push({
            ...input.targetDevice,
            transferredFrom: input.sourceDevice.deviceId,
            transferDate: Date.now(),
        });

        this.events.emit("transfer:complete", {
            name: input.name,
            newDevice: input.targetDevice.deviceId,
        });

        return {
            success: true,
            identity,
        };
    }

    /**
     * Behavior Pattern Matching
     * Traditional: Compare password hashes
     * MindSQL: Compare behavior patterns
     */
    private findBehaviorMatch(
        matches: BehaviorPattern[],
        currentPattern: number[]
    ): BehaviorPattern | null {
        return (
            matches.find((identity) => {
                const similarity = this.compareArrays(
                    identity.behaviorPrint,
                    currentPattern,
                    0.8 // 80% similarity threshold
                );

                if (similarity) {
                    this.events.emit("behavior:matched", {
                        name: identity.chosenName,
                        similarity: similarity,
                    });
                    return true;
                }
                return false;
            }) || null
        );
    }

    calculateDrift(current: number[], baseline: number[]): number {
        return (
            Math.abs(
                current.reduce((a, b) => a + b, 0) -
                    baseline.reduce((a, b) => a + b, 0)
            ) / current.length
        );
    }

    calculateMovementDrift(current: number[][], baseline: number[][]): number {
        return this.calculateDrift(current.flat(), baseline.flat());
    }
}
