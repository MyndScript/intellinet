export interface FileInteraction {
    pattern: string;
    userConfidence: number;
    systemSuccess: number;
}

export interface FileUsage {
    userId: string;
    pattern: string;
    confidence: number;
    success: boolean;
}

export interface FileRelationship {
    getStrength(): number;
    learn(interaction: FileInteraction): void;
}