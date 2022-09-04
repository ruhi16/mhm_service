const mongoose = require('mongoose');


const dboptionSchema = new mongoose.Schema({
    title: {type: String, required: true},    
    img_url:{type: String, required: true}, 

    description: { type: String, required: true},
    type: { type: String, required: true},

    priority: { type: String, required: true},

    isActive: {type: Boolean, required: true}, 

    schoolId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},    

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


const Dboption = mongoose.model('Dboption', dboptionSchema);
module.exports = Dboption;

