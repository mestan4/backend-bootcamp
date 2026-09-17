const express = require('express');

const app = express();

// Built-in middleware to parse incoming JSON payloads
app.use(express.json());

// Custom Logger Middleware: logs timestamp, HTTP method, and URL for every request
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// In-memory note database for Day 4
let notes = [
  { id: 1, title: 'Learn Node.js', content: 'Understand the runtime and V8 engine' },
  { id: 2, title: 'Learn Express', content: 'Routing, middleware, and request lifecycle' }
];

// 1. READ ALL (with optional Query search): GET /notes or GET /notes?search=node
app.get('/notes', (req, res) => {
  const searchQuery = req.query.search;

  if (searchQuery) {
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return res.status(200).json({ success: true, data: filteredNotes });
  }

  res.status(200).json({ success: true, data: notes });
});

// 2. READ ONE (by URL Param): GET /notes/:id
app.get('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const note = notes.find((item) => item.id === noteId);

  if (!note) {
    return res.status(404).json({ success: false, message: 'Note not found!' });
  }

  res.status(200).json({ success: true, data: note });
});

// 3. CREATE: POST /notes
app.post('/notes', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'Both title and content are required!'
    });
  }

  const newNote = {
    id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
    title,
    content
  };

  notes.push(newNote);
  res.status(201).json({ success: true, message: 'Note created', data: newNote });
});

// 4. UPDATE: PUT /notes/:id
app.put('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const { title, content } = req.body;

  const noteIndex = notes.findIndex((item) => item.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ success: false, message: 'Note not found!' });
  }

  // Update existing fields if provided
  if (title) notes[noteIndex].title = title;
  if (content) notes[noteIndex].content = content;

  res.status(200).json({
    success: true,
    message: 'Note updated',
    data: notes[noteIndex]
  });
});

// 5. DELETE: DELETE /notes/:id
app.delete('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const noteExists = notes.some((item) => item.id === noteId);

  if (!noteExists) {
    return res.status(404).json({ success: false, message: 'Note not found!' });
  }

  notes = notes.filter((item) => item.id !== noteId);

  res.status(200).json({
    success: true,
    message: `Note with id ${noteId} deleted successfully.`
  });
});

app.patch('/notes/:id/complete', (req, res) => {
  // 1. URL'den gelen id'yi sayıya çeviriyoruz (Senin yazdığın kısım)
  const noteId = parseInt(req.params.id, 10);

  // 2. Notu listede arıyoruz (Senin yazdığın kısım)
  const note = notes.find((item) => item.id === noteId);

  // 3. Not bulunamadıysa hemen 404 dönüp fonksiyonu bitiriyoruz (return)
  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Note not found!'
    });
  }

  // 4. Not bulundu! Yeni özelliğini ekliyoruz/güncelliyoruz
  note.isCompleted = true;

  // 5. İstemciye başarı yanıtı dönüyoruz
  res.status(200).json({
    success: true,
    message: 'Note marked as completed',
    data: note
  });
});

// Start listening
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Day 4 CRUD server running on http://localhost:${PORT}`);
});