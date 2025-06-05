const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 1. Define your custom routes FIRST
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// You can add other API routes here if your backend expands (e.g., for handling API Gateway communication directly if needed)

// 2. THEN, serve your static files.
// This ensures that if a specific route matches, it handles it,
// otherwise, it looks for a static file.
app.use(express.static(__dirname));

// Start the server only if the file is run directly (not imported for testing)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

// Export the app for testing purposes
module.exports = app;