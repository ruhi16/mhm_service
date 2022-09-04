const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    imgurl:[{type: String}], 
    
    vill: {type: String},
    post: {type: String},
    ps: {type: String},
    dist: {type: String},
    pin: {type: String},
    
    fathername: {type: String, required: true},
    mothername: {type: String, required: true},
    
    email: {type: String, lowercase: true},
    mobile: [{type: String, required: true}],

    student_id: {type: String},
    dob: { type: Date },
    adhaar: {type: String},

    bankname: {type: String},
    branchname: {type: String},
    ifsc: {type: String},
    accountno: {type: String},

    schoolId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


const Student = mongoose.model('Student', studentSchema);
module.exports = Student;

