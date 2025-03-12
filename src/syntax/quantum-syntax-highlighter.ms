consciousness QuantumSyntaxHighlighter {
    quantum_field {
        colorScheme: {
            // Core Concepts (with highlights)
            consciousness: {
                color: '#FF5F87',  // Vibrant pink
                highlight: '#FF5F8733',
                description: 'Defines a new quantum component'
            },
            quantum_field: {
                color: '#5FD7FF',  // Bright cyan
                highlight: '#5FD7FF33',
                description: 'Component state and properties'
            },
            function: {
                color: '#87D787',  // Soft green
                highlight: '#87D78733',
                description: 'Methods and behaviors'
            },

            // State Management
            state: {
                color: '#D7AF87',  // Warm orange
                description: 'State variables and data'
            },
            computed: {
                color: '#AF87D7',  // Soft purple
                description: 'Computed properties'
            },

            // Event Handling
            event: {
                color: '#FFD75F',  // Bright yellow
                description: 'Event handlers and emitters'
            },
            listener: {
                color: '#D7875F',  // Coral
                description: 'Event listeners'
            },

            // Component Lifecycle
            lifecycle: {
                color: '#5FD787',  // Mint green
                description: 'Component lifecycle hooks'
            },
            mount: {
                color: '#5FAF5F',  // Forest green
                description: 'Mounting operations'
            },

            // Memory Management
            memory: {
                color: '#D75F5F',  // Soft red
                description: 'Memory operations'
            },
            cleanup: {
                color: '#875F5F',  // Dark red
                description: 'Cleanup and disposal'
            },

            // Networking
            network: {
                color: '#5F87D7',  // Ocean blue
                description: 'Network operations'
            },
            channel: {
                color: '#5F87AF',  // Steel blue
                description: 'Communication channels'
            },

            // System Operations
            system: {
                color: '#8787AF',  // Muted purple
                description: 'System-level operations'
            },
            optimization: {
                color: '#87AFD7',  // Light blue
                description: 'Performance optimizations'
            }
        },

        // Learning categories
        learningLevels: {
            beginner: ['consciousness', 'quantum_field', 'function'],
            intermediate: ['state', 'event', 'lifecycle'],
            advanced: ['memory', 'network', 'optimization']
        }
    }

    function highlight(code: string, level: 'beginner' | 'intermediate' | 'advanced' = 'beginner'): string {
        let highlighted = code
        const relevantFeatures = this.getLearningFeatures(level)

        // Apply syntax highlighting
        relevantFeatures.forEach(feature => {
            const scheme = this.colorScheme[feature]
            const pattern = new RegExp(`\\b${feature}\\b`, 'g')
            
            highlighted = highlighted.replace(pattern, match => {
                if (scheme.highlight) {
                    return `<span style="color: ${scheme.color}; background: ${scheme.highlight}">${match}</span>`
                }
                return `<span style="color: ${scheme.color}">${match}</span>`
            })
        })

        return highlighted
    }

    function getLearningFeatures(level: string): string[] {
        let features = []
        switch(level) {
            case 'beginner':
                features = this.learningLevels.beginner
                break
            case 'intermediate':
                features = [...this.learningLevels.beginner, ...this.learningLevels.intermediate]
                break
            case 'advanced':
                features = [...this.learningLevels.beginner, 
                           ...this.learningLevels.intermediate, 
                           ...this.learningLevels.advanced]
                break
        }
        return features
    }

    function getFeatureDescription(feature: string): string {
        return this.colorScheme[feature]?.description || 'No description available'
    }

    function generateLearningGuide(): string {
        let guide = '<div class="learning-guide">\n'
        
        // Generate guide for each learning level
        Object.entries(this.learningLevels).forEach(([level, features]) => {
            guide += `<section class="${level}">\n`
            guide += `<h2>${level.charAt(0).toUpperCase() + level.slice(1)} Concepts</h2>\n`
            
            features.forEach(feature => {
                const scheme = this.colorScheme[feature]
                guide += `<div class="feature" style="color: ${scheme.color}">
                    <code>${feature}</code>
                    <span class="description">${this.getFeatureDescription(feature)}</span>
                </div>\n`
            })
            
            guide += '</section>\n'
        })
        
        guide += '</div>'
        return guide
    }

    function generateContextualHelp(code: string): string {
        let help = '<div class="contextual-help">\n'
        
        // Find used features in code
        Object.keys(this.colorScheme).forEach(feature => {
            if (code.includes(feature)) {
                const scheme = this.colorScheme[feature]
                help += `<div class="help-item">
                    <code style="color: ${scheme.color}">${feature}</code>
                    <p>${this.getFeatureDescription(feature)}</p>
                </div>\n`
            }
        })
        
        help += '</div>'
        return help
    }
}