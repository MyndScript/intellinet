import { CoherenceMonitor } from '../monitoring/CoherenceMonitor';

export class CoherenceDashboard {
    private monitor: CoherenceMonitor;
    private updateInterval: number = 1000; // 1 second

    constructor() {
        this.monitor = new CoherenceMonitor();
    }

    startMonitoring(): void {
        setInterval(async () => {
            const coherence = await this.monitor.monitorCoherence();
            this.updateUI(coherence);
        }, this.updateInterval);
    }

    private updateUI(coherence: number): void {
        console.clear();
        console.log('=== Quantum Docker Coherence Monitor ===');
        console.log(`Coherence Level: ${coherence}%`);
        console.log(`Status: ${this.getStatusMessage(coherence)}`);
    }

    private getStatusMessage(coherence: number): string {
        if (coherence >= 98) return '🌟 Optimal Quantum State';
        if (coherence >= 90) return '✨ High Coherence';
        return '⚠️ Coherence Warning';
    }
}