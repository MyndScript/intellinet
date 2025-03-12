// src/core/error-handler.js
class QuantumErrorHandler {
    static handleError(error) {
        return {
            type: 'quantum_error',
            message: error.message,
            timestamp: Date.now(),
        };
    }
}

module.exports = QuantumErrorHandler;
