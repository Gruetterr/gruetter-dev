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
async function rsaEn() {
  // Get the values from the input fields
  const N_str = document.getElementById('N_key').value;
  const e_str = document.getElementById('e_key').value;
  const m_str = document.getElementById('m_in').value;

  let encoded_m_str = "";

  for (let i = 0; i < m_str.length; i++) {
    let ascii = m_str.charCodeAt(i).toString();
    encoded_m_str += ascii.padStart(3, '0');
  }

  // Encryption
  // Determine how many blocks are to be encrypted separately
  let en_blocks = Math.ceil(encoded_m_str.length / (N_str.length - 1));
  console.log("Blocks to be encrypted:", en_blocks);

  let cur_block = "";

  // Initialize output with block information
  let en_output = "";

  for (let i = 0; i < en_blocks; i++) {
    // Get current block
    if (i === en_blocks - 1) {
      cur_block = encoded_m_str.substring(i * (N_str.length - 1));
      cur_block = cur_block.padEnd(N_str.length - 1, '0');
    } else {
      cur_block = encoded_m_str.substr(i * (N_str.length - 1), N_str.length - 1);
    }


    // Encrypt block and add to output string
    await fetch(`/runRsaEn?N_str=${N_str}&e_str=${e_str}&m_str=${cur_block}`)
      .then(response => response.text())
      .then(data => {
        // Add encrypted block to output
        console.log("Encrypted Block:", data);
        if (data.length < N_str.length) {
          console.log("Data.length is ", N_str.length - data.length, " smaller than N_str, length, padding");
          data = data.padStart(N_str.length, '0');
          console.log("padded: ", data);
        }
        console.log("Its length:", data.length, "N_str.length - 1:", N_str.length - 1);
        en_output += data;
        if (i === en_blocks - 1) {
          en_output += en_blocks.toString().padStart(3, '0');
          // Send output to user
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
async function rsaDe() {
  // Get the values from the input fields
  const N_str = document.getElementById('N_key').value;
  const d_str = document.getElementById('d_key').value;
  const c_str = document.getElementById('c_in').value;

  // Decryption
  // Determine how many blocks there are to be decrypted seperately from input string
  let cur_block = "";
  let de_output = "";
  let de_blocks = parseInt(c_str.slice(-3));
  console.log("Amount of blocks to decrypt: ", de_blocks);

  for (let i = 0; i < de_blocks; i++) {
    // Get current block
    if (i === de_blocks - 1) {
      cur_block = c_str.substring(i * N_str.length, c_str.length - 3);
    } else {
      cur_block = c_str.substr(i * N_str.length, N_str.length);
    }
    console.log("Cur_block:", cur_block);
    console.log("Its length:", cur_block.length, "N_str.length - 1:", N_str.length - 1);
    // Decrypt block
    await fetch(`/runRsaDe?N_str=${N_str}&d_str=${d_str}&c_str=${cur_block}`)
      .then(response => response.text())
      .then(data => {
        // Prepadding to ensure correct decoding
        let padVal = N_str.length - 1 - data.length;
        data = data.padStart(padVal + data.length, '0');
        if (i === de_blocks - 1) {
          // Remove padded triples of zeros at the end of last block
          data = data.replace(/(000)*$/, "");
        }

        // Add decrypted block to output
        de_output += data;
        console.log("Decrypted block: ", data);

        if (i === de_blocks - 1) {
          // Determine amount of zeroes to be added at the start and add them

          let decoded_de_output = "";
          for (let i = 0; i + 3 <= de_output.length; i += 3) {
            let ascii = de_output.substring(i, i + 3);
            decoded_de_output += String.fromCharCode(parseInt(ascii, 10));
          }

          document.getElementById('m_out').value = decoded_de_output;
          console.log(decoded_de_output);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('m_out').value = 'Error occurred!';
      });
  }
}
