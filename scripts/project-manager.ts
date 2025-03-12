import { AIEnhancedEventEmitter } from '../../src/core/event-system.js';
import { StandardDirs, StructureCheckData } from './types.js';
import { QuantumStateManager } from '../../src/core/quantum/state-manager.js';
import * as path from 'path';
import { promises as fs } from 'fs';

export interface FileSearchResult {
    path: string;
    content?: string;
}

export class ProjectStructureManager {
    private readonly rootDir: string = '/var/www';
    private events: AIEnhancedEventEmitter;
    private quantum: QuantumStateManager;
    
    // Fixed: Properly type the standardDirs object
    private readonly standardDirs: StandardDirs = {
        docs: {
            files: ['ARCHITECTURE.md', 'CHANGELOG.md', 'PROGRESS.md'],
            required: true
        },
        src: {
            dirs: ['core', 'quantum', 'mindsql', 'ui'],
            required: true
        },
        IdeaHub: {
            dirs: ['active-projects', 'parked-ideas', 'docs'],
            files: ['README.md'],
            required: true
        }
    };

    constructor() {
        // AIEnhancedEventEmitter: Core quantum event system
        this.events = new AIEnhancedEventEmitter();
        this.quantum = new QuantumStateManager();
        this.initializeEvents();
    }

    private initializeEvents(): void {
        // QSTB: Will replace with quantum state observers
        this.events.on('structure:validate', () => this.validateStructure());
        this.events.on('structure:check:dir', (data: StructureCheckData) => {
            this.ensureQuantumState(data.path);
        });
    }

    validateStructure(): void {
        this.events.emit('structure:check:start');
        
        // Fixed: Check if dirs exists before accessing
        const ideaHubConfig = this.standardDirs.IdeaHub;
        if (ideaHubConfig.dirs) {
            // Fixed: Proper iteration over dirs array
            ideaHubConfig.dirs.forEach((dir: string) => {
                const fullPath = path.join(this.rootDir, 'IdeaHub', dir);
                this.quantum.initializeState(fullPath);
                this.events.emit('structure:check:dir', {
                    path: fullPath,
                    required: true
                });
            });
        }

        this.events.emit('structure:check:complete');
    }

    // QSTB: Quantum state transaction
    private ensureQuantumState(dirPath: string): void {
        this.events.emit('quantum:state:initialize', {
            path: dirPath,
            type: 'directory',
            state: 'coherent'
        });

        this.quantum.observeState(dirPath, (state) => {
            if (state.exists) {
                this.events.emit('structure:dir:verified', { path: dirPath });
            } else {
                this.quantum.createState({
                    path: dirPath,
                    type: 'directory',
                    metadata: {
                        created: Date.now(),
                        quantum_id: this.quantum.generateQUID()
                    }
                });
            }
        });
    }
}