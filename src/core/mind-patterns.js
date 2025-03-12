// PURE JS: Core thought patterns
class MindPatterns {
    thoughtFlow = new Map(); // was: stateManager
    memoryTrace = new Map(); // was: history
    synapticPaths = new Set(); // was: watchers

    createHoneypotPath(name) {
        return {
            type: 'synaptic-trap',
            path: `/neural/trap/${name}`,
            timestamp: Date.now(),
            access: new Map(), // Track intruder patterns
        };
    }
}
