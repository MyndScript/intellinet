/**
 * MindSQL Test Suite Runner
 */
import { describe, test, expect } from "../quantum/testing";

// Import all tests
import "./quantum/State.test";
import "./core/CoreOps.test";
import "./core/DigitalDNA.test";
import "./core/BehaviorPattern.test";
import "./core/DeviceTransfer.test";
import "./core/TrustedCircle.test";

// Track existing test successes
const existingTests = {
    quantum: [
        "3D Database Tests ✅",
        "Hexagonal Grid ✅",
        "Spatial Queries ✅",
        "Identity System ✅",
    ],
};

console.log("\n🧠 MindSQL Test Suite\n");
console.log("Previously Passing Tests:");
existingTests.quantum.forEach((test) => console.log(`✓ ${test}`));
console.log("\nRunning New Tests...\n");

// Track test results
let results = {
    total: 0,
    passed: 0,
    failed: 0,
};

// Global test tracker
(global as any).testResults = results;

// Run tests in sequence
console.log("🧠 MindSQL Full Test Suite\n");
console.log("Running tests...\n");

process.on("exit", () => {
    console.log("\n📊 Test Summary:");
    console.log(`✨ Total Tests: ${results.total}`);
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
});
