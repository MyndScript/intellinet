import { QuantumState } from './quantum';

export interface ProjectStructure {
    id: string;
    name: string;
    version: string;
    quantum: QuantumState;
    files: string[];
    root?: string;
}

export class ProjectValidator {
    static validatePaths(structure: ProjectStructure): ProjectStructure {
        return structure;
    }
}