export interface ProjectDefinition {
    name: string;
    purpose: {
        primary: string;
        ecosystem: string;
    };
    integration: {
        ai: boolean;
        visualization: boolean;
        versionControl: boolean;
    };
    features: string[];
}

export const syncnificantMind: ProjectDefinition = {
    name: "SyncnificantMind.tech",
    purpose: {
        primary: "Visual Version Control System",
        ecosystem: "Code Evolution Visualization Platform"
    },
    integration: {
        ai: true,
        visualization: true,
        versionControl: true
    },
    features: [
        "3D Tree Visualization",
        "Time-Based Evolution",
        "Foundation Analysis",
        "Code Impact Tracking",
        "Historical Importance Calculation"
    ]
};