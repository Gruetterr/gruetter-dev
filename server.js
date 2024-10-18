const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static('public'));

// Endpoint to sum (testing only)
app.get('/runSum', (req, res) => {
  const x = req.query.x;
  const y = req.query.y;

  if (!x || !y) {
    return res.status(400).send('Missing input values');
  }

  const input = `${x} ${y}`;
  const child = exec('./sum', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Error: ${stderr}`);
    }
    res.send(stdout);
  });

  // Pass input to C++ program via stdin
  child.stdin.write(input);
  child.stdin.end();
});

// Endpoint to keygen 
app.get('/runKeygen', (req, res) => {
  exec('./keygen', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Error: ${stderr}`);
    }

    const strings = stdout.trim().split('\n'); // Split output into an array
    res.json(strings); // Return as JSON
  });
});

// Endpoint to rsa_en
app.get('/runRsaEn', (req, res) => {
  const N_str = req.query.N_str;
  const e_str = req.query.N_str;
  const m_str = req.query.N_str;

  const input = `${N_str} ${e_str} ${m_str}`;
  const child = exec('./sum', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Error: ${stderr}`);
    }
    res.send(stdout);
  });

  // Pass input to C++ program via stdin
  child.stdin.write(input);
  child.stdin.end();
})

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...');
});
