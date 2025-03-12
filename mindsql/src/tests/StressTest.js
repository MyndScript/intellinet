"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StressTestVisualizer = void 0;
const MindSQL_1 = require("../core/MindSQL");
const TraditionalDB_1 = require("./mocks/TraditionalDB");
class StressTestVisualizer {
    constructor() {
        this.results = [];
        this.mindSQL = new MindSQL_1.MindSQL();
        this.traditionalDB = new TraditionalDB_1.TraditionalDB();
    }
    async runComparison(patternCount) {
        try {
            // Traditional approach timing
            const traditionalStart = performance.now();
            await this.traditionalDB.connect();
            await this.traditionalDB.query('SELECT * FROM patterns LIMIT ' + patternCount);
            const traditionalTime = performance.now() - traditionalStart;
            // MindSQL quantum approach timing
            const quantumStart = performance.now();
            const patterns = this.mindSQL.retrieveThought(['test-pattern']);
            const quantumTime = performance.now() - quantumStart;
            const result = {
                operation: `Pattern Retrieval (${patternCount} items)`,
                traditionalTime,
                quantumTime,
                coherenceLevel: this.mindSQL.getQuantumState().getCoherence(),
                patternCount
            };
            this.results.push(result);
            return result;
        }
        catch (error) {
            console.error('Stress test failed:', error);
            throw error;
        }
    }
    getResults() {
        return [...this.results];
    }
}
exports.StressTestVisualizer = StressTestVisualizer;
