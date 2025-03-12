import * as assert from 'assert';
import { describe, beforeAll, it } from '@jest/globals';

describe('Extension Test Suite', () => {
    beforeAll(() => {
        // Setup code
    });

    it('Sample test', () => {
        assert.strictEqual(-1, [1, 2, 3].indexOf(5));
        assert.strictEqual(-1, [1, 2, 3].indexOf(0));
    });
});
