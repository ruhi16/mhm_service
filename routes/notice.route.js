const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const nodemailer = require('nodemailer');

const User = require('../models/user.model');

const Notice = require('../models/notice.model');



const { 
    noticeRegisterSchema, 
    noticeUpdateSchema,
    noticeDeleteSchema,
} = require('../utils/school_validation_schema');



router.get('/notices/:id', async(req, res, next)=>{
    try{
        const notice = await Notice.findById(req.params.id);
        // console.log('notice: '+ req.params.id);
        // console.log('notice: '+ notice);

        if(!notice){
            throw createError.Conflict(`There is no notice with id ${req.params.id}.`);
        }

        res.send({
            notice: notice,

        });

    }catch(error){

        console.log(error.message);
        next(error);
    }

});


router.get('/notices', async(req, res, next)=>{
try{
        const notices = await Notice.find({});        
        // console.log('notice: '+ notices);

        if(!notices){
            throw createError.Conflict(`There is no notice exists.`);
        }

        res.send({
            notice: notices,

        });

    }catch(error){
        
        console.log(error.message);
        next(error);
    }
});


router.post('/notices', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await noticeRegisterSchema.validateAsync(req.body);

        const doesExists = await Notice.findOne({noticeTitle: result.noticeTitle});
        // console.log(doesExists);
        if(doesExists){
            throw createError.Conflict(`This Notice Title '${result.noticeTitle}' has been already taken.`);
        }

        const notice = await new Notice(result);        
        const savedNotice = await notice.save();



        // console.log(notice);

        res.send({
            notices : savedNotice
            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }


});


router.put('/notices', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await noticeUpdateSchema.validateAsync(req.body);

        const updatedNotice = await Notice.findOneAndUpdate({_id: result._id}, result, {new: true})
                            .select({"noticeTitle": 1, "description": 1})
        // console.log(updatedUser);
        if(!updatedNotice){
            throw createError.Conflict(`This Notice Title '${result.noticeTitle}' does not exists.`);
        }

        
        // console.log(updatedUser);

        res.send({
            notices : updatedNotice
            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }
});


router.delete('/notices', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await noticeDeleteSchema.validateAsync(req.body);

        const deletedNotice = await Notice.findOneAndDelete({_id: result._id})
                            .select({"noticeTitle": 1, "description": 1});
        // console.log(deletedNotice);
        if(!deletedNotice){
            throw createError.Conflict(`This Notice Title '${result.noticeTitle}' does not exists.`);
        }

        
        // console.log(deletedNotice);

        res.send({
            notices : deletedNotice
            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }

});


module.exports = router