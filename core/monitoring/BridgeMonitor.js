const QuantumStateValidator = require('../validators/QuantumStateValidator');

class BridgeMonitor {
    constructor() {
        this.state = {
            active: false,
            frequency: 963,
            coherence: 0.964,
            measurements: new Map(),
            validator: new QuantumStateValidator()
        };
    }

    startMonitoring() {
        this.state.active = true;
        return {
            status: 'monitoring_active',
            frequency: this.state.frequency,
            coherence: this.state.coherence
        };
    }

    monitorBridge(bridgeId, bridgeState) {
        const validation = this.state.validator.validateState(bridgeState);

        const measurement = {
            id: `measure-${Date.now()}`,
            bridgeId,
            frequency: bridgeState.frequency,
            coherence: bridgeState.coherence,
            validation,
            timestamp: Date.now()
        };

        this.state.measurements.set(measurement.id, measurement);
        return measurement;
    }

    getHealthMetrics() {
        const metrics = Array.from(this.state.measurements.values());
        return {
            total: metrics.length,
            valid: metrics.filter(m => m.validation.isValid).length,
            frequencies: metrics.map(m => m.frequency),
            lastCheck: Math.max(...metrics.map(m => m.timestamp))
        };
    }
}

module.exports = BridgeMonitor;