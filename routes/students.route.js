const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const nodemailer = require('nodemailer');

// const User = require('../models/user.model');

const Student = require('../models/student.model');



const { 
    studentRegisterSchema, 
    studentUpdateSchema,
    studentDeleteSchema,
} = require('../utils/school_validation_schema');



router.get('/:id', async(req, res, next)=>{
    try{
        const student = await Student.findById(req.params.id);
        // console.log('student: '+ req.params.id);
        // console.log('student: '+ student);

        if(!student){
            throw createError.Conflict(`There is no student with id ${req.params.id}.`);
        }

        res.send({
            student: student,
        });

    }catch(error){

        console.log(error.message);
        next(error);
    }
});


router.get('/', async(req, res, next)=>{
try{
        const students = await Student.find({});        
        // console.log('student: '+ students);

        if(!students){
            throw createError.Conflict(`There is no student exists.`);
        }

        res.send({
            student: students,

        });

    }catch(error){
        
        console.log(error.message);
        next(error);
    }
});


router.post('/', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await studentRegisterSchema.validateAsync(req.body);

        const doesExists = await Student.findOne({email: result.email});
        // console.log(doesExists);
        if(doesExists){
            throw createError.Conflict(`This student email '${result.email}' has been already taken.`);
        }

        const student = await new Student(result);        
        const savedStudent = await student.save();



        // console.log(student);

        res.send({
            students : savedStudent
            
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
        const result = await studentUpdateSchema.validateAsync(req.body);

        const updatedstudent = await Student.findOneAndUpdate({_id: result._id}, result, {new: true})
                            .select({"firstname": 1, "lastname": 1, "fathername": 1, "email": 1});
        // console.log(updatedUser);
        if(!updatedstudent){
            throw createError.Conflict(`This student email '${result.email}' does not exists.`);
        }

        
        // console.log(updatedUser);

        res.send({
            students : updatedstudent
            
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
        const result = await studentDeleteSchema.validateAsync(req.body);

        const deletedstudent = await Student.findOneAndDelete({_id: result._id})
                            .select({"firstname": 1, "lastname": 1, "fathername": 1, "email": 1});
        // console.log(deletedstudent);
        if(!deletedstudent){
            throw createError.Conflict(`This student '${result.firstname}' '${result.lastname}' does not exists.`);
        }

        
        // console.log(deletedstudent);

        res.send({
            students : deletedstudent
            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }

});


module.exports = router