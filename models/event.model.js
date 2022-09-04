const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    event_title: {type: String, required: true},
    addr_to: {type: String, required: true},
    ref_from: {type: String, required: true},
    description: {type: String, required: true},
    
    imgurl:[{type: String}], 
    
    date_publ: { type: Date, default: Date.now },
    date_occurence: [{ type: Date, default: Date.now }],
    date_expr: { type: Date, required: true },
    priority: { type: String, required: true},

    publ_by: {type: String, required: true},
    publ_by_desig: {type: String, required: true},

    isActive: {type: Boolean, required: true}, 

    schoolId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    // userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


const Event = mongoose.model('Event', eventSchema);
module.exports = Event;

