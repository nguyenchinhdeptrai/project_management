const mongoose = require('mongoose');

const dataUserSchema = new mongoose.Schema(
    { 
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        status: { type: String, },
        password: { type: String, },
        img: { type: String, required: true },
        
    },

);

const UserModel = mongoose.model('user', dataUserSchema);
module.exports = UserModel;
