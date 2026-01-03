import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:8080";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const res = await axios.get(`${API_URL}/notes`);
    setNotes(res.data);
  };

  const addNote = async () => {
    if (!title || !content) return;

    await axios.post(`${API_URL}/notes`, { title, content });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/notes/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container">
      <h1>📝 Notes App</h1>

      <input
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="add-btn" onClick={addNote}>
        Add Note
      </button>

      <hr style={{ margin: "20px 0" }} />

      {notes.map((note) => (
        <div className="note-card" key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button
            className="delete-btn"
            onClick={() => deleteNote(note.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
