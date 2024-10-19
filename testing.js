let padded_m_str = "12345678";
let N_str = "1234";


// Encryption
// Determine how many blocks are to be encrypted separately
let en_blocks = Math.ceil(padded_m_str.length / (N_str.length - 1));
console.log("Amount of blocks:", en_blocks);

let cur_block = "";
let en_output = en_blocks.toString().padStart(3, '0');
console.log("Blocks:");
for (let i = 0; i < en_blocks; i++) {
  // Get current block
  if (i === en_blocks - 1) {
    cur_block = padded_m_str.substring(i * (N_str.length - 1));
  } else {
    cur_block = padded_m_str.substring(i * (N_str.length - 1), (i + 1) * (N_str.length - 1));
  }
  console.log(cur_block);
  // Encrypt block and add to output string
  en_output += cur_block;
}

// Add block information to encrypted string
// Send output to user
console.log(en_output);
let c_str = en_output;
let de_output = "";

// Decryption
// Determine how many blocks there are to be decrypted seperately from input string
let de_blocks = parseInt(c_str.substring(0, 3));
console.log("Amount of blocks to decrypt: ", de_blocks);

console.log("Blocks:");
for (let i = 0; i < de_blocks; i++) {
  // Get current block
  if (i === de_blocks - 1) {
    cur_block = c_str.substring(i * (N_str.length - 1) + de_blocks);
  } else {
    cur_block = c_str.substring(i * (N_str.length - 1) + de_blocks, (i + 1) * (N_str.length - 1) + de_blocks);
  }
  console.log(cur_block);
  // Decrypt block and add to output string
  de_output += cur_block;
}

console.log("Decrypted:");
// Send output to user
console.log(de_output);
