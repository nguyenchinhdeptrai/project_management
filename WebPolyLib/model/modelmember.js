const mongoose = require('mongoose');

const dataMemberSchema = new mongoose.Schema(
    { 
        memberID: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        img: { type: String, required: true },
        
    },

);

const MemberModel = mongoose.model('member', dataMemberSchema);
module.exports = MemberModel;
