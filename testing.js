data = "72101108108111";

let padVal = 3 - data.length % 3;
if (padVal === 3) padVal = 0;
data = data.padStart(padVal + data.length, '0');

let decoded_m_out = "";
for (let i = 0; i < data.length; i += 3) {
  let ascii = data.substring(i, i + 3);
  decoded_m_out += String.fromCharCode(parseInt(ascii, 10));
}
console.log(decoded_m_out);
