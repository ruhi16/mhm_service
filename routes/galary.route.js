const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const Galary = require('../models/galary.model');

const { 
    galaryRegisterSchema,
    galaryUpdateSchema, 
    galaryDeleteSchema,
    
} = require('../utils/school_validation_schema');


router.get('/:id', async(req, res, next)=>{
    try{
        const galary = await Galary.findById(req.params.id);
        // console.log('galary: '+ req.params.id);
        // console.log('galary: '+ galary);

        if(!galary){
            throw createError.Conflict(`There is no image in galary with id ${req.params.id}.`);
        }

        res.send({
            galary: galary,

        });

    }catch(error){

        console.log(error.message);
        next(error);
    }
});


router.get('/', async(req, res, next)=>{
try{
        const galarys = await Galary.find({});        
        // console.log('galary: '+ galarys);

        if(!galarys){
            throw createError.Conflict(`There is no images in galary exists.`);
        }

        res.send({
            galary: galarys,

        });

    }catch(error){
        
        console.log(error.message);
        next(error);
    }
});


router.post('/', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await galaryRegisterSchema.validateAsync(req.body);

        const doesExists = await Galary.findOne({img_title: result.img_title});
        
        console.log(doesExists);
        if(doesExists){
            throw createError.Conflict(`This galary with image title '${result.img_title}' has been already taken.`);
        }

        const galary = await new Galary(result);        
        const savedGalary = await galary.save();

        // console.log(galary);
        res.send({
            galarys : savedGalary            
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
        const result = await galaryUpdateSchema.validateAsync(req.body);

        const updatedGalary = await Galary.findOneAndUpdate({_id: result._id}, result, {new: true})
                            .select({"img_title": 1,"img_url": 1, "description": 1});
        // console.log(updatedUser);
        if(!updatedGalary){
            throw createError.Conflict(`This galary with image title '${result.img_title}' does not exists.`);
        }

        
        // console.log(updatedUser);
        res.send({
            galarys : updatedGalary            
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
        const result = await galaryDeleteSchema.validateAsync(req.body);

        const deletedGalary = await Galary.findOneAndDelete({_id: result._id})
                                .select({"img_title": 1,"img_url": 1, "description": 1});

        // console.log(deletedGalary);
        if(!deletedGalary){
            throw createError.Conflict(`This galary with image title '${result.img_title}' does not exists.`);
        }

        
        // console.log(deletedgalary);
        res.send({
            galarys : deletedGalary            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }
});





module.exports = router