const mongoose = require('mongoose');


const schoolSchema = new mongoose.Schema({
    name: {type: String, required: true},
    dise: {type: String},
    grade: {type: String, required: true},
    schedule_time: {type: String, required: true}, // 10:30am to 4:30pm
    vill: {type: String},
    post: {type: String},
    ps: {type: String},
    dist: {type: String},
    pin: {type: String},
    email: {type: String, required: true, lowercase: true},
    mobile: [{type: String, required: true}],
    imgurl: [{type: String}],

    sessionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Session'},
    
    headmasterId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},   
    asstheadmasterId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},   
    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


const School = mongoose.model('School', schoolSchema);
module.exports = School;

