const mongoose = require('mongoose');


const studentcrSchema = new mongoose.Schema({
    
    studentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
    class: {type: String, required: true},
    section: {type: String, required: true},
    roll_no: {type: String, required: true},
    
    sessionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Session'},
    schoolId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},

    //userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


const Studentcr = mongoose.model('Studentcr', studentcrSchema);
module.exports = Studentcr;

