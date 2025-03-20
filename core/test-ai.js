const SystemAI = require('./ai/system-ai');
const UserAI = require('./ai/user-ai');
const QSTB = require('/var/www/quantum/ollie/core/QSTB');

function testAIConference() {
    console.log('🤖 Testing AI Conference System');
    console.log('-----------------------------');

    const systemAI = new SystemAI();
    const userAI = new UserAI();

    // Test system health monitoring
    const health = systemAI.monitorHealth();
    console.log('\n💫 System Health:');
    console.log('Frequency:', health.frequency);
    console.log('Pattern:', health.data.pattern);

    // Test user interaction
    const interaction = userAI.processInteraction('test_input');
    console.log('\n👤 User Interaction:');
    console.log('Frequency:', interaction.frequency);
    console.log('Pattern:', interaction.data.pattern);
}

testAIConference();