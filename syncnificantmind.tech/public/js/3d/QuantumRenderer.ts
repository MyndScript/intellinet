import * as THREE from 'three';
import { QuantumTreeNode } from '../../../Mindtree/src/quantum/StateTypes';

export class QuantumRenderer {
    private scene: THREE.Scene;
    private quantumNodes: QuantumTreeNode[] = [];

    constructor(scene: THREE.Scene) {
        this.scene = scene;
    }

    renderQuantumTree(): void {
        this.quantumNodes.forEach(node => {
            const geometry = this.createQuantumGeometry(node);
            const material = this.createQuantumMaterial(node);
            
            const mesh = new THREE.Mesh(geometry, material);
            this.positionQuantumNode(mesh, node);
            this.scene.add(mesh);
        });
    }

    private createQuantumGeometry(node: QuantumTreeNode): THREE.BufferGeometry {
        const coherenceLevel = node.coherence;
        const radius = node.temporal.foundation ? 0.5 * coherenceLevel : 0.2 * coherenceLevel;
        return new THREE.CylinderGeometry(radius, radius, 2, 32);
    }

    private createQuantumMaterial(node: QuantumTreeNode): THREE.MeshPhongMaterial {
        return new THREE.MeshPhongMaterial({
            color: this.getQuantumColor(node),
            opacity: node.state.coherence,
            transparent: true
        });
    }

    private getQuantumColor(node: QuantumTreeNode): number {
        const coherence = node.coherence;
        const foundation = node.temporal.foundation;
        
        if (foundation) {
            return 0x4a3728 + (coherence * 0x001100);
        }
        return 0x7aa21d + (coherence * 0x000011);
    }

    setQuantumNodes(nodes: QuantumTreeNode[]): void {
        this.quantumNodes = nodes;
    }
}