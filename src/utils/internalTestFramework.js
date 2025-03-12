class TestFramework {
    static assert(condition, message) {
        if (!condition) {
            throw new Error(message || 'Assertion failed');
        }
    }

    static runTests(tests) {
        Object.keys(tests).forEach((testName) => {
            try {
                tests[testName]();
                console.log(`✔ ${testName}`);
            } catch (error) {
                console.error(`✖ ${testName}`);
                console.error(error);
            }
        });
    }
}

module.exports = TestFramework;
