const mongoose = require('mongoose');


const teacherSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    imgurl:[{type: String}], 
    emp_id: {type: String},
    vill: {type: String},
    post: {type: String},
    ps: {type: String},
    dist: {type: String},
    pin: {type: String},
    email: {type: String, required: true, lowercase: true},
    mobile: [{type: String, required: true}],

    hqual: {type: String},
    prof_qual:[{type: String}],
    subject: [{type: String}],
    dob: { type: Date },
    doj: { type: Date },
    dor: { type: Date },
    
    adhaar: {type: String},
    pan: {type: String},

    schoolId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;

