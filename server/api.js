const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Load file
app.get('/api/load', (req, res) => {
    const filePath = path.join(__dirname, req.query.file);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        res.send(data);
    });
});

// Save file
app.post('/api/save', (req, res) => {
    const filePath = path.join(__dirname, req.query.file);
    fs.writeFile(filePath, req.body.content, 'utf8', (err) => {
        if (err) {
            return res.status(500).send('Error saving file');
        }
        res.send('File saved successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
