import { writeFileSync, mkdirSync, existsSync } from "fs";

export class TestRegistry {
    private suites = new Map<string, Set<string>>();
    private results = new Map<string, boolean>();
    private logs = new Map<string, string[]>();
    private debugMode = false;

    registerSuite(name: string) {
        if (!this.suites.has(name)) {
            this.suites.set(name, new Set());
            if (this.debugMode) {
                console.debug(`📋 Suite registered: ${name}`);
            }
        }
    }

    trackTest(
        suite: string,
        testName: string,
        passed: boolean,
        logs: string[] = []
    ) {
        const suiteTests = this.suites.get(suite) ?? new Set();
        const fullTestName = `${suite}::${testName}`;

        suiteTests.add(testName);
        this.suites.set(suite, suiteTests);
        this.results.set(fullTestName, passed);

        if (this.debugMode) {
            console.debug(
                `📝 Test tracked: ${fullTestName} (${passed ? "✅" : "❌"})`
            );
        }

        // Store logs
        this.logs.set(`${suite}::${testName}`, logs);
    }

    summary() {
        const stats = this.calculateStats();

        // Clear console first
        console.clear();

        this.printCondensedSummary(stats);

        if (stats.failed > 0) {
            this.printFailedTests();
        }

        // Only save logs if there are failures
        if (stats.failed > 0) {
            this.saveDetailedLogs();
        }
    }

    private calculateStats() {
        let total = 0;
        let passed = 0;

        this.suites.forEach((tests, suite) => {
            tests.forEach((test) => {
                total++;
                if (this.results.get(`${suite}::${test}`)) passed++;
            });
        });

        return { total, passed, failed: total - passed };
    }

    private printResults(stats: {
        total: number;
        passed: number;
        failed: number;
    }) {
        console.log("\n📊 MindSQL Test Results");
        console.log("====================");
        console.log(`✨ Total Tests: ${stats.total}`);
        console.log(`✅ Passed: ${stats.passed}`);
        console.log(`❌ Failed: ${stats.failed}`);

        this.suites.forEach((tests, suite) => {
            console.log(`\n🧪 ${suite}`);
            tests.forEach((test) => {
                const passed = this.results.get(`${suite}::${test}`);
                console.log(`  ${passed ? "✓" : "✗"} ${test}`);
            });
        });
    }

    private printCondensedSummary(stats: {
        total: number;
        passed: number;
        failed: number;
    }) {
        console.log("\n🧠 MindSQL Test Summary");
        console.log("====================");
        console.log(`✨ Total:  ${stats.total}`);
        console.log(`✅ Passed: ${stats.passed}`);
        console.log(`❌ Failed: ${stats.failed}`);
        console.log("====================\n");
    }

    private printFailedTests() {
        console.log("\n❌ Failed Tests:");
        this.suites.forEach((tests, suite) => {
            const failedTests = Array.from(tests).filter(
                (test) => !this.results.get(`${suite}::${test}`)
            );
            if (failedTests.length > 0) {
                console.log(`\n🧪 ${suite}`);
                failedTests.forEach((test) => {
                    console.log(`  ✗ ${test}`);
                    // Show logs for failed tests
                    const logs = this.logs.get(`${suite}::${test}`);
                    if (logs?.length) {
                        console.log(`    ${logs.join("\n    ")}`);
                    }
                });
            }
        });
    }

    private saveDetailedLogs() {
        const logPath = "/var/www/mindsql/logs";
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

        if (!existsSync(logPath)) {
            mkdirSync(logPath, { recursive: true });
        }

        const detailedLogs = Array.from(this.suites.entries()).map(
            ([suite, tests]) => ({
                suite,
                results: Array.from(tests).map((test) => ({
                    test,
                    passed: this.results.get(`${suite}::${test}`),
                    logs: this.logs.get(`${suite}::${test}`),
                })),
            })
        );

        writeFileSync(
            `${logPath}/test-run-${timestamp}.json`,
            JSON.stringify(detailedLogs, null, 2)
        );
    }
}

// Create single instance
export const registry = new TestRegistry();
