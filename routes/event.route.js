const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const Event = require('../models/event.model');

const { 
    eventRegisterSchema,
    eventUpdateSchema, 
    eventDeleteSchema,
    
} = require('../utils/school_validation_schema');


router.get('/:id', async(req, res, next)=>{
    try{
        const event = await Event.findById(req.params.id);
        // console.log('event: '+ req.params.id);
        // console.log('event: '+ event);

        if(!event){
            throw createError.Conflict(`There is no event with id ${req.params.id}.`);
        }

        res.send({
            event: event,

        });

    }catch(error){

        console.log(error.message);
        next(error);
    }

});


router.get('/', async(req, res, next)=>{
try{
        const events = await Event.find({});        
        // console.log('event: '+ events);

        if(!events){
            throw createError.Conflict(`There is no event exists.`);
        }

        res.send({
            event: events,

        });

    }catch(error){
        
        console.log(error.message);
        next(error);
    }
});


router.post('/', async(req, res, next)=>{
    try{
        // validation by Joi
        const result = await eventRegisterSchema.validateAsync(req.body);

        const doesExists = await Event.findOne({event_title: result.event_title});
        
        console.log(doesExists);
        if(doesExists){
            throw createError.Conflict(`This event '${result.event_title}' has been already taken.`);
        }

        const event = await new Event(result);        
        const savedEvent = await event.save();

        // console.log(event);
        res.send({
            events : savedEvent            
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
        const result = await eventUpdateSchema.validateAsync(req.body);

        const updatedEvent = await Event.findOneAndUpdate({_id: result._id}, result, {new: true})
                            .select({"event_title": 1, "description": 1});
        // console.log(updatedUser);
        if(!updatedEvent){
            throw createError.Conflict(`This event '${result.event_title}' does not exists.`);
        }

        
        // console.log(updatedUser);
        res.send({
            events : updatedEvent            
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
        const result = await eventDeleteSchema.validateAsync(req.body);

        const deletedevent = await Event.findOneAndDelete({_id: result._id})
                            .select({"event_title": 1, "description": 1});

        // console.log(deletedevent);
        if(!deletedevent){
            throw createError.Conflict(`This event '${result.event_title}' does not exists.`);
        }

        
        // console.log(deletedevent);
        res.send({
            events : deletedevent            
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }
});





module.exports = router