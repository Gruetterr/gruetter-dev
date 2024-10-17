const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static('public'));

// Compile the C++ program on server startup
exec('g++ your_program.cpp -o your_program', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error compiling C++ program: ${stderr}`);
    return;
  }
  console.log('C++ program compiled successfully.');
});

// Endpoint to run the C++ program
app.get('/run', (req, res) => {
  const x = req.query.x;
  const y = req.query.y;

  if (!x || !y) {
    return res.status(400).send('Missing input values');
  }

  const input = `${x} ${y}`;
  const child = exec('./your_program', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Error: ${stderr}`);
    }
    res.send(stdout);
  });

  // Pass input to C++ program via stdin
  child.stdin.write(input);
  child.stdin.end();
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...');
});
