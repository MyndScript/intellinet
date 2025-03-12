import commandHandler from "../src/utils/commandHandler.ms";
import { createHexGrid } from "../src/components/hexGrid.ms";
import { createParticleSystem } from "../src/components/particleNodes.ms";

// Initialize the hexagonal grid and particle system
const hexGrid = createHexGrid(10, 10, 30);
const particles = createParticleSystem(50, 800, 600);

// Render the hexagonal grid and particle system
const visualizationContainer = document.getElementById("visualization");

hexGrid.forEach((hex) => {
  const hexElement = document.createElement("div");
  hexElement.className = "hexagon";
  hexElement.style.left = `${hex.x}px`;
  hexElement.style.top = `${hex.y}px`;
  visualizationContainer.appendChild(hexElement);
});

particles.forEach((particle) => {
  const particleElement = document.createElement("div");
  particleElement.className = "particle";
  particleElement.style.left = `${particle.x}px`;
  particleElement.style.top = `${particle.y}px`;
  visualizationContainer.appendChild(particleElement);
});

// Example usage of command handler
commandHandler.handleCommand("Abby save -all");
commandHandler.handleCommand("Abby reload -all");

// Function to make API requests
async function apiRequest(method, path, body) {
  const response = await fetch(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
}

// Example API request to create a new branch
apiRequest("POST", "/api/branches", { name: "new-branch" })
  .then((response) => console.log("Branch created:", response))
  .catch((error) => console.error("Error creating branch:", error));
