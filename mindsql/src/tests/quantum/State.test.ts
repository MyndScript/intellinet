/**
 * @file State.test.ts
 * @description MindSQL 3D Database Tests
 */

import { QuantumState } from "../../quantum/State";
import { AIEnhancedEventEmitter } from "../../core/events";
import { describe, test, expect } from "../../quantum/testing";
import { CoreOperations } from "../../core/operations/CoreOps";
import { DigitalDNA } from "../../core/identity/DigitalDNA";

// Main test suite
describe("🧠 MindSQL Core Systems", () => {
    let state: QuantumState;
    let ops: CoreOperations;
    let dna: DigitalDNA;
    let events: AIEnhancedEventEmitter; // Added events declaration

    // Original State tests
    test("creates new data nodes", (done) => {
        state = new QuantumState();
        events = new AIEnhancedEventEmitter();

        events.on("node:created", (node) => {
            expect(node.coherence).toBe(1.0);
            console.log("✨ New data node materialized in 3D space!");
            done();
        });

        state.createNode({
            data: { name: "Test Data" },
            position: { x: 0, y: 0, z: 0 },
        });
    });

    test("establishes hexagonal connections", () => {
        state = new QuantumState();

        const sourceNode = state.createNode({
            id: "source-1",
            data: { type: "test" },
            position: { x: 0, y: 0, z: 0 },
        });

        const targetNode = state.createNode({
            id: "target-1",
            data: { type: "test" },
            position: { x: 1, y: 0, z: 0 },
        });

        // Connect nodes with default hexagonal type
        const connection = state.connect(sourceNode, targetNode);

        expect(connection.type).toBe("hexagonal");
        console.log("🔮 3D hexagonal connection formed!");
    });

    test("maintains spatial grid structure", () => {
        state = new QuantumState();

        const grid = state.createHexagonalGrid({
            dimensions: { x: 3, y: 3, z: 3 },
            spacing: 1.0,
        });

        expect(grid.integrity).toBe(1.0);
        expect(grid.nodes.length).toBe(27); // 3x3x3
        console.log("🌐 3D hexagonal grid stabilized!");
    });

    test("performs spatial queries", () => {
        state = new QuantumState();

        // Create and store test nodes with IDs
        const node1 = state.createNode({
            id: "test-1",
            data: { type: "user", name: "Test User 1" },
            position: { x: 1, y: 0, z: 0 },
        });

        const node2 = state.createNode({
            id: "test-2",
            data: { type: "user", name: "Test User 2" },
            position: { x: -1, y: 0, z: 0 },
        });

        // Make both nodes active with connections
        state.connect(node1, node2, {
            type: "hexagonal",
            position: { x: 0, y: 0, z: 0 },
            visualProperties: {
                particleEffect: "energy-flow",
                color: "#7fff00",
            },
        });

        // Search within radius that should contain both nodes
        const result = state.findInSpace({
            center: { x: 0, y: 0, z: 0 },
            radius: 2.0,
            filters: {
                dataType: "user",
                connections: "active",
            },
        });

        // Verify we found both nodes
        expect(result.nodes.length).toBe(2);
        console.log(`🎯 Found ${result.nodes.length} nodes in quantum space!`);
    });

    // Core Operations tests
    test("performs basic CRUD operations", () => {
        ops = new CoreOperations();
        const entity = ops.create({ name: "Test Entity" });
        expect(entity.data.name).toBe("Test Entity");
        // ...rest of CRUD test...
    });

    // Digital DNA tests
    test("recognizes user patterns", () => {
        dna = new DigitalDNA();
        const testDevice = {
            deviceId: "test-device-1",
            rhythm: {
                active: [9, 10, 11],
                typing: [80, 85, 82],
                movement: [
                    [100, 200],
                    [150, 300],
                ],
            },
        };

        const result = dna.recognizePresence({
            name: "test-user",
            device: testDevice,
            currentPattern: [80, 85, 82],
        });

        expect(result).toBeDefined();
        console.log("✨ User pattern recognized!");
    });
});

describe("🧠 MindSQL Identity System", () => {
    let state: QuantumState;

    test("creates new identity", () => {
        state = new QuantumState();

        const identity = state.createIdentity({
            realName: { first: "Test", last: "User" },
            behavioralMarkers: {
                typingPattern: [120, 80, 160],
                focusAreas: ["quantum", "design"],
                deviceFingerprint: "test-device",
            },
        });

        expect(identity.quid).toBeDefined();
        console.log("✨ New quantum identity materialized!");
    });
});
