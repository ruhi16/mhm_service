const express = require('express');
const router = express.Router();
const createError = require('http-errors');

//Models 
const User = require('../models/user.model');
const Address = require('../models/address.model');
const Ambulance = require('../models/ambulance.model');

//Validation Schemas
const { addressSchema, ambulanceSchema } = require('../utils/validaton_schema');
const { verifyAccessToken } = require('../utils/jwt_actions');



router.post('/', verifyAccessToken, async (req, res, next)=>{    
    console.log('payload', req.payload);
    try{
        const user = await User.findOne({_id: req.payload.aud}).exec();
        
        const result = await addressSchema.validateAsync(req.body);
        const addr = await new Address(result);
        addr.userId = req.payload.aud;
        console.log("address:", req.body);
        const savedAddr = await addr.save();
        // const us = await User.findOne({_id: '612f41e7febd9a90421f7521'}).populate('address');
        
        res.send({
            addr: savedAddr,
        });

    }catch(err){
        console.log(err.message);
        next(err);
    }
});



router.get('/', async (req, res, next)=>{    
    try{
        const address = await Address.find({})
                .populate({ path:'userId', model:'User', 
                            select: {firstname: 1, lastname: 1, email: 1}})
                            .select({pin:0});
            
        res.send({
            address          
        });

    }catch(err){
        next(err);
    }
});






module.exports = router;