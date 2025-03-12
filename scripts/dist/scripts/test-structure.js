import { ProjectStructureManager } from './project-manager.js';
import { AIEnhancedEventEmitter } from '../src/core/event-system.js';
export class StructureTester {
    manager;
    events;
    constructor() {
        this.events = new AIEnhancedEventEmitter();
        this.manager = new ProjectStructureManager();
        this.initializeEvents();
    }
    initializeEvents() {
        this.events.on('test:start', () => {
            console.log('🔍 Starting structure validation...');
        });
        this.events.on('structure:check:complete', () => {
            console.log('✅ Structure validation complete');
            this.verifyStructure();
        });
        this.events.on('structure:error', (error) => {
            console.error('❌ Structure error:', error.message);
        });
    }
    verifyStructure() {
        const checks = [
            '/var/www/IdeaHub',
            '/var/www/docs',
            '/var/www/src/core',
            '/var/www/src/quantum',
            '/var/www/src/mindsql'
        ];
        checks.forEach(path => {
            this.events.emit('structure:check:dir', { path, required: true });
        });
    }
    run() {
        this.events.emit('test:start');
        this.manager.validateStructure();
    }
}
// Run the test
const tester = new StructureTester();
tester.run();
