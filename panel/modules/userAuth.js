const bcrypt = require('bcrypt');

// Hash password
async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

// Compare passwords
async function comparePasswords(password, hashedPassword) {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
}

module.exports = {
    hashPassword,
    comparePasswords
};