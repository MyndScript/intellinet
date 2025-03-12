export interface PlatformConfig {
    target: 'web' | 'ios' | 'android' | 'desktop';
    quantum: boolean;
    neural: boolean;
    optimization: 'quantum' | 'classical';
    features?: {
        resonance: boolean;
        coherence: boolean;
        evolution: boolean;
    };
    memory?: {
        heapSize: number;
        registerCount: number;
    };
}

export interface PlatformBridgeResult {
    react: () => void;
    blender: () => void;
    unity: () => void;
    unreal: () => void;
    quantum?: {
        initialize: () => void;
        connect: () => void;
        synchronize: () => void;
    };
}
