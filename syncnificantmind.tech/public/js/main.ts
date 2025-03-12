import * as THREE from 'three';
import { QuantumRenderer } from './3d/QuantumRenderer';
import { TreeVisualizer } from '../../Mindtree/src/visualization/TreeVisualizer';

async function initQuantumVisualization() {
    const scene = new THREE.Scene();
    const renderer = new QuantumRenderer(scene);
    const visualizer = new TreeVisualizer();

    // Create quantum branch
    await visualizer.addQuantumBranch([
        'quantum_change_1',
        'quantum_change_2'
    ]);

    renderer.setQuantumNodes(visualizer.getQuantumNodes());
    renderer.renderQuantumTree();
}

initQuantumVisualization();