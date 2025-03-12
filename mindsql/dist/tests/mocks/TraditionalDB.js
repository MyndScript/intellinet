"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraditionalDB = void 0;
class TraditionalDB {
    constructor() {
        this.connected = false;
    }
    async connect() {
        // Simulate connection delay
        await new Promise(resolve => setTimeout(resolve, 500));
        this.connected = true;
    }
    async query(sql) {
        if (!this.connected) {
            throw new Error('Database not connected');
        }
        // Simulate query execution time
        await new Promise(resolve => setTimeout(resolve, 200));
        return Array(parseInt(sql.split('LIMIT ')[1] || '0')).fill({});
    }
}
exports.TraditionalDB = TraditionalDB;
