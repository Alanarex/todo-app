const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "tododb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const ensureDatabaseExists = async () => {
  try {
    const connection = await db.promise().getConnection();
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${mysql.escapeId(process.env.DB_NAME || "tododb")};`);
    console.log(`Database '${process.env.DB_NAME}' ensured.`);
    connection.release();
  } catch (err) {
    console.error("Error ensuring database exists:", err);
  }
};

const dbWithDatabase = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "tododb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const ensureTableExists = async () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      due_time DATETIME DEFAULT NULL,
      status BOOLEAN DEFAULT FALSE
    );
  `;

  try {
    const connection = await dbWithDatabase.promise().getConnection();
    await connection.query(createTableSQL);
    console.log("Table `tasks` checked/created successfully.");
    connection.release();
  } catch (err) {
    console.error("Error ensuring table exists:", err);
  }
};

ensureDatabaseExists().then(() => {
  ensureTableExists().then(() => {
    app.listen(5000, () => {
      console.log("Backend running on port 5000");
    });
  });
});

app.get("/tasks", async (req, res) => {
  try {
    const [tasks] = await db.promise().query("SELECT * FROM tasks");
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const [task] = await db.promise().query("SELECT * FROM tasks WHERE id = ?", [req.params.id]);
    if (task.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/tasks", async (req, res) => {
  const { title, description, due_time } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const [result] = await db.promise().query(
      "INSERT INTO tasks (title, description, due_time, status) VALUES (?, ?, ?, ?)",
      [title, description || null, due_time || null, false]
    );
    res.status(201).json({ id: result.insertId, title, description: description || null, due_time: due_time || null, status: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const { title, description, due_time } = req.body;
  const { id } = req.params;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const [result] = await db.promise().query(
      "UPDATE tasks SET title=?, description=?, due_time=? WHERE id=?",
      [title, description || null, due_time || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

app.patch("/tasks/:id/toggle", async (req, res) => {
  try {
    // Get task by ID
    const [task] = await db.promise().query("SELECT status FROM tasks WHERE id = ?", [req.params.id]);

    if (!task.length) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Toggle the status
    const newStatus = !task[0].status;

    // Update task in DB
    await db.promise().query("UPDATE tasks SET status = ? WHERE id = ?", [newStatus, req.params.id]);

    res.json({ id: req.params.id, status: newStatus, message: "Task status updated" });
  } catch (err) {
    console.error("Error toggling task status:", err);
    res.status(500).json({ error: "Failed to toggle task status" });
  }
});


app.delete("/tasks/:id", async (req, res) => {
  try {
    const [result] = await db.promise().query("DELETE FROM tasks WHERE id = ?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});