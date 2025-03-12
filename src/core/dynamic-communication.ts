import AIEnhancedEventEmitter from './event-system';

class DynamicCommunication {
    constructor(private emitter: AIEnhancedEventEmitter) {
        this.context = 'one-on-one';
    }

    context: string;

    switchContext(newContext: string): void {
        this.context = newContext;
        this.emitter.emit('contextChanged', newContext);
    }

    communicate(message: string): void {
        if (this.context === 'one-on-one') {
            this.oneOnOneCommunication(message);
        } else if (this.context === 'group') {
            this.groupCommunication(message);
        } else {
            this.oneOnOneCommunication(message);
        }
    }

    oneOnOneCommunication(message: string): void {
        console.log(`One-on-One: ${message}`);
        this.emitter.emit('messageSent', { context: 'one-on-one', message });
    }

    groupCommunication(message: string): void {
        console.log(`Group Meeting: ${message}`);
        this.emitter.emit('messageSent', { context: 'group', message });
    }
}

export default DynamicCommunication;
