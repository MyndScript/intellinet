export interface DirectoryConfig {
    files?: string[];
    dirs?: string[];
    required: boolean;
}

export interface StandardDirs {
    [key: string]: DirectoryConfig;
}

export interface StructureCheckData {
    path: string;
    required: boolean;
}

export interface SymlinkCheckData {
    source: string;
    target: string;
}

export interface FileSearchResult {
    path: string;
    content?: string;
}