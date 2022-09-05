const mongoose = require('mongoose');


const galarySchema = new mongoose.Schema({
    img_title: {type: String, required: true},
    img_url: {type: String, required: true},

    description: {type: String, required: true},    
    date_publ: { type: Date, default: Date.now },
    priority: { type: String, required: true},

    isActive: {type: Boolean, required: true},

    publ_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    // publ_by_desig: {type: String, required: true},

    schoolId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    // userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


const Galary = mongoose.model('Galary', galarySchema);
module.exports = Galary;

