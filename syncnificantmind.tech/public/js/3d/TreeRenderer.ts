import * as THREE from 'three';
import { TreeNode } from '../../../Mindtree/src/visualization/TreeVisualizer';

export class TreeRenderer {
    private scene: THREE.Scene;
    private nodes: TreeNode[];

    constructor(scene: THREE.Scene) {
        this.scene = scene;
        this.nodes = [];
    }

    renderTree(): void {
        this.nodes.forEach(node => {
            const geometry = this.createNodeGeometry(node);
            const material = this.createMaterial(node);
            
            if (node.foundation) {
                material.color = new THREE.Color(0x4a3728);
                geometry.scale(1.5, 1, 1.5);
            }
            
            const mesh = new THREE.Mesh(geometry, material);
            this.positionNode(mesh, node);
            this.scene.add(mesh);
        });
    }

    private createNodeGeometry(node: TreeNode): THREE.BufferGeometry {
        const height = 2;
        const radius = node.foundation ? 0.5 : 0.2;
        return new THREE.CylinderGeometry(radius, radius, height, 32);
    }

    private createMaterial(node: TreeNode): THREE.MeshPhongMaterial {
        const material = new THREE.MeshPhongMaterial({
            color: node.foundation ? 0x4a3728 : 0x7aa21d,
            opacity: node.weight / 10,
            transparent: true
        });
        return material;
    }

    private positionNode(mesh: THREE.Mesh, node: TreeNode): void {
        mesh.position.y = node.depth * 10;
        mesh.position.x = Math.sin(node.timestamp.getTime()) * 5;
        mesh.position.z = Math.cos(node.timestamp.getTime()) * 5;
    }

    setNodes(nodes: TreeNode[]): void {
        this.nodes = nodes;
    }
}