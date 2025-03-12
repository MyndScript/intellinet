// Hexagonal grid component for MindTree

class Hexagon {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw() {
        // Drawing logic for hexagon (replace with MindScript-specific code)
        console.log(`Drawing hexagon at (${this.x}, ${this.y}) with size ${this.size}`);
    }
}

function createHexGrid(rows, cols, size) {
    const hexagons = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * size * 1.5;
            const y = row * size * Math.sqrt(3);
            if (col % 2 === 1) y += size * Math.sqrt(3) / 2;
            hexagons.push(new Hexagon(x, y, size));
        }
    }
    return hexagons;
}

const hexGrid = createHexGrid(10, 10, 30);
hexGrid.forEach(hex => hex.draw());
