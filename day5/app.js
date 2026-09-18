const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Resolve absolute path to notes.json
const filePath = path.join(__dirname, 'notes.json');

// Middleware to parse JSON request bodies
app.use(express.json());

// Custom Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Helper function: Read notes from JSON file 
const readNotesFromFile = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8');
    return [];
  }
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
};

// Helper function: Write notes to JSON file
const writeNotesToFile = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// 1. GET /notes - List all notes or search with query (?search=...)
app.get('/notes', (req, res) => {
  try {
    const notes = readNotesFromFile();
    const searchQuery = req.query.search;

    if (searchQuery) {
      const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return res.status(200).json({
        success: true,
        count: filteredNotes.length,
        data: filteredNotes
      });
    }

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error reading notes.' });
  }
});

// 2. GET /notes/:id - Get a single note by ID
app.get('/notes/:id', (req, res) => {
  try {
    const noteId = parseInt(req.params.id, 10);

    if (isNaN(noteId)) {
      return res.status(400).json({ success: false, message: 'Invalid note ID format.' });
    }

    const notes = readNotesFromFile();
    const note = notes.find((n) => n.id === noteId);

    if (!note) {
      return res.status(404).json({ success: false, message: `Note with id ${noteId} not found.` });
    }

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving note.' });
  }
});

// 3. POST /notes - Create a new note
app.post('/notes', (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Both title and content are required fields.'
      });
    }

    const notes = readNotesFromFile();
    const newNote = {
      id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
      title,
      content,
      isCompleted: false,
      createdAt: new Date().toISOString()
    };

    notes.push(newNote);
    writeNotesToFile(notes);

    res.status(201).json({
      success: true,
      message: 'Note created and saved successfully.',
      data: newNote
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error creating note.' });
  }
});

// 4. PUT /notes/:id - Update note title/content
app.put('/notes/:id', (req, res) => {
  try {
    const noteId = parseInt(req.params.id, 10);

    if (isNaN(noteId)) {
      return res.status(400).json({ success: false, message: 'Invalid note ID format.' });
    }

    const { title, content } = req.body;
    if (!title && !content) {
      return res.status(400).json({
        success: false,
        message: 'At least one field (title or content) is required to update.'
      });
    }

    const notes = readNotesFromFile();
    const noteIndex = notes.findIndex((n) => n.id === noteId);

    if (noteIndex === -1) {
      return res.status(404).json({ success: false, message: `Note with id ${noteId} not found.` });
    }

    if (title) notes[noteIndex].title = title;
    if (content) notes[noteIndex].content = content;
    notes[noteIndex].updatedAt = new Date().toISOString();

    writeNotesToFile(notes);

    res.status(200).json({
      success: true,
      message: 'Note updated successfully.',
      data: notes[noteIndex]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating note.' });
  }
});

// 5. PATCH /notes/:id/complete - Toggle or mark complete
app.patch('/notes/:id/complete', (req, res) => {
  try {
    const noteId = parseInt(req.params.id, 10);

    if (isNaN(noteId)) {
      return res.status(400).json({ success: false, message: 'Invalid note ID format.' });
    }

    const notes = readNotesFromFile();
    const note = notes.find((n) => n.id === noteId);

    if (!note) {
      return res.status(404).json({ success: false, message: `Note with id ${noteId} not found.` });
    }

    note.isCompleted = true;
    note.completedAt = new Date().toISOString();
    writeNotesToFile(notes);

    res.status(200).json({
      success: true,
      message: 'Note marked as completed.',
      data: note
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating status.' });
  }
});

// 6. DELETE /notes/:id - Delete note by ID
app.delete('/notes/:id', (req, res) => {
  try {
    const noteId = parseInt(req.params.id, 10);

    if (isNaN(noteId)) {
      return res.status(400).json({ success: false, message: 'Invalid note ID format.' });
    }

    const notes = readNotesFromFile();
    const noteExists = notes.some((n) => n.id === noteId);

    if (!noteExists) {
      return res.status(404).json({ success: false, message: `Note with id ${noteId} not found.` });
    }

    const filteredNotes = notes.filter((n) => n.id !== noteId);
    writeNotesToFile(filteredNotes);

    res.status(200).json({
      success: true,
      message: `Note with id ${noteId} deleted successfully.`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting note.' });
  }
});

// Global 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found.'
  });
});

app.listen(PORT, () => {
  console.log(`Day 5 Server running on http://localhost:${PORT}`);
});