const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const Schoolbody = require('../models/schoolbody.model');

const { 
    schoolbodyRegisterSchema, 
    schoolbodyUpdateSchema,
    schoolbodyDeleteSchema,
} = require('../utils/school_validation_schema');



router.get('/schoolbodys/:id', async(req, res, next)=>{
    try{
        const schoolbody = await Schoolbody.findById(req.params.id);
        // console.log('schoolbody: '+ req.params.id);
        // console.log('schoolbody: '+ schoolbody);

        if(!schoolbody){
            throw createError.Conflict(`There is no schoolbody title with id ${req.params.id}.`);
        }

        res.send({
            schoolbody: schoolbody,
        });

    }catch(error){

        console.log(error.message);
        next(error);
    }
});


router.get('/schoolbodys', async(req, res, next)=>{
try{
        const schoolbodys = await Schoolbody.find({});        
        // console.log('schoolbody: '+ schoolbodys);

        if(!schoolbodys){
            throw createError.Conflict(`There is no schoolbody title exists.`);
        }

        res.send({
            schoolbody: schoolbodys,

        });

    }catch(error){
        
        console.log(error.message);
        next(error);
    }
});


router.post('/schoolbodys', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await schoolbodyRegisterSchema.validateAsync(req.body);

        const doesExists = await Schoolbody.findOne({body_name: result.body_name, member_desig: result.member_desig});
        
        // console.log(doesExists);
        if(doesExists){
            throw createError.Conflict(`This schoolbody title '${result.body_name}', '${result.member_desig}' has been already taken.`);
        }

        const schoolbody = await new Schoolbody(result);        
        const savedschoolbody = await schoolbody.save();

        // console.log(schoolbody);
        res.send({
            schoolbodys : savedschoolbody
            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }
});


router.put('/schoolbodys', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await schoolbodyUpdateSchema.validateAsync(req.body);

        const updatedschoolbody = await Schoolbody.findOneAndUpdate({_id: result._id}, result, {new: true})
                            .select({"body_name": 1, "member_name": 1, "member_desig": 1});
        // console.log(updatedUser);
        if(!updatedschoolbody){
            throw createError.Conflict(`This schoolbody title '${result.schoolbody_title}' does not exists.`);
        }

        
        // console.log(updatedUser);

        res.send({
            schoolbodys : updatedschoolbody
            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }
});


router.delete('/schoolbodys', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await schoolbodyDeleteSchema.validateAsync(req.body);

        const deletedschoolbody = await Schoolbody.findOneAndDelete({_id: result._id})
                                    .select({"body_name": 1, "member_name": 1, "member_desig": 1});
        // console.log(deletedschoolbody);
        if(!deletedschoolbody){
            throw createError.Conflict(`This schoolbody title '${result.body_name}' '${result.member_name}' does not exists.`);
        }

        
        // console.log(deletedschoolbody);

        res.send({
            schoolbodys : deletedschoolbody
            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }
});


module.exports = router