const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const School = require('../models/school.model');

const { 
    schoolRegisterSchema,
    schoolUpdateSchema, 
    schoolDeleteSchema,
    
} = require('../utils/school_validation_schema');


router.get('/:id', async(req, res, next)=>{
    try{
        const school = await School.findById(req.params.id);
        // console.log('School: '+ req.params.id);
        // console.log('School: '+ school);

        if(!school){
            throw createError.Conflict(`There is no school with id ${req.params.id}.`);
        }

        res.send({
            school: school,

        });

    }catch(error){

        console.log(error.message);
        next(error);
    }

});


router.get('/', async(req, res, next)=>{
try{
        const schools = await School.find({});        
        // console.log('School: '+ schools);

        if(!schools){
            throw createError.Conflict(`There is no school exists.`);
        }

        res.send({
            school: schools,

        });

    }catch(error){
        
        console.log(error.message);
        next(error);
    }
});


router.post('/', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await schoolRegisterSchema.validateAsync(req.body);

        const doesExists = await School.findOne({email: result.email});
        // console.log(doesExists);
        if(doesExists){
            throw createError.Conflict(`This email '${result.email}' has been already taken.`);
        }

        const school = await new School(result);
        school.vill = "abcd";
        const savedSchool = await school.save();



        // console.log(school);

        res.send({
            schools : savedSchool
            
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
        const result = await schoolUpdateSchema.validateAsync(req.body);

        const updatedUser = await School.findOneAndUpdate({_id: result._id}, result, {new: true})
                            .select({"name": 1, "email": 1})
        // console.log(updatedUser);
        if(!updatedUser){
            throw createError.Conflict(`This school '${result.name}' does not exists.`);
        }

        
        // console.log(updatedUser);

        res.send({
            schools : updatedUser
            
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
        const result = await schoolDeleteSchema.validateAsync(req.body);

        const deletedSchool = await School.findOneAndDelete({_id: result._id})
                            .select({"name": 1, "email": 1});
        // console.log(deletedSchool);
        if(!deletedSchool){
            throw createError.Conflict(`This email '${result.email}' does not exists.`);
        }

        
        // console.log(deletedSchool);

        res.send({
            schools : deletedSchool
            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }

});





module.exports = router