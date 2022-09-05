const mongoose = require('mongoose');


const sectionSchema = new mongoose.Schema({    
    
    name: {type: String, required: true},
    description: {type: String},
    
    sessionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true},
    schoolId: {type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true},

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;

