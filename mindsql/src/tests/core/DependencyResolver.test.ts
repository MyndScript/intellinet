import { describe, test, expect } from "../../quantum/testing";
import { DependencyResolver } from "../../core/dependencies/DependencyResolver";
import { QuantumEventSystem } from "../../core/events/QuantumEventSystem";

describe("DependencyResolver", () => {
    let resolver: DependencyResolver;
    let events: QuantumEventSystem;

    test("setup", () => {
        events = QuantumEventSystem.getInstance();
        resolver = new DependencyResolver();
    });

    test("emits events when resolving dependencies", () => {
        return new Promise<void>((resolve) => {
            events.once("dependency:resolved", (data) => {
                resolve();
            });
            resolver.resolveDependency("test-module");
        });
    });

    test("resolves custom dependencies first", () => {
        const dependencyName = "quantum-state";
        const resolvedPath = resolver.resolveDependency(dependencyName);
        expect(resolvedPath).toContain("/var/www/mindsql/src/quantum");
    });

    test("handles missing dependencies gracefully", () => {
        expect(() => {
            resolver.resolveDependency("non-existent-module");
        }).not.toThrow();
    });

    test("emits events in correct order", () => {
        const eventOrder: string[] = [];

        events.on("dependency:requested", () => eventOrder.push("requested"));
        events.on("dependency:searching", () => eventOrder.push("searching"));
        events.on("dependency:found", () => eventOrder.push("found"));
        events.on("dependency:loaded", () => {
            eventOrder.push("loaded");
            expect(eventOrder).toBe([
                "requested",
                "searching",
                "found",
                "loaded",
            ]);
        });

        resolver.resolveDependency("quantum-state");
    });

    test("handles missing dependencies through events", () => {
        events.once("dependency:load:failed", (data) => {
            expect(data.name).toBe("non-existent-module");
        });

        resolver.resolveDependency("non-existent-module");
    });
});
