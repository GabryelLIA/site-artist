/**
 * Simple development server for Jacques Colas-Guérin Portfolio Website
 */

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop the server`);
});
