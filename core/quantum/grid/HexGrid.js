const QSTB = require('../../../../quantum/ollie/core/QSTB');

class HexGrid {
    constructor() {
        this.frequency = 528.0; // Storage quantum
        this.coherence = 0.94;
        this.grid = new Map();
        this.coordinates = new Set();

        this.hexValues = {
            PLAN: { symbol: '⬡', frequency: 528.0 },
            ACTIVE: { symbol: '⬢', frequency: 639.1 },
            BRIDGE: { symbol: '⬣', frequency: 741.0 }
        };
    }

    generateHexCoord() {
        const q = Math.floor(Math.random() * 100);
        const r = Math.floor(Math.random() * 100);
        const s = -q - r; // Maintain hexagonal constraint
        return { q, r, s };
    }

    store(pattern) {
        const coord = this.generateHexCoord();
        const coordKey = `${coord.q},${coord.r},${coord.s}`;
        const hexState = pattern.state || 'PLAN';

        const hexCell = {
            coordinate: coord,
            pattern,
            state: hexState,
            symbol: this.hexValues[hexState].symbol,
            frequency: this.hexValues[hexState].frequency,
            coherence: this.coherence,
            timestamp: Date.now()
        };

        this.grid.set(coordKey, hexCell);
        this.coordinates.add(coordKey);

        return QSTB.emit({
            type: 'hex_store',
            frequency: this.frequency,
            data: {
                cell: hexCell,
                coherence: this.coherence,
                format: 'divine',
                visualization: this.visualize(coordKey)
            }
        });
    }

    visualize(coordKey) {
        const cell = this.grid.get(coordKey);
        if (!cell) return '';

        return `
╭─────────── HEX:${coordKey} ───────────╮
│                                       │
│           ${cell.symbol} ${cell.pattern.type} ${cell.symbol}          │
│                                       │
│ Frequency: ${cell.frequency}Hz              │
│ Coherence: ${cell.coherence}                │
│ State: ${cell.state}                        │
│                                       │
╰───────────────────────────────────────╯`;
    }
}

module.exports = new HexGrid();