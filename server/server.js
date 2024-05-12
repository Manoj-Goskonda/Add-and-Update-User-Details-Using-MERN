const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001; // Change the port if needed

let data = [];
let nextId = 1; // Initial ID value

app.use(bodyParser.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

// Get all data
app.get('/data', (req, res) => {
    res.json(data);
});

// Add data
app.post('/data', (req, res) => {
    const newData = req.body;
    newData.id = nextId++; // Assign the next available ID
    data.push(newData);
    res.status(201).json(newData);
});

// Update data
app.put('/data/:id', (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    const index = data.findIndex(item => item.id === parseInt(id)); // Convert id to number for comparison
    if (index !== -1) {
        data[index] = newData;
        res.json(newData);
    } else {
        res.status(404).send('Data not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
