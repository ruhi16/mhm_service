const mongoose = require('mongoose');


const sessionSchema = new mongoose.Schema({
    session_title: {type: String, required: true},
    session_img_url: {type: String, required: true},
    
    description: {type: String, required: true},    
    
    isActive: {type: Boolean, required: true},

    // schoolId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    // userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;

