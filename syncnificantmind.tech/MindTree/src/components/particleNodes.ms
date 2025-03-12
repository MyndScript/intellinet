// Particle nodes component for MindTree

class Particle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw() {
        // Drawing logic for particle (replace with MindScript-specific code)
        console.log(`Drawing particle at (${this.x}, ${this.y}) with radius ${this.radius}`);
    }
}

function createParticleSystem(count, maxWidth, maxHeight) {
    const particles = [];
    for (let i = 0; i < count; i++) {
        const x = Math.random() * maxWidth;
        const y = Math.random() * maxHeight;
        const radius = Math.random() * 10 + 5;
        particles.push(new Particle(x, y, radius));
    }
    return particles;
}

const particles = createParticleSystem(50, 800, 600);
particles.forEach(particle => particle.draw());
