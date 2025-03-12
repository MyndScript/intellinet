/**
 * @file events.ts
 * @description Event system replacing async operations
 *
 * Traditional:
 * - Promise chains
 * - async/await
 * - Callbacks
 *
 * MindSQL:
 * - Direct event emission
 * - Synchronous operations
 * - Immediate feedback
 */

import { EventEmitter } from "events";

export class AIEnhancedEventEmitter extends EventEmitter {
    /**
     * Emit event synchronously
     * No promises, no async, just direct communication
     */
    emit(event: string, data?: any) {
        super.emit(event, data);
        return true; // Always sync completion
    }

    /**
     * Listen for events
     * Replace await with event subscription
     */
    on(event: string, listener: (data: any) => void) {
        super.on(event, listener);
        return this; // Enable chaining
    }
}
