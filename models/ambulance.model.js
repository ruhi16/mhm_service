const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    inst_name: {type: String, required: true}, 
    base_addr_id: [{type: mongoose.Schema.Types.ObjectId, ref: "Address"}],
    dest_addr_id: [{type: mongoose.Schema.Types.ObjectId, ref: "Address"}],
    car_type: {type: String, required: true},
    car_model: {type: String, required: true},
    car_no: {type: String, required: true},
    services: [{type: String}],
    image_url: [{type: String}],
    drivers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    curr_status: {type: Boolean, required: true, deault: false},
    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


const Ambulance = mongoose.model('Ambulance', ambulanceSchema);
module.exports = Ambulance;