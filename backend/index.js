import express, { json } from "express";
import cors from "cors";
import pool from "./db.js";
import { r } from "tar";

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Port
const Port = 8000;

//Routes

//Create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description, title, status } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, title, status) VALUES($1, $2, $3) RETURNING *",
      [description, title, status]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error.message);
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, title, status } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1, title = $2, status = $3 WHERE id = $4",
      [description, title, status, id]
    );
    res.json({
      message: "Todo was updated!",
      data: updateTodo.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);
    res.json({
      message: "Todo was deleted!",
      data: deleteTodo.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
