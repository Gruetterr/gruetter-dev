// Sum function (testing only)
function calculateSum() {
  // Get the values from the input fields
  const x = document.getElementById('x').value;
  const y = document.getElementById('y').value;

  // Send the input to the server
  fetch(`/run?x=${x}&y=${y}`)
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