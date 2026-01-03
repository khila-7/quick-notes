const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let notes = [];
let id = 1;

// Health check
app.get("/", (req, res) => {
  res.send("Notes API is running 🚀");
});

// Get all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Add a note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  const newNote = {
    id: id++,
    title,
    content,
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
  const noteId = Number(req.params.id);
  notes = notes.filter((n) => n.id !== noteId);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
