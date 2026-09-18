const express = require('express');
const router = express.Router();
const { readNotesFromFile, writeNotesToFile } = require('../utils/fileHelper');

// GET /notes - List all notes or search with ?search=
router.get('/', (req, res) => {
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

    res.status(200).json({ success: true, count: notes.length, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to read notes.' });
  }
});

// GET /notes/:id - Get a single note
router.get('/:id', (req, res) => {
  try {
    const noteId = parseInt(req.params.id, 10);
    if (isNaN(noteId)) {
      return res.status(400).json({ success: false, message: 'Invalid note ID.' });
    }

    const notes = readNotesFromFile();
    const note = notes.find((n) => n.id === noteId);

    if (!note) {
      return res.status(404).json({ success: false, message: `Note ${noteId} not found.` });
    }

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get note.' });
  }
});

// POST /notes - Create a note
router.post('/', (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required.' });
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

    res.status(201).json({ success: true, message: 'Note created', data: newNote });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create note.' });
  }
});

// PUT /notes/:id - Full/Partial Update
router.put('/:id', (req, res) => {
  try {
    const noteId = parseInt(req.params.id, 10);
    if (isNaN(noteId)) {
      return res.status(400).json({ success: false, message: 'Invalid note ID.' });
    }

    const { title, content } = req.body;
    if (!title && !content) {
      return res.status(400).json({ success: false, message: 'Provide title or content to update.' });
    }

    const notes = readNotesFromFile();
    const noteIndex = notes.findIndex((n) => n.id === noteId);

    if (noteIndex === -1) {
      return res.status(404).json({ success: false, message: `Note ${noteId} not found.` });
    }

    if (title) notes[noteIndex].title = title;
    if (content) notes[noteIndex].content = content;
    notes[noteIndex].updatedAt = new Date().toISOString();

    writeNotesToFile(notes);

    res.status(200).json({ success: true, message: 'Note updated', data: notes[noteIndex] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update note.' });
  }
});

// PATCH /notes/:id/complete - Mark complete
router.patch('/:id/complete', (req, res) => {
  try {
    const noteId = parseInt(req.params.id, 10);
    if (isNaN(noteId)) {
      return res.status(400).json({ success: false, message: 'Invalid note ID.' });
    }

    const notes = readNotesFromFile();
    const note = notes.find((n) => n.id === noteId);

    if (!note) {
      return res.status(404).json({ success: false, message: `Note ${noteId} not found.` });
    }

    note.isCompleted = true;
    note.completedAt = new Date().toISOString();
    writeNotesToFile(notes);

    res.status(200).json({ success: true, message: 'Note marked as completed', data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update note status.' });
  }
});

// DELETE /notes/:id - Delete a note
router.delete('/:id', (req, res) => {
  try {
    const noteId = parseInt(req.params.id, 10);
    if (isNaN(noteId)) {
      return res.status(400).json({ success: false, message: 'Invalid note ID.' });
    }

    const notes = readNotesFromFile();
    const noteExists = notes.some((n) => n.id === noteId);

    if (!noteExists) {
      return res.status(404).json({ success: false, message: `Note ${noteId} not found.` });
    }

    const updatedNotes = notes.filter((n) => n.id !== noteId);
    writeNotesToFile(updatedNotes);

    res.status(200).json({ success: true, message: `Note ${noteId} deleted successfully.` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete note.' });
  }
});

module.exports = router;