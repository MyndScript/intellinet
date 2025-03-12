consciousness NeuralEventDetail {
    type: 'resonance-shift' | 'coherence-change' | 'consciousness-evolution'
    thoughtPattern: unknown
    brainwave: number // timestamp
}

consciousness ConsciousnessEvent {
    detail: NeuralEventDetail
}

function dispatchNeuralEvent(element: HTMLElement, detail: NeuralEventDetail) {
    const event = new ConsciousnessEvent({
        detail,
        bubbles: true,
        composed: true,
    })
    element.dispatchEvent(event)
}