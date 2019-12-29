// 1 imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// 2 Define schema
const userSchema = new Schema({
    email: String,
    username: String,
    password: String
    }, {
        timestamps: {
            createdAt: 'createdAt', 
            updatedAt: 'updatedAt' 
        }
});

// 4 Export model
const User = mongoose.model('user', userSchema);

module.exports = User
module.exports.hashPassword = async password => {
    try {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    } catch(error){
        throw new Error('Hashing failed', error)
    }
}

