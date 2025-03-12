import { TestRunner } from '../testUtils';

describe('QuantumButton Component', () => {
    it('should handle click events correctly', async () => {
        const button = await TestRunner.runTest('src/test/components/quantum-button.ms');
        expect(button.fields.get('clicked')).toBe(0);
        
        // Simulate click
        await button.processEvent('click');
        expect(button.fields.get('clicked')).toBe(1);
    });
});