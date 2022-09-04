const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    pin: {type:String, required: true},
    ps:  {type:String, required: true},
    po: {type:String, required: true},
    location: [{type:String}],    
    dist: {type:String, required:true},
    state: {type:String, required:true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
