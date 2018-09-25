const {SHA256} = require('crypto-js'); //Taking .SHA256 from crypto-js and setting as variable name too
const  jwt = require('jsonwebtoken');

var data = {
    id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);
var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
// //console.log(`Message before hash ${message}\nAfter hash ${hash}`);

// var data = {
//     id: 4 
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString() //Converts object to string then hashes it and stores hash as string
// };

// token.data.id = 5; // Changing ID
// token.hash = SHA256(JSON.stringify(token.data)) // Updating hash in token for new ID without knowing the "salt" phrase will be off from resultHash

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString(); // Hashing token data the same way with salt phrase to check its the expected value
// if(resultHash === token.hash){
//     console.log('Data not changed');
// } else{
//     console.log('Data was changed');
// }