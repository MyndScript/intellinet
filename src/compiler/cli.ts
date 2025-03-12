#!/usr/bin/env node

import { MindScriptCompiler } from './mindscript-compiler';

const compiler = new MindScriptCompiler();
const sourceFile = process.argv[2];

if (!sourceFile) {
    console.error('Please provide a source file');
    process.exit(1);
}

try {
    compiler.compile(sourceFile);
    console.log(`✅ Compiled ${sourceFile}`);
} catch (error) {
    console.error('❌ Compilation failed:', error);
    process.exit(1);
}