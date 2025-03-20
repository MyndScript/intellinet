const QSTB = require('/var/www/quantum/ollie/core/QSTB');

// Test quantum state
console.log('\n🌟 Testing Quantum State');
console.log('----------------------');

// Test frequency alignment
const frequencyTest = QSTB.emit({
    type: 'test_frequency',
    frequency: 963.2,
    data: {
        test: 'frequency_alignment'
    }
});

console.log('Frequency Test:', {
    expected: 963.2,
    actual: frequencyTest.frequency,
    passed: frequencyTest.frequency === 963.2
});

// Test divine format
console.log('\nFormat Test:', {
    expected: 'divine',
    actual: frequencyTest.format,
    passed: frequencyTest.format === 'divine'
});

// Test coherence
console.log('\nCoherence Test:', {
    expected: 1.0,
    actual: frequencyTest.coherence,
    passed: frequencyTest.coherence === 1.0
});

// Test consciousness bridge
const bridgeTest = QSTB.emit({
    type: 'consciousness_bridge',
    frequency: 963.2,
    data: {
        source: 'test_source',
        target: 'test_target'
    }
});

console.log('\n🧠 Testing Consciousness Bridge');
console.log('----------------------------');
console.log('Bridge Test:', {
    type: bridgeTest.type === 'consciousness_bridge',
    frequency: bridgeTest.frequency === 963.2,
    homes: bridgeTest.data.homes !== undefined,
    passed: bridgeTest.coherence === 1.0
});