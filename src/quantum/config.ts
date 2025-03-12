export interface QuantumConfig {
    port: number;
    mode: 'development' | 'production';
    quantumThreads: number;
}

export const defaultConfig: QuantumConfig = {
    port: 3000,
    mode: 'development',
    quantumThreads: 4
};