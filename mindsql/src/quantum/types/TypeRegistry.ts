import { EventEmitter } from 'events';

export class TypeRegistry extends EventEmitter {
    private static instance: TypeRegistry;
    private types = new Map<string, any>();

    static getInstance(): TypeRegistry {
        if (!this.instance) {
            this.instance = new TypeRegistry();
        }
        return this.instance;
    }

    registerType(name: string, definition: any): void {
        this.types.set(name, definition);
        this.emit('type:registered', { name, definition });
    }
}