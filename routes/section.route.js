const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const nodemailer = require('nodemailer');

// const User = require('../models/user.model');

const Section = require('../models/section.model');



const { 
    sectionRegisterSchema, 
    sectionUpdateSchema,
    sectionDeleteSchema,
} = require('../utils/school_validation_schema');



router.get('/:id', async(req, res, next)=>{
    try{
        const sections = await Section.findById(req.params.id);
       
        if(!sectiones){
            throw createError.Conflict(`There is no section with id ${req.params.id}.`);
        }

        res.send({
            sections: sections,
        });

    }catch(error){

        console.log(error.message);
        next(error);
    }
});


router.get('/', async(req, res, next)=>{
try{
        const sections = await Section.find({});        
        // console.log('sectione: '+ sectiones);

        if(!sections){
            throw createError.Conflict(`There is no sectione exists.`);
        }

        res.send({
            sections: sections,

        });

    }catch(error){
        
        console.log(error.message);
        next(error);
    }
});


router.post('/', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await sectionRegisterSchema.validateAsync(req.body);

        const doesExists = await Section.findOne({name: result.name});
        // console.log(doesExists);
        if(doesExists){
            throw createError.Conflict(`This section name '${result.name}' has been already taken.`);
        }

        const sections = await new Section(result);        
        const savedsections = await sections.save();

        // console.log(sectione);
        res.send({
            sectiones: savedsections
            
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
        const result = await sectionUpdateSchema.validateAsync(req.body);

        const updatedsections = await Section.findOneAndUpdate({_id: result._id}, result, {new: true})
                            .select({"name": 1});

        // console.log(updatedUser);
        if(!updatedsections){
            throw createError.Conflict(`This sections name '${result.name}' does not exists.`);
        }
        
        // console.log(updatedUser);
        res.send({
            sections : updatedsections
            
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
        const result = await sectionDeleteSchema.validateAsync(req.body);

        const deletedsections = await Section.findOneAndDelete({_id: result._id})
                                .select({"name": 1});
        // console.log(deletedsectione);
        if(!deletedsections){
            throw createError.Conflict(`This section '${result.name}' does not exists.`);
        }

        
        // console.log(deletedsectione);

        res.send({
            sections : deletedsections
            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }

});


module.exports = router