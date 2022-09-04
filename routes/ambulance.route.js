const express = require('express');
const router = express.Router();
const createError = require('http-errors');

//Models 
const User = require('../models/user.model');
const Address = require('../models/address.model');
const Ambulance = require('../models/ambulance.model');

//Schemas
const { addressSchema, ambulanceSchema } = require('../utils/validaton_schema');
const { verifyAccessToken } = require('../utils/jwt_actions');


router.post('/', verifyAccessToken, async (req, res, next) => {    
    console.log("amb route");
    try{
        const result = await ambulanceSchema.validateAsync(req.body);
        // console.log(result);
        const amb = await new Ambulance(result);
        const savedAmbulance = await amb.save();

        res.send({
            ambulance: savedAmbulance
        });
    }catch (err){
        next(err);
    }
});








module.exports = router;