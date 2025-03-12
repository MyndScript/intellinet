export interface ProjectStructure {
    root: string;
    files: string[];
}

export class ProjectStructureManager {
    static analyze(root: string): ProjectStructure {
        return {
            root,
            files: []
        };
    }
}