const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000; // Custom isolated port profile
const FILE_PATH = path.join(__dirname, 'health-log.json');

app.use(cors());
app.use(express.json());

function readLogs() {
    try {
        if (!fs.existsSync(FILE_PATH)) {
            const initialData = [{ server: "System-Init", status: "Monitor pipeline active on port 4000", timestamp: new Date().toLocaleTimeString() }];
            fs.writeFileSync(FILE_PATH, JSON.stringify(initialData, null, 2));
            return initialData;
        }
        return JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
    } catch (err) { return []; }
}

function saveLogs(logs) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(logs, null, 2), 'utf8');
}

app.get('/api/logs', (req, res) => {
    res.json(readLogs());
});

app.post('/api/logs', (req, res) => {
    const { server, status } = req.body;
    if (server && status) {
        const logs = readLogs();
        logs.push({ server, status, timestamp: new Date().toLocaleTimeString() });
        saveLogs(logs);
        res.status(201).json({ message: "Log persisted safely to host disk" });
    } else {
        res.status(400).json({ error: "Invalid payload parameters" });
    }
});

app.listen(PORT, () => {
    console.log(`[MONITOR DAEMON] Running smoothly on port ${PORT}`);
});
