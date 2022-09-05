const mongoose = require('mongoose');


const classSchema = new mongoose.Schema({    
    
    name: {type: String, required: true},
    description: {type: String},
    
    index: {type: Number, required: true},

    sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}],
    
    sessionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true},
    schoolId: {type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true},

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


const Class = mongoose.model('Class', classSchema);
module.exports = Class;

