import AIEnhancedEventEmitter from '../core/event-system';

class MSRuntime {
    constructor(private emitter: AIEnhancedEventEmitter) {
    }

    execute(jsCode: string): void {
        try {
            // Execute the JavaScript code
            eval(jsCode);
            this.emitter.emit('msCodeExecuted', { jsCode });
        } catch (error) {
            console.error('Error executing MS code:', error);
            this.emitter.emit('msCodeExecutionError', { jsCode, error });
        }
    }
}

export default MSRuntime;
