const {Schema, model} = require("mongoose");
const passMongoose = require('passport-local');
const bcrypt = require('bcryptjs');

const schema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
const User = model('User', schema);
module.exports = User;
module.exports.hashPassword = async (password) => {
    try{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch(err){
        throw new Error('Hashing failure', err);
    }
}