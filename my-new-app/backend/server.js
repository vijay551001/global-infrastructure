const express = require('express');
const cors = require('cors');
const fs = require('fs');      // Core Node.js File System module
const path = require('path');  // Core module for directory paths

const app = express();
const PORT = 5000;

// Resolve the path where our raw data will be stored permanently
const FILE_PATH = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());

// Helper Function: Read data from file storage safely
function readTasksFromFile() {
    try {
        if (!fs.existsSync(FILE_PATH)) {
            // Baseline tasks if file doesn't exist yet
            const defaultTasks = ["Learn Git and GitHub workflow", "Understand App Architecture"];
            fs.writeFileSync(FILE_PATH, JSON.stringify(defaultTasks, null, 2));
            return defaultTasks;
        }
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("SysAdmin Error: Failed to read from storage file.", err);
        return [];
    }
}

// Helper Function: Write and commit data payloads down to disk storage
function saveTasksToFile(tasksArray) {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(tasksArray, null, 2), 'utf8');
    } catch (err) {
        console.error("SysAdmin Error: Write IO operation failed on disk.", err);
    }
}

// API Routes
app.get('/api/tasks', (req, res) => {
    const tasks = readTasksFromFile();
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const { task } = req.body;
    if (task) {
        const tasks = readTasksFromFile();
        tasks.push(task);
        saveTasksToFile(tasks); // Commit to disk
        res.status(201).json({ message: "Task written to file storage successfully" });
    } else {
        res.status(400).json({ error: "Payload missing required field: 'task'" });
    }
});

app.listen(PORT, () => {
    console.log(`[DAEMON] Persistent Server listening smoothly on http://localhost:${PORT}`);
});
