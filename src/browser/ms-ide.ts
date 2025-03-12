import AIEnhancedEventEmitter from '../core/event-system';
import MSCompiler from '../compiler/ms-compiler';
import MSRuntime from '../runtime/ms-runtime';

class MSIde {
    constructor(private emitter: AIEnhancedEventEmitter, private compiler: MSCompiler, private runtime: MSRuntime) {
    }

    run(msCode: string): void {
        const jsCode = this.compiler.compile(msCode);
        this.runtime.execute(jsCode);
    }
}

export default MSIde;
