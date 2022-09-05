const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const nodemailer = require('nodemailer');

// const User = require('../models/user.model');

const Class = require('../models/class.model');



const { 
    classRegisterSchema, 
    classUpdateSchema,
    classDeleteSchema,
} = require('../utils/school_validation_schema');



router.get('/:id', async(req, res, next)=>{
    try{
        const classes = await Class.findById(req.params.id);
       
        if(!classes){
            throw createError.Conflict(`There is no Class with id ${req.params.id}.`);
        }

        res.send({
            classes: classes,
        });

    }catch(error){

        console.log(error.message);
        next(error);
    }
});


router.get('/', async(req, res, next)=>{
try{
        const classes = await Class.find({});        
        // console.log('classe: '+ classes);

        if(!classes){
            throw createError.Conflict(`There is no classe exists.`);
        }

        res.send({
            classes: classes,

        });

    }catch(error){
        
        console.log(error.message);
        next(error);
    }
});


router.post('/', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await classRegisterSchema.validateAsync(req.body);

        const doesExists = await Class.findOne({name: result.name});
        // console.log(doesExists);
        if(doesExists){
            throw createError.Conflict(`This class name '${result.name}' has been already taken.`);
        }

        const classes = await new Class(result);        
        const savedclasses = await classes.save();

        // console.log(classe);
        res.send({
            classes: savedclasses
            
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
        const result = await classUpdateSchema.validateAsync(req.body);

        const updatedclasses = await Class.findOneAndUpdate({_id: result._id}, result, {new: true})
                            .select({"name": 1, "index": 1, "sections": 1});

        // console.log(updatedUser);
        if(!updatedclasses){
            throw createError.Conflict(`This classes name '${result.name}' does not exists.`);
        }
        
        // console.log(updatedUser);
        res.send({
            classes : updatedclasses
            
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
        const result = await classDeleteSchema.validateAsync(req.body);

        const deletedclasses = await Class.findOneAndDelete({_id: result._id})
                                .select({"name": 1, "index": 1, "sections": 1});
        // console.log(deletedclasse);
        if(!deletedclasses){
            throw createError.Conflict(`This classes '${result.name}' does not exists.`);
        }

        
        // console.log(deletedclasse);

        res.send({
            classes : deletedclasses
            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }

});


module.exports = router