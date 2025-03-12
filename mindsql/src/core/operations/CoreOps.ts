import { AIEnhancedEventEmitter } from "../events";

export class CoreOperations {
    private state = new Map<string, any>();
    private events = new AIEnhancedEventEmitter();

    create(data: any) {
        const id = `entity-${Date.now()}`;
        this.state.set(id, data);
        this.events.emit("entity:created", { id, data });
        return { id, data };
    }

    read(id: string) {
        const data = this.state.get(id);
        this.events.emit("entity:read", { id, data });
        return data;
    }

    update(id: string, data: any) {
        if (!this.state.has(id)) {
            this.events.emit("entity:not-found", { id });
            return null;
        }

        this.state.set(id, { ...this.state.get(id), ...data });
        this.events.emit("entity:updated", { id, data });
        return this.state.get(id);
    }

    delete(id: string) {
        const data = this.state.get(id);
        this.state.delete(id);
        this.events.emit("entity:deleted", { id, data });
        return true;
    }
}
