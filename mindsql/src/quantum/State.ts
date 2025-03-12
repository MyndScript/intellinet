/**
 * @file State.ts
 * @description Core MindSQL database state management
 *
 * Traditional databases use:
 * - Async/await for transactions
 * - Promises for data operations
 * - Callbacks for completion handling
 *
 * MindSQL uses:
 * - Direct state manipulation
 * - Event emission for state changes
 * - Synchronous operations with event feedback
 */

import { EventEmitter } from "events";
import { AIEnhancedEventEmitter } from "@core/events";
import { QuantumEventSystem } from "../core/events/QuantumEventSystem";
import type { NodeData } from "@quantum/testing";

/**
 * Traditional: SQL tables in rows and columns
 * MindSQL: 3D hexagonal grid structure
 */
interface Vector3D {
    x: number;
    y: number;
    z: number;
}

interface GridOptions {
    dimensions: Vector3D;
    spacing: number;
}

export interface QuantumProperties {
    coherence: number;
    entanglement: number;
    phase: number;
}

export class QuantumState extends EventEmitter {
    private nodes: Map<string, any> = new Map();
    private connections: Map<string, Set<string>> = new Map();
    private events: EventEmitter;
    private identities: Map<string, any> = new Map();
    private space: any = {
        dimensions: 3,
        nodes: new Map(),
        connections: new Set(),
        currentCoordinates: { x: 0, y: 0, z: 0 },
    };
    private properties: QuantumProperties;
    private state = new Map<string, NodeData>();
    private grid: {
        dimensions?: Vector3D;
        spacing?: number;
        nodes?: any[];
        integrity?: number;
    } & Map<string, any> = new Map();

    constructor() {
        super();
        this.events = this;
        this.properties = {
            coherence: 1.0,
            entanglement: 0.8,
            phase: Math.random() * Math.PI * 2,
        };
    }

    emit(event: string, data: any): boolean {
        return super.emit(event, data);
    }

    createNode(node: NodeData): void {
        const id = node.id || `node-${Date.now()}`;
        const newNode: NodeData = {
            id,
            data: node.data,
            position: node.position,
        };

        this.state.set(id, newNode);
        this.emit("node:created", newNode);
    }

    /**
     * Connect nodes in quantum space
     * No async handshakes - direct connection
     */
    connect(sourceNode: any, targetNode: any, options: any = {}) {
        const connectionOptions = {
            type: "hexagonal",
            position: { x: 0, y: 0, z: 0 },
            visualProperties: {
                particleEffect: "energy-flow",
                color: "#7fff00",
            },
            ...options,
        };

        // Track both directions of connection
        this.trackConnection(sourceNode.id, targetNode.id);
        this.trackConnection(targetNode.id, sourceNode.id);

        const connection = {
            type: connectionOptions.type,
            source: sourceNode,
            target: targetNode,
            position: connectionOptions.position,
            visualProperties: connectionOptions.visualProperties,
        };

        this.events.emit("connection:created", connection);
        return connection;
    }

    private trackConnection(sourceId: string, targetId: string) {
        if (!this.connections.has(sourceId)) {
            this.connections.set(sourceId, new Set());
        }
        // Add null check
        this.connections.get(sourceId)?.add(targetId);
    }

    /**
     * Create 3D hexagonal grid structure
     *
     * Traditional:
     * Tables -> Rows -> Columns
     *
     * MindSQL:
     * Space -> Hexagons -> Nodes
     */
    createHexagonalGrid(options: GridOptions) {
        // Calculate grid positions
        const nodes = [];
        for (let x = 0; x < options.dimensions.x; x++) {
            for (let y = 0; y < options.dimensions.y; y++) {
                for (let z = 0; z < options.dimensions.z; z++) {
                    // Create node at grid position
                    const node = this.createNode({
                        data: { type: "grid-node" },
                        position: {
                            x: x * options.spacing,
                            y: y * options.spacing,
                            z: z * options.spacing,
                        },
                    });
                    nodes.push(node);
                }
            }
        }

        // Create a new map with additional properties
        const gridMap = new Map<string, any>();
        Object.assign(gridMap, {
            dimensions: options.dimensions,
            spacing: options.spacing,
            nodes: nodes,
            integrity: 1.0,
        });
        this.grid = gridMap;

        // Notify system of grid creation
        this.events.emit("grid:created", this.grid);

        return this.grid;
    }

