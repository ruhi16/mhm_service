const mongoose = require('mongoose');


const noticeSchema = new mongoose.Schema({
    noticeTitle: {type: String, required: true},
    addr_to: {type: String, required: true},
    ref_from: {type: String, required: true},
    description: {type: String, required: true},
    
    imgurl:[{type: String}], 
    
    date_publ: { type: Date, required: true, default: Date.now },
    date_expr: { type: Date, required: true },
    priority: { type: String, required: true},

    publ_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},    
    publ_by_desig: {type: String, required: true},

    isActive: {type: Boolean, required: true}, 

    schoolId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    // userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


const Notice = mongoose.model('Notice', noticeSchema);
module.exports = Notice;

