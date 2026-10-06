const API_URL = 'http://localhost/api/tasks';

// HTTP GET Request: Fetch tasks from the backend API daemon
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        const list = document.getElementById('taskList');
        list.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            list.appendChild(li);
        });
    } catch (err) {
        console.error("Network Error: Cannot connect to backend api daemon.", err);
    }
}

// HTTP POST Request: Send data payload to the backend
async function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value.trim()) return;

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: input.value })
        });
        input.value = '';
        fetchTasks(); // Refresh the dynamic UI list
    } catch (err) {
        console.error("Network Error: Failed to post task payload.", err);
    }
}

// Initial runtime execution loop
fetchTasks();
