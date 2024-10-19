// Sum function (testing only)
function calculateSum() {
  // Get the values from the input fields
  const x = document.getElementById('x').value;
  const y = document.getElementById('y').value;

  // Send the input to the server
  fetch(`/runSum?x=${x}&y=${y}`)
    .then(response => response.text())
    .then(data => {
      // Display the result in the output paragraph
      document.getElementById('output').textContent = data;
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('output').textContent = 'Error occurred!';
    });
}

// Key generation
function getKeys() {
  fetch('/runKeygen')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Update input fields with the returned strings
      document.getElementById('N_key').value = data[0] || '';
      document.getElementById('e_key').value = data[1] || '';
      document.getElementById('d_key').value = data[2] || '';
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// RSA encryption
function rsaEn() {
  // Get the values from the input fields
  const N_str = document.getElementById('N_key').value;
  const e_str = document.getElementById('e_key').value;
  const m_str = document.getElementById('m_in').value;

  let padded_m_str = "";

  for (let i = 0; i < m_str.length; i++) {
    let ascii = m_str.charCodeAt(i).toString();
    padded_m_str += ascii.padStart(3, '0');
  }

  // Encryption
  // Determine how many blocks are to be encrypted separately
  let en_blocks = Math.ceil(padded_m_str.length / (N_str.length - 1));
  console.log("Blocks:", en_blocks);

  let cur_block = "";

  // Initialize output with block information
  let en_output = en_blocks.toString().padStart(3, '0');

  for (let i = 0; i < en_blocks; i++) {
    // Get current block
    if (i === en_blocks - 1) {
      cur_block = padded_m_str.substring(i * (N_str.length - 1));
    } else {
      cur_block = padded_m_str.substring(i * (N_str.length - 1), (i + 1) * (N_str.length - 1));
    }

    console.log("Cur_block:", cur_block);

    // Encrypt block and add to output string
    fetch(`/runRsaEn?N_str=${N_str}&e_str=${e_str}&m_str=${cur_block}`)
      .then(response => response.text())
      .then(data => {
        // Add encrypted block to output
        en_output += data;
        console.log("Encrypted block:", data);
        console.log("Current output: ", en_output);
        if (i === en_blocks - 1) {
          // Send output to user
          console.log("Finished output:", en_output);
          document.getElementById('c_out').value = en_output;
        }

      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('c_out').value = 'Error occurred!';
      });
  }
}

// RSA Decryption
function rsaDe() {
  // Get the values from the input fields
  const N_str = document.getElementById('N_key').value;
  console.log("Got N: ", N_str)
  const d_str = document.getElementById('d_key').value;
  console.log("Got d: ", d_str)
  const c_str = document.getElementById('c_in').value;
  console.log("Got c: ", c_str)

  // Send the input to the server
  fetch(`/runRsaDe?N_str=${N_str}&d_str=${d_str}&c_str=${c_str}`)
    .then(response => response.text())
    .then(data => {
      // Determine amount of zeroes to be added at the start and add them
      let padVal = 3 - data.length % 3;
      if (padVal === 3) padVal = 0;
      data = data.padStart(padVal + data.length, '0');

      let decoded_m_out = "";
      for (let i = 0; i < data.length; i += 3) {
        let ascii = data.substring(i, i + 3);
        decoded_m_out += String.fromCharCode(parseInt(ascii, 10));
      }

      document.getElementById('m_out').value = decoded_m_out;
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('m_out').value = 'Error occurred!';
    });
}
