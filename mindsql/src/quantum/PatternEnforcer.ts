import { QSTB } from '../quantum/QSTB';

export const FORBIDDEN_PATTERNS = [
    'async',
    'Promise',
    'setTimeout',
    'await',
    'callback',
    'then',
    'catch',
    'finally',
    'setInterval'
];

export const REQUIRED_IMPORTS = [
    'QuantumState',
    'QSTB',
    'MindSQL',
    'QuantumRegisters',
    'QBit'
];

export function validateQuantumPattern(code: string): boolean {
    // Check for forbidden classical computing patterns
    const hasClassicalPatterns = FORBIDDEN_PATTERNS.some(pattern => 
        code.toLowerCase().includes(pattern.toLowerCase())
    );

    // Verify quantum computing paradigm compliance
    const hasRequiredQuantumComponents = REQUIRED_IMPORTS.every(pattern =>
        code.includes(pattern)
    );

    // Additional quantum syntax validation
    const hasQuantumSyntax = code.includes('quantum') || 
                            code.includes('superposition') ||
                            code.includes('entangle');

    return !hasClassicalPatterns && 
           hasRequiredQuantumComponents && 
           hasQuantumSyntax;
}