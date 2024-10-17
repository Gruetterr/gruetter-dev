const express = require('express');
const { exec } = require('child_process');
const app = express();

// Serve the static HTML file
app.use(express.static('public'));

// Endpoint to run the C++ code
app.get('/run', (req, res) => {
  // Get input values from the query string
  const x = req.query.x;
  const y = req.query.y;

  // Ensure input values are provided
  if (!x || !y) {
    return res.status(400).send('Missing input values');
  }

  // Prepare input for the C++ program
  const input = `${x} ${y}`;

  // Run the C++ executable
  const child = exec('./your_program', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Error: ${stderr}`);
    }
    // Send C++ program output back to the client
    res.send(stdout);
  });

  // Send input to the C++ program's stdin
  child.stdin.write(input);
  child.stdin.end();
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