    /**
     * Traditional:
     * SELECT * FROM nodes WHERE location BETWEEN x AND y
     *
     * MindSQL:
     * Direct spatial search in quantum grid
     */
    findInSpace({ center, radius, filters }: any) {
        // Debug output
        console.log("📍 Searching in space:", { center, radius, filters });
        console.log("🗺️ Total nodes:", this.nodes.size);
        console.log("🔗 Total connections:", this.connections.size);

        const foundNodes = Array.from(this.nodes.values()).filter((node) => {
            // Distance check
            const distance = Math.sqrt(
                Math.pow(node.position.x - center.x, 2) +
                    Math.pow(node.position.y - center.y, 2) +
                    Math.pow(node.position.z - center.z, 2)
            );

            console.log(`📊 Node ${node.id} distance: ${distance}`);
            console.log(`📊 Node ${node.id} type: ${node.data.type}`);
            console.log(
                `📊 Node ${node.id} connections: ${this.connections.has(
                    node.id
                )}`
            );

            if (distance > radius) return false;
            if (filters.dataType && node.data.type !== filters.dataType)
                return false;
            if (filters.connections === "active") {
                return this.connections.has(node.id);
            }
            return true;
        });

        console.log("🎯 Found nodes:", foundNodes.length);
        this.events.emit("space:searched", { foundCount: foundNodes.length });
        return { nodes: foundNodes };
    }

    /**
     * Create quantum identity
     * Traditional: INSERT INTO users (username, password)
     * MindSQL: Direct identity materialization in quantum space
     */
    createIdentity(data: {
        realName: { first: string; last: string };
        behavioralMarkers: any;
    }) {
        const quid = this.generateQUID(data);

        const identity = {
            quid,
            ...data,
            position: { x: 0, y: 0, z: 0 },
            connections: new Set(),
            created: Date.now(),
        };

        // Store in quantum space
        this.identities.set(quid, identity);

        // Create node representation
        this.createNode({
            id: quid,
            data: { type: "identity", ...data },
            position: { x: 0, y: 0, z: 0 },
        });

        this.events.emit("identity:created", identity);
        return identity;
    }

    private generateQUID(data: any): string {
        const timestamp = Date.now();
        const uniquePattern = `${data.realName.first}-${data.realName.last}-${timestamp}`;
        return `QD-${uniquePattern}`;
    }

    getCurrentSpace() {
        return {
            dimensions: this.space.dimensions,
            nodes: Array.from(this.space.nodes.values()),
            connections: Array.from(this.space.connections),
            coordinates: this.space.currentCoordinates,
        };
    }

    observe(): QuantumProperties {
        return { ...this.properties };
    }

    setState(key: string, value: any): void {
        this.state.set(key, value);
        this.events.emit("state:changed", {
            key,
            value,
            timestamp: Date.now(),
        });
    }

    getState(key: string): any {
        return this.state.get(key);
    }

    observeState(pattern: string): void {
        this.events.on("state:changed", (data) => {
            if (data?.key?.match(pattern)) {
                this.events.emit("pattern:matched", data);
            }
        });
    }

    // Grid methods
    setGridValue(position: { x: number; y: number }, value: any): void {
        const key = `${position.x},${position.y}`;
        this.grid.set(key, value);
        this.events.emit("grid:changed", {
            position,
            value,
            timestamp: Date.now(),
        });
    }

    getGridValue(position: { x: number; y: number }): any {
        const key = `${position.x},${position.y}`;
        return this.grid.get(key);
    }

    // State updates with type safety
    updateState(data: { id: string; data: any; position?: any }): void {
        if (data.position) {
            this.setGridValue(data.position, data.data);
        } else {
            this.setState(data.id, data.data);
        }
    }

    private generatePattern(value: any): string {
        return Buffer.from(JSON.stringify(value))
            .toString("base64")
            .slice(0, 32);
    }
}
