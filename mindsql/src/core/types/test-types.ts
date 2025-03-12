/**
 * @file test-types.ts
 * @description Test type definitions
 */

export interface TestTypes {
    coherenceLevel: number;
    stateVector: string[];
    timestamp: Date;
    results?: Array<{
        name: string;
        status: 'pass' | 'fail';
        metrics: {
            duration: number;
            memory: number;
        }
    }>;
}