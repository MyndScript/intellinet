import * as THREE from 'three';
import { MindSQL } from '../../../../mindsql/src/core/MindSQL';
import { QuantumState } from '../../../../mindsql/src/quantum/State';
import { QuantumTreeNode } from '../quantum/StateTypes';

export interface CodeChange {
    file: string;
    diff: string;
    impact: number;
}

export interface TreeNode {
    timestamp: Date;
    depth: number;
    changes: CodeChange[];
    children: TreeNode[];
    foundation: boolean;
    weight: number;
}

export class TreeVisualizer {
    private nodes: TreeNode[] = [];
    private mindSQL: MindSQL;
    private quantumNodes: QuantumTreeNode[] = [];

    constructor() {
        this.mindSQL = new MindSQL();
    }

    addDailyBranch(changes: CodeChange[]): void {
        const today = new Date();
        const node: TreeNode = {
            timestamp: today,
            depth: this.calculateDepth(today),
            changes,
            children: [],
            foundation: false,
            weight: 1
        };

        this.nodes.push(node);
        this.recalculateFoundation();
    }

    private calculateDepth(date: Date): number {
        const startDate = new Date('2025-01-01'); // Project start date
        const daysSinceStart = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        return Math.log(daysSinceStart + 1);
    }

    private calculateAge(timestamp: Date): number {
        const now = new Date();
        return Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24));
    }

    private recalculateFoundation(): void {
        this.nodes.forEach(node => {
            const age = this.calculateAge(node.timestamp);
            node.foundation = age > 30;
            node.weight = Math.log(age + 1);
        });
    }

    getNodes(): TreeNode[] {
        return [...this.nodes];
    }

    async addQuantumBranch(changes: string[]): Promise<QuantumTreeNode> {
        const state = await this.mindSQL.createQuantumState();

        // Store changes in quantum state
        changes.forEach(change => {
            state.superposition.add(change);
        });

        const node: QuantumTreeNode = {
            state,
            coherence: state.coherence,
            entanglement: {
                level: state.entanglementLevel,
                connections: state.getConnections()
            },
            temporal: {
                timestamp: new Date(),
                foundation: false
            }
        };

        this.quantumNodes.push(node);
        await this.recalculateQuantumFoundation();

        return node;
    }

    private async recalculateQuantumFoundation(): Promise<void> {
        const results = await this.mindSQL.queryStates(`
            SELECT state 
            FROM quantum_nodes 
            WHERE age > 30 
            ORDER BY coherence DESC
        `);

        this.quantumNodes.forEach(node => {
            if (results.includes(node.state.id)) {
                node.temporal.foundation = true;
                node.state.stabilize();
            }
        });
    }

    getQuantumNodes(): QuantumTreeNode[] {
        return this.quantumNodes;
    }
}