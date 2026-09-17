const express = require('express');

// Initialize the Express application
const app = express();

// In-memory data store for testing
const notes = [
  { id: 1, title: 'Learn Node.js basics' },
  { id: 2, title: 'Build an Express API' }
];

app.use(express.json());

// Route 1: Welcome message (Root URL)
// Method: GET, Path: /
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Day 3 - Express API'
  });
});

// Route 2: Get all notes
// Method: GET, Path: /notes
app.get('/notes', (req, res) => {
  res.status(200).json({
    success: true,
    data: notes
  });
});

// Route 3: Create a new note
// Method: POST, Path: /notes
app.post('/notes', (req, res) => {
  const newTitle = req.body.title;

  if (!newTitle) {
    return res.status(400).json({
      success: false,
      message: 'Note title is required!'
    });
  }

  const newNote = {
    id: notes.length + 1,
    title: newTitle
  };

  notes.push(newNote);

  res.status(201).json({
    success: true,
    message: 'Note created successfully',
    data: newNote
  });
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});