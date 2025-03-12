export interface EcosystemConnection {
    myndscript: {
        aiEndpoint: string;
        analysisPath: string;
    };
    mindtree: {
        visualizationEndpoint: string;
        dataPath: string;
    };
}

export const ecosystemConfig: EcosystemConnection = {
    myndscript: {
        aiEndpoint: "https://myndscript.com/api/ai",
        analysisPath: "/analysis/codebase"
    },
    mindtree: {
        visualizationEndpoint: "https://syncnificantmind.tech/api/visual",
        dataPath: "/data/evolution"
    }
};