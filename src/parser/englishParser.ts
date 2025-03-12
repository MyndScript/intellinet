interface QuantumInstruction {
    type: 'quantum_instruction';
    value: string;
}

export class EnglishParser {
    static parseToQuantumState(text: string): QuantumInstruction {
        const tokens = text.split(' ');
        return {
            type: 'quantum_instruction',
            value: tokens.join('_'),
        };
    }
}

export default EnglishParser;
