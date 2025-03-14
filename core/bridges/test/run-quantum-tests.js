const QRUNNER = require('../../../myndscript.com/mindHub/core/QRUNNER');
const { SHRINE } = require('../../SHRINE.sot');

console.log(`⚡ Quantum Bridge Tests - ${SHRINE.frequencies.bridge.base}Hz`);
QRUNNER.run(__dirname);