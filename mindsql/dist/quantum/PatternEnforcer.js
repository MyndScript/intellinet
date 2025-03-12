"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuantumPattern = exports.REQUIRED_IMPORTS = exports.FORBIDDEN_PATTERNS = void 0;
exports.FORBIDDEN_PATTERNS = [
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
exports.REQUIRED_IMPORTS = [
    'QuantumState',
    'QSTB',
    'MindSQL',
    'QuantumRegisters',
    'QBit'
];
function validateQuantumPattern(code) {
    // Check for forbidden classical computing patterns
    const hasClassicalPatterns = exports.FORBIDDEN_PATTERNS.some(pattern => code.toLowerCase().includes(pattern.toLowerCase()));
    // Verify quantum computing paradigm compliance
    const hasRequiredQuantumComponents = exports.REQUIRED_IMPORTS.every(pattern => code.includes(pattern));
    // Additional quantum syntax validation
    const hasQuantumSyntax = code.includes('quantum') ||
        code.includes('superposition') ||
        code.includes('entangle');
    return !hasClassicalPatterns &&
        hasRequiredQuantumComponents &&
        hasQuantumSyntax;
}
exports.validateQuantumPattern = validateQuantumPattern;
