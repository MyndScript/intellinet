import { ASTNode } from '../parser';

export class Runtime {
    generate(ast: ASTNode): string {
        return this.processNode(ast);
    }

    private processNode(node: ASTNode): string {
        switch (node.type) {
            case 'Program':
                return node.children
                    ?.map(child => this.processNode(child))
                    .join('\n') || '';
                    
            case 'Statement':
                return `console.log("Executing: ${node.value}");`;
                
            default:
                return '';
        }
    }
}