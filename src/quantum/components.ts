export interface QuantumComponent {
    id: string;
    fields: Map<string, any>;
    paths: Set<string>;
}

export class ComponentRegistry {
    private static components: Map<string, QuantumComponent> = new Map();

    static register(component: QuantumComponent): void {
        this.components.set(component.id, component);
    }

    static get(id: string): QuantumComponent | undefined {
        return this.components.get(id);
    }
}