const express = require('express');
const logger = require('./middleware/logger');
const notesRouter = require('./routes/notes');

const app = express();

// Global Middlewares
app.use(express.json());
app.use(logger);

// Mount Modular Routes
app.use('/notes', notesRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found.'
  });
});

module.exports = app;