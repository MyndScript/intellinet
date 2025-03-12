// PURE JS: Example patterns for state usage
class QuantumStatePatterns {
    static quantum = new QuantumStateManager();

    static createQuantumState() {
        // Like creating a new "control panel"
        const state = this.quantum.createState('quantum-core');

        // Set initial instrument readings
        state.setState('coherence', 1.0);
        state.setState('resonance', 0.8);

        // Watch for changes like monitoring gauges
        state.watch('coherence', function (oldValue, newValue) {
            if (newValue < 0.5) {
                // Alert: System needs attention
            }
        });

        return state;
    }
}
