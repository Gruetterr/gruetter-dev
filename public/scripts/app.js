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

  // Send the input to the server
  fetch(`/runRsaEn?N_str=${N_str}&e_str=${e_str}&m_str=${m_str}`)
    .then(response => response.text())
    .then(data => {
      // Display the result in the output paragraph
      document.getElementById('c_out').value = data;
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('c_out').value = 'Error occurred!';
    });
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
      // Display the result in the output paragraph
      document.getElementById('m_out').value = data;
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('m_out').value = 'Error occurred!';
    });
}
