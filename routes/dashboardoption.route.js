const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const Session = require('../models/session.model');
const School = require('../models/school.model');
const Teacher = require('../models/teacher.model');

const Option = require('../models/dboption.model');



const { 
    sessionRegisterSchema, 
    sessionUpdateSchema,
    sessionDeleteSchema,
} = require('../utils/school_validation_schema');




router.get('/:schoolId', async(req, res, next)=>{

    try{
        const school = await School.findById(req.params.schoolId);    
        // console.log('School: '+ school.name);

        if(!school){
            throw createError.Conflict(`There is no school with id ${req.params.schoolId}.`);        
        }

        const teachers = await Teacher.find({schoolId: req.params.schoolId});
        // console.log('Teacher:'+ teachers);

        
        const options = await Option.find({schoolId: req.params.schoolId});
        // console.log('Options:'+ options);

        res.send({
            school: school,
            teachers: teachers,
            options: options
        });

    }catch(error){
        
        console.log(error.message);
        next(error);
    }
});




module.exports = router