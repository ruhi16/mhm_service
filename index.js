const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');

const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./utils/database');
connectDB();

const app = express();
app.use(express.json());

//Log message at console
app.use(morgan('tiny'));    //tiny, combined, dev

// Root of the Page of Web Site
app.get('/', (req, res)=>{
    res.send({status: 200, message: "This is Root Page."})
});

// User Registration, Login Route
const authRoute = require('./routes/auth.route');
app.use('/api/users', authRoute);

// Ambulance Add, Update Route
const ambulanceRoute = require('./routes/ambulance.route');
app.use('/api/ambulance', ambulanceRoute);

// Address Add, Update Route
const addressRoute = require('./routes/address.route');
app.use('/api/address', addressRoute);



// Schools Apis
const schoolApis = require('./routes/school.api');
app.use('/api/schools', schoolApis);












// Any root, not matched.
app.use((req, res, next)=>{
    next(createError.NotFound('Page not found!'));
});

// It will be Hitted, whenever next() arrive with an 'error' object
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({error: {
        status: err.status || 500,
        message: err.message
    }});
});


// Listening port at server end
const PORT = process.env.PORT || 4500;
app.listen(PORT, ()=>{
    console.log(`I am listening from port no ${PORT}`);
});