// PURE JS: Neural memory pathways
const NeuralPathways = {
    knownPaths: new Map(), // was: registry

    createPath(name, neuron) {
        // was: define
        this.knownPaths.set(name, neuron);
        return this.createNeuralBridge(neuron);
    },

    createNeuralBridge(neuron) {
        // was: createModuleProxy
        return new Proxy(neuron, {
            get(target, signal) {
                // was: prop
                if (signal === 'quantum') {
                    return true;
                }
                return target[signal];
            },
        });
    },
};

// Neural Memory System
const MemorySystem = {
    activeMemories: new Map(), // was: modules
    memoryStreams: new Map(), // was: loading

    async rememberPath(pathLocation) {
        // was: load
        if (this.activeMemories.has(pathLocation)) {
            return this.activeMemories.get(pathLocation);
        }

        if (this.memoryStreams.has(pathLocation)) {
            return this.memoryStreams.get(pathLocation);
        }

        const memoryStream = this._formMemory(pathLocation); // was: _loadModule
        this.memoryStreams.set(pathLocation, memoryStream);

        try {
            const memory = await memoryStream;
            this.activeMemories.set(pathLocation, memory);
            this.memoryStreams.delete(pathLocation);
            return memory;
        } catch (err) {
            this.memoryStreams.delete(pathLocation);
            throw err;
        }
    },

    async _formMemory(pathLocation) {
        return import(pathLocation).catch((err) => {
            console.error(`Failed to form neural memory: ${pathLocation}`, err);
            throw err;
        });
    },

    prepareMemories(pathLocations) {
        // was: preload
        return Promise.all(
            pathLocations.map((path) => this.rememberPath(path))
        );
    },

    forgetMemories(pathLocation) {
        // was: clearCache
        if (pathLocation) {
            this.activeMemories.delete(pathLocation);
        } else {
            this.activeMemories.clear();
        }
    },
};

// Singleton neural pathway
export default MemorySystem;
