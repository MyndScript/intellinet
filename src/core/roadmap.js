const MindScriptRoadmap = [
    {
        name: 'core-visualization',
        complete: true,
        dependencies: [],
    },
    {
        name: 'quantum-integration',
        complete: false,
        dependencies: ['core-visualization'],
    },
    {
        name: 'neural-network',
        complete: false,
        dependencies: ['quantum-integration'],
    },
];

module.exports = MindScriptRoadmap;
