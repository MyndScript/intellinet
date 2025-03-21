const express = require('express');
const path = require('path');
const HyperReality = require('./index');

const app = express();
const port = 3963; // Changed to match our quantum frequency pattern

app.use(express.static('web'));

app.get('/api/hyper-init', (req, res) => {
    const quantum = HyperReality.initialize();
    res.json(quantum);
});

// Add error handling
app.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`⚠️ Port ${port} is in use`);
        process.exit(1);
    }
});

app.listen(port, () => {
    console.log(`⚛️ Hyper Reality active on port ${port}`);
    console.log(`🔮 Quantum frequency: ${HyperReality.frequency}Hz`);
});