// Import express module
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory task list
let tasks = [
  { id: 1, title: "Learn Node.js", done: false },
  { id: 2, title: "Build a REST API", done: true },
];

// Route: Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Route: Add a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTask = { id: Date.now(), title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Route: Delete a task by ID
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks.splice(index, 1);
  res.json({ message: "Task deleted successfully" });
});

// Route: Toggle task completion
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  task.done = !task.done;
  res.json(task);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
