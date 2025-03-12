import { registry } from "./TestRegistry";

// Clear any previous output
console.clear();

// Import test suites
import "./quantum/State.test";
import "./core/AICore.test";
import "./core/NeuralCore.test";
import "./core/TrustedCircle.test";
import "./core/DigitalDNA.test";
import "./core/DeviceTransfer.test";
import "./core/BehaviorPattern.test";
import "./core/CoreOps.test";

// Print results on exit
process.on("exit", () => registry.summary());

// Re-export for convenience
export { describe, test, expect } from "../quantum/testing";
export { registry };
