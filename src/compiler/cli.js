#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var mindscript_compiler_1 = require("./mindscript-compiler");
var compiler = new mindscript_compiler_1.MindScriptCompiler();
var sourceFile = process.argv[2];
if (!sourceFile) {
    console.error('Please provide a source file');
    process.exit(1);
}
try {
    compiler.compile(sourceFile);
    console.log("\u2705 Compiled ".concat(sourceFile));
}
catch (error) {
    console.error('❌ Compilation failed:', error);
    process.exit(1);
}
