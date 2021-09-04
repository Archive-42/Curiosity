const bcrypt = require('bcryptjs');

// Hashing a password
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('password', salt);
// console.log(hash);

// Checking a password
console.log(bcrypt.compareSync('password', hash));
console.log(bcrypt.compareSync('passwordz', hash));
