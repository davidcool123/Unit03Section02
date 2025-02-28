const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON data from requests
app.use(express.json());

// Handle form submissions
app.post('/submit', (req, res) => {
    const data = req.body;

    // Define the path to data.json
    const filePath = path.join(__dirname, 'data.json');

    // Read existing data and update it
    fs.readFile(filePath, 'utf8', (err, fileData) => {
        let jsonData = [];

        if (!err && fileData) {
            try {
                jsonData = JSON.parse(fileData);
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
            }
        }

        // Append new data
        jsonData.push(data);

        // Write updated data back to file
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to file:', writeErr);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            res.json({ message: 'Data saved successfully!' });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
