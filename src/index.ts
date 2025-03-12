import { MSParser } from './parser/MSParser';
import { MSCompiler } from './compiler/MSCompiler';

export class MindScriptRuntime {
    private parser: MSParser;
    private compiler: MSCompiler;

    constructor() {
        this.parser = new MSParser();
        this.compiler = new MSCompiler();
    }

    public async execute(source: string): Promise<any> {
        const ast = this.parser.parse(source);
        return this.compiler.compile(ast);
    }
}