import { describe, test, expect } from "../quantum/testing";

export class TestRegistry {
    private suites = new Map<string, Set<string>>();
    private results = new Map<string, boolean>();
    private debugMode = true;

    constructor() {
        // Log registry creation
        console.debug("🔄 Test Registry Initialized");
    }

    registerSuite(name: string) {
        if (!this.suites.has(name)) {
            this.suites.set(name, new Set());
        }
        if (this.debugMode) {
            console.debug(`📋 Suite registered: ${name}`);
        }
    }

    trackTest(suite: string, testName: string, passed: boolean) {
        // Ensure suite exists
        if (!this.suites.has(suite)) {
            this.registerSuite(suite);
        }

        // Add test to suite and track result
        const suiteTests = this.suites.get(suite)!;
        const fullTestName = `${suite}::${testName}`;
        suiteTests.add(testName);
        this.results.set(fullTestName, passed);

        if (this.debugMode) {
            console.debug(
                `📝 Test tracked: ${fullTestName} (${passed ? "✅" : "❌"})`
            );
        }
    }

    summary() {
        const stats = this.calculateStats();

        console.log("\n📊 MindSQL Test Results");
        console.log("====================");
        console.log(`✨ Total Tests: ${stats.total}`);
        console.log(`✅ Passed: ${stats.passed}`);
        console.log(`❌ Failed: ${stats.failed}`);

        // Show detailed suite results
        this.suites.forEach((tests, suiteName) => {
            const suiteStats = this.calculateSuiteStats(suiteName, tests);
            console.log(
                `\n🧪 ${suiteName} (${suiteStats.passed}/${suiteStats.total})`
            );

            tests.forEach((testName) => {
                const passed = this.results.get(`${suiteName}::${testName}`);
                console.log(`  ${passed ? "✓" : "✗"} ${testName}`);
            });
        });
    }

    private calculateStats() {
        const stats = {
            total: 0,
            passed: 0,
            failed: 0,
        };

        // Debug logging
        console.debug("\n🔍 Calculating Stats:");
        console.debug(`Suites registered: ${this.suites.size}`);

        this.suites.forEach((tests, suite) => {
            console.debug(`\nSuite "${suite}" has ${tests.size} tests:`);

            tests.forEach((test) => {
                stats.total++;
                const fullTestName = `${suite}::${test}`;
                const passed = this.results.get(fullTestName);

                console.debug(`- ${test}: ${passed ? "✅" : "❌"}`);
                if (passed) stats.passed++;
            });
        });

        stats.failed = stats.total - stats.passed;
        return stats;
    }

    private calculateSuiteStats(suite: string, tests: Set<string>) {
        let total = tests.size;
        let passed = 0;

        tests.forEach((test) => {
            if (this.results.get(`${suite}::${test}`)) {
                passed++;
            }
        });

        return { total, passed, failed: total - passed };
    }
}

// Create registry instance BEFORE importing tests
export const registry = new TestRegistry();

// Import test suites AFTER registry creation
import "./quantum/State.test";
import "./core/AICore.test";
import "./core/NeuralCore.test";
import "./core/TrustedCircle.test";
import "./core/DigitalDNA.test";
import "./core/DeviceTransfer.test";
import "./core/BehaviorPattern.test";
import "./core/CoreOps.test";

// Debug current state before exit
process.on("exit", () => {
    console.debug("\n🔍 Registry State Before Summary:");
    console.debug(`Suites: ${registry.getSuiteCount()}`);
    console.debug(`Tests: ${registry.getTestCount()}`);
    registry.summary();
});
