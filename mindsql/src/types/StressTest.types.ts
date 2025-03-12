export interface StressTestConfig {
    duration: number;
    intensity: number;
    patterns: string[];
}

export interface StressTestResult {
    coherence: number;
    patterns: string[];
    timestamp: number;
}

export interface IStressTestVisualizer {
    runComparison(data: StressTestResult): void;
    renderState(data: StressTestResult): void;
}

export class StressTestVisualizer implements IStressTestVisualizer {
    static render(data: StressTestResult): void {
        console.log(`🎯 Rendering stress test data...`);
    }

    runComparison(data: StressTestResult): void {
        console.log(`📊 Comparing stress test results...`);
    }

    renderState(data: StressTestResult): void {
        console.log(`🔄 Rendering current state...`);
    }
}