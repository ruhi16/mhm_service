const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const Session = require('../models/session.model');

const { 
    sessionRegisterSchema, 
    sessionUpdateSchema,
    sessionDeleteSchema,
} = require('../utils/school_validation_schema');



router.get('/:id', async(req, res, next)=>{
    try{
        const session = await Session.findById(req.params.id);
        // console.log('session: '+ req.params.id);
        // console.log('session: '+ session);

        if(!session){
            throw createError.Conflict(`There is no session title with id ${req.params.id}.`);
        }

        res.send({
            session: session,
        });

    }catch(error){

        console.log(error.message);
        next(error);
    }
});


router.get('/', async(req, res, next)=>{
try{
        const sessions = await Session.find({});        
        // console.log('session: '+ sessions);

        if(!sessions){
            throw createError.Conflict(`There is no session title exists.`);
        }

        res.send({
            session: sessions,

        });

    }catch(error){
        
        console.log(error.message);
        next(error);
    }
});


router.post('/', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await sessionRegisterSchema.validateAsync(req.body);

        const doesExists = await Session.findOne({session_title: result.session_title});
        
        // console.log(doesExists);
        if(doesExists){
            throw createError.Conflict(`This session title '${result.session_title}' has been already taken.`);
        }

        const session = await new Session(result);        
        const savedSession = await session.save();

        // console.log(session);
        res.send({
            sessions : savedSession
            
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
        const result = await sessionUpdateSchema.validateAsync(req.body);
        // console.log('session: '+ result._id.toString());

        const updatedSession = await Session.findOneAndUpdate({_id: result._id}, result, {new: true})
                            .select({"session_title": 1, "description": 1});
        
        // console.log('Updated Session: '+updatedSession);
        if(!updatedSession){
            throw createError.Conflict(`This session title '${result.session_title}' does not exists.`);
        }

        
        // console.log(updatedUser);

        res.send({
            sessions : updatedSession
            
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
        const result = await sessionDeleteSchema.validateAsync(req.body);

        const deletedSession = await Session.findOneAndDelete({_id: result._id})
                                .select({"session_title": 1, "description": 1});
        // console.log(deletedsession);
        if(!deletedSession){
            throw createError.Conflict(`This session title '${result.firstname}' '${result.lastname}' does not exists.`);
        }

        
        // console.log(deletedsession);

        res.send({
            sessions : deletedSession
            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }

});


module.exports = router