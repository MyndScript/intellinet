// Command handler utility for MindTree

import mindControl from '../core/mindControl.ms';
import { createHexGrid } from '../components/hexGrid.ms';
import { createParticleSystem } from '../components/particleNodes.ms';

class CommandHandler {
    handleCommand(command) {
        switch (command) {
            case 'Abby save -all':
                this.abbySaveAll();
                break;
            case 'Abby reload -all':
                this.abbyReloadAll();
                break;
            default:
                console.log(`Unknown command: ${command}`);
        }
    }

    abbySaveAll() {
        console.log('Saving all changes...');
        // Implement save logic here
        mindControl.saveAll();
    }

    abbyReloadAll() {
        console.log('Reloading all changes...');
        // Implement reload logic here
        mindControl.reloadAll();
    }
}

const commandHandler = new CommandHandler();

// Export the instance for use in other modules
export default commandHandler;
