const assert = require('assert');
const { SELStorage } = require('../SELStorage');

describe('SEL Storage Tests', () => {
  const storage = new SELStorage({
    frequency: 528,
    lightPatternEnabled: true
  });

  it('should store quantum states', async () => {
    const stored = await storage.storeQuantumState({
      frequency: 528,
      data: 'test'
    });
    assert.equal(stored, true);
  });
});