import { QuantumVM } from '../quantum/vm';
import * as path from 'path';

export class TestRunner {
    static async runTest(msFile: string): Promise<any> {
        const vm = new QuantumVM();
        const absolutePath = path.resolve(__dirname, msFile);
        return vm.execute(absolutePath);
    }
}