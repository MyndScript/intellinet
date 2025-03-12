export interface NeuralEventDetail {
    type: 'resonance-shift' | 'coherence-change' | 'consciousness-evolution';
    thoughtPattern: unknown;
    brainwave: number; // timestamp
}

export type ConsciousnessEvent = CustomEvent<NeuralEventDetail>;

export const dispatchNeuralEvent = (
    element: HTMLElement,
    detail: NeuralEventDetail
) => {
    const event = new CustomEvent<NeuralEventDetail>('consciousness-shift', {
        detail,
        bubbles: true,
        composed: true,
    });
    element.dispatchEvent(event);
};
