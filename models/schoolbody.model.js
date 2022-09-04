const mongoose = require('mongoose');


const schoolbodySchema = new mongoose.Schema({
    body_name: {type: String, required: true},
    member_name: {type: String, required: true},    
    member_img_url:[{type: String}], 
    member_desig: {type: String, required: true},
    member_isActive: {type: Boolean, required: true},
    member_desc: {type: String, required: true},    
    
    
    member_doj: { type: Date, required:true, default: Date.now },
    member_doe: { type: Date, required: true },
    member_priority: { type: String, required: true},

    schoolId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    // userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


const SchoolBody = mongoose.model('SchoolBody', schoolbodySchema);
module.exports = SchoolBody;

