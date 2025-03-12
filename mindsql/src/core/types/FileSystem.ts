export interface FilePattern {
    type: string;
    imports: string[];
    exports: string[];
    pattern: string;
}

export interface FileInteraction {
    pattern: string;
    userConfidence: number;
    systemSuccess: number;
    timestamp: number;
}

export interface FileUsage {
    userId: string;
    pattern: string;
    confidence: number;
    success: boolean;
    metadata: {
        lastAccess: number;
        frequency: number;
        adaptations: string[];
    };
}

export interface FileRelationship {
    strength: number;
    confidence: number;
    getStrength(): number;
    learn(interaction: FileInteraction): void;
}
