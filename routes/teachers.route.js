const express = require('express');
const router = express.Router();
const createError = require('http-errors');


const Teacher = require('../models/teacher.model');

const { 
    teacherRegisterSchema, 
    teacherUpdateSchema,
    teacherDeleteSchema,
} = require('../utils/school_validation_schema');



router.get('/teachers/:id', async(req, res, next)=>{
    try{
        const teacher = await Teacher.findById(req.params.id);
        // console.log('teacher: '+ req.params.id);
        // console.log('teacher: '+ teacher);

        if(!teacher){
            throw createError.Conflict(`There is no teacher with id ${req.params.id}.`);
        }

        res.send({
            teacher: teacher,
        });

    }catch(error){

        console.log(error.message);
        next(error);
    }
});


router.get('/teachers', async(req, res, next)=>{
try{
        const teachers = await Teacher.find({});        
        // console.log('teacher: '+ teachers);

        if(!teachers){
            throw createError.Conflict(`There is no teacher exists.`);
        }

        res.send({
            teacher: teachers,

        });

    }catch(error){
        
        console.log(error.message);
        next(error);
    }
});


router.post('/teachers', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await teacherRegisterSchema.validateAsync(req.body);

        const doesExists = await Teacher.findOne({email: result.email});
        // console.log(doesExists);
        if(doesExists){
            throw createError.Conflict(`This teacher email '${result.email}' has been already taken.`);
        }

        const teacher = await new Teacher(result);        
        const savedTeacher = await teacher.save();



        // console.log(teacher);

        res.send({
            teachers : savedTeacher
            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }


});


router.put('/teachers', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await teacherUpdateSchema.validateAsync(req.body);

        const updatedTeacher = await Teacher.findOneAndUpdate({_id: result._id}, result, {new: true})
                            .select({"firstname": 1, "lastname": 1, "email": 1, "mobile": 1});
        // console.log(updatedUser);
        if(!updatedTeacher){
            throw createError.Conflict(`This teacher email '${result.email}' does not exists.`);
        }

        
        // console.log(updatedUser);

        res.send({
            teachers : updatedTeacher
            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }
});


router.delete('/teachers', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await teacherDeleteSchema.validateAsync(req.body);

        const deletedteacher = await Teacher.findOneAndDelete({_id: result._id})
                            .select({"firstname": 1, "lastname": 1, "email": 1, "mobile": 1});
        // console.log(deletedteacher);
        if(!deletedteacher){
            throw createError.Conflict(`This teacher '${result.firstname}' '${result.lastname}' does not exists.`);
        }

        
        // console.log(deletedteacher);

        res.send({
            teachers : deletedteacher
            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }

});


module.exports = router