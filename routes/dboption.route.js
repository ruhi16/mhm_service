const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const Dboption = require('../models/dboption.model');

const { 
    dboptionRegisterSchema,
    dboptionUpdateSchema, 
    dboptionDeleteSchema,
    
} = require('../utils/school_validation_schema');


router.get('/:id', async(req, res, next)=>{
    try{
        const dboption = await Dboption.findById(req.params.id);
        // console.log('dboption: '+ req.params.id);
        // console.log('dboption: '+ dboption);

        if(!dboption){
            throw createError.Conflict(`There is no dboption with id ${req.params.id}.`);
        }

        res.send({
            dboption: dboption,

        });

    }catch(error){

        console.log(error.message);
        next(error);
    }

});


router.get('/', async(req, res, next)=>{
try{
        const dboptions = await Dboption.find({});        
        // console.log('dboption: '+ dboptions);

        if(!dboptions){
            throw createError.Conflict(`There is no dboption exists.`);
        }

        res.send({
            dboption: dboptions,

        });

    }catch(error){
        
        console.log(error.message);
        next(error);
    }
});


router.post('/', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await dboptionRegisterSchema.validateAsync(req.body);

        const doesExists = await Dboption.findOne({title: result.title});
        
        console.log(doesExists);
        if(doesExists){
            throw createError.Conflict(`This dboption '${result.title}' has been already taken.`);
        }

        const dboption = await new Dboption(result);        
        const saveddboption = await dboption.save();

        // console.log(dboption);
        res.send({
            dboptions : saveddboption            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }
});


router.put('/', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await dboptionUpdateSchema.validateAsync(req.body);

        const updateddboption = await Dboption.findOneAndUpdate({_id: result._id}, result, {new: true})
                            .select({"title": 1, "description": 1});
        // console.log(updatedUser);
        if(!updateddboption){
            throw createError.Conflict(`This dboption '${result.title}' does not exists.`);
        }

        
        // console.log(updatedUser);
        res.send({
            dboptions : updateddboption            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }
});


router.delete('/', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await dboptionDeleteSchema.validateAsync(req.body);

        const deleteddboption = await Dboption.findOneAndDelete({_id: result._id})
                            .select({"title": 1, "description": 1});

        // console.log(deleteddboption);
        if(!deleteddboption){
            throw createError.Conflict(`This dboption '${result.title}' does not exists.`);
        }

        
        // console.log(deleteddboption);
        res.send({
            dboptions : deleteddboption            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }
});





module.exports = router