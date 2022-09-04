const mongoose = require('mongoose');


const DashboardOptionSchema = new mongoose.Schema({
    title: {type: String, required: true},
    img_url: {type: String, required: true},        

    isActive: {type: Boolean, required: true},
    
    description: {type: String },    
    priority: { type: String, required: true},

    option_type: { type: String, required: true},   //card or service or info

    schoolId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    
            
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


const DashboardOption = mongoose.model('DashboardOption', DashboardOptionSchema);
module.exports = DashboardOption;

