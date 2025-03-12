import { QuantumConfig } from "../quantum/config/QuantumConfig";

console.log("🚀 Initializing MindSQL Quantum System");

const config = QuantumConfig.getInstance();

config.emit("system:startup", { timestamp: Date.now() });

// Register global error handler
process.on("uncaughtException", (error) => {
    config.emit("system:error", error);
    console.error("💥 Quantum Error:", error);
});

// Initialize the project
config.initializeProject();

// Start the runtime
config.injectRuntime();

console.log("✨ MindSQL Quantum System Online");
