export class QuantumRelations {
    connectNodes(sourceNode: any, targetNode: any, relationStrength: number) {
        return {
            type: 'quantum-bridge',
            strength: relationStrength,
            path: this.calculateQuantumPath(sourceNode, targetNode)
        };
    }
}