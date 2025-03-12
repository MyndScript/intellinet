/**
 * MindSQL Quantum System Bootstrap
 *
 * Traditional systems use:
 * - Async/await initialization
 * - Sequential startup
 * - Direct error handling
 *
 * We use:
 * - Event-driven architecture
 * - Quantum state initialization
 * - Propagated error handling
 */
import { QuantumConfig } from "./quantum/config/QuantumConfig.js";

console.log("🚀 Initializing MindSQL Quantum System");

const config = QuantumConfig.getInstance();

// System initialization chain
config.emit("system:startup", { timestamp: Date.now() });

// Global quantum error handling
process.on("uncaughtException", (error) => {
    config.emit("system:error", error);
    console.error("💥 Quantum Error:", error);
});

// Event-driven project initialization
config.on("project:initialized", () => {
    config.emit("runtime:initialize");
});

config.on("runtime:injected", () => {
    console.log("✨ MindSQL Quantum System Online");
});

// Start the initialization chain
config.initializeProject();
