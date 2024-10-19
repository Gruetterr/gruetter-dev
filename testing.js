//
//
//// Encryption
//// Determine how many blocks are to be encrypted separately
//let en_blocks = Math.ceil(padded_m_str.length / (N_str.length - 1));
//console.log("Amount of blocks:", en_blocks);
//
//let cur_block = "";
//let en_output = en_blocks.toString().padStart(3, '0');
//console.log("Blocks:");
//for (let i = 0; i < en_blocks; i++) {
//  // Get current block
//  if (i === en_blocks - 1) {
//    cur_block = padded_m_str.substring(i * (N_str.length - 1));
//  } else {
//    cur_block = padded_m_str.substring(i * (N_str.length - 1), (i + 1) * (N_str.length - 1));
//  }
//  console.log(cur_block);
//  // Encrypt block and add to output string
//  en_output += cur_block;
//}
//
//// Add block information to encrypted string
//// Send output to user
//console.log(en_output);
//let c_str = en_output;
//let de_output = "";
//
//// Decryption
//// Determine how many blocks there are to be decrypted seperately from input string
//let de_blocks = parseInt(c_str.substring(0, 3));
//console.log("Amount of blocks to decrypt: ", de_blocks);
//
//console.log("Blocks:");
//for (let i = 0; i < de_blocks; i++) {
//  // Get current block
//  if (i === de_blocks - 1) {
//    cur_block = c_str.substring(i * (N_str.length - 1) + de_blocks);
//  } else {
//    cur_block = c_str.substring(i * (N_str.length - 1) + de_blocks, (i + 1) * (N_str.length - 1) + de_blocks);
//  }
//  console.log(cur_block);
//  // Decrypt block and add to output string
//  de_output += cur_block;
//}
//
//console.log("Decrypted:");
//// Send output to user
//console.log(de_output);

data = "418678340741592142997624313015065099525060143833324077065892184228769472304285906907963735194108260165775883078898431003841729966127319990766300437706212821022730097719328929845584320790877375756165349893178060369404806758578083301226879327254205801199620965731182265465303267081736857853527236686221543180029482045134835242364129987050114675119539928652324436016867876618221403202200455760307593476409710748960833192466618091035423985072053788911164798714856602094160699799642791685946797767047404416752685058693097495329667500321603916781700670563642832430621070015047336163077303822120373749937621303178664268546";

N_str = "4332995680498011897832382744950910579136751699988546127098216061275987342780644049929867078439524010108497791745627511260110583901486234348261382712728696282527584984859405524908647544866934427033125033474716942005054308174486823784356587116079253477906132975583314728191578113989479940836692585761795348876216197246983664310920605733242598778171250008716401113968561148264631821882525983231382825291418196258631474993552177243463526690144693979846798361461249177989345704919745578180840599411994157298180220830675595595030163823744542457073004723094959368198888252970422108160374534138794759834047526955892685640279";

if (data.length < N_str.length) {
  console.log("Data.length is ", N_str.length - data.length, " smaller than N_str, length, padding");
  data = data.padStart(N_str.length, '0');
  console.log("padded: ", data);
}
