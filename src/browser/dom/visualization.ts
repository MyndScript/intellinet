export class ConsciousnessVisualizer {
    private neuralCanvas: HTMLCanvasElement;
    private thoughtSpace: CanvasRenderingContext2D;

    constructor(elementId: string) {
        const canvas = document.getElementById(elementId);
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error('Invalid canvas element');
        }
        this.neuralCanvas = canvas;
        const context = this.neuralCanvas.getContext('2d');
        if (!context) {
            throw new Error('Could not get 2D context');
        }
        this.thoughtSpace = context;
    }

    visualizeResonance(brainwaveStrength: number): void {
        const centerNode = this.neuralCanvas.width / 2;
        const synapticCore = this.neuralCanvas.height / 2;

        this.thoughtSpace.beginPath();
        this.thoughtSpace.arc(
            centerNode,
            synapticCore,
            brainwaveStrength * 50,
            0,
            Math.PI * 2
        );
        this.thoughtSpace.stroke();
    }

    visualizeNeuralField(fieldStrength: number, frequency: number): void {
        const amplitude = fieldStrength * 50;
        const period = 1 / frequency;

        this.thoughtSpace.beginPath();
        for (let x = 0; x < this.neuralCanvas.width; x++) {
            const y = Math.sin(x * period) * amplitude +
                this.neuralCanvas.height / 2;
            x === 0
                ? this.thoughtSpace.moveTo(x, y)
                : this.thoughtSpace.lineTo(x, y);
        }
        this.thoughtSpace.stroke();
    }
}

export default ConsciousnessVisualizer;
