const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const nodemailer = require('nodemailer');

// const User = require('../models/user.model');

const Studentcr = require('../models/studebtcr.model');



const { 
    studentcrRegisterSchema, 
    studentcrUpdateSchema,
    studentcrDeleteSchema,
} = require('../utils/school_validation_schema');



router.get('/:id', async(req, res, next)=>{
    try{
        const student = await Studentcr.findById(req.params.id);
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
        const students = await Studentcr.find({});        
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
        const result = await studentcrRegisterSchema.validateAsync(req.body);

        const doesExists = await Studentcr.findOne({email: result.email});
        // console.log(doesExists);
        if(doesExists){
            throw createError.Conflict(`This student email '${result.email}' has been already taken.`);
        }

        const student = await new Studentcr(result);        
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
        const result = await studentcrUpdateSchema.validateAsync(req.body);

        const updatedstudent = await Studentcr.findOneAndUpdate({_id: result._id}, result, {new: true})
                            .select({"class": 1, "section": 1, "roll_no": 1, "studentId": 1, "sessionId": 1});
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
        const result = await studentcrDeleteSchema.validateAsync(req.body);

        const deletedstudent = await Studentcr.findOneAndDelete({_id: result._id})
                            .select({"class": 1, "section": 1, "roll_no": 1, "studentId": 1, "sessionId": 1});
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