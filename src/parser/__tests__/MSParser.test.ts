import { MSParser } from '../MSParser';
import { describe, beforeEach, it, expect } from '@jest/globals';

describe('MSParser', () => {
    let parser: MSParser;

    beforeEach(() => {
        parser = new MSParser();
    });

    it('should parse consciousness declaration', () => {
        const source = `
consciousness TestMind {
    quantum_field resonance = 0.8
}`;
        
        const ast = parser.parse(source);
        expect(ast.type).toBe('consciousness');
        expect(ast.children?.[0]?.type).toBe('consciousness');
        expect(ast.children?.[0]?.name).toBe('TestMind');
    });

    it('should parse quantum fields', () => {
        const source = `
consciousness QuantumCore {
    quantum_field resonance = 0.8
    quantum_field coherence = 1.0
}`;

        const ast = parser.parse(source);
        const consciousness = ast.children?.[0];
        expect(consciousness?.children?.[0]).toEqual({
            type: 'quantum_field',
            name: 'resonance',
            value: 0.8
        });
        expect(consciousness?.children?.[1]).toEqual({
            type: 'quantum_field',
            name: 'coherence',
            value: 1.0
        });
    });

    it('should handle empty consciousness', () => {
        const source = 'consciousness EmptyMind {}';
        const ast = parser.parse(source);
        expect(ast.children?.[0]).toEqual({
            type: 'consciousness',
            name: 'EmptyMind',
            children: []
        });
    });
});