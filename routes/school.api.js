const express = require('express');
const router = express.Router();


// Session Apis
const sessionRoute = require('../routes/session.route');
router.use('/', sessionRoute);


// Schools Apis
const schoolsRoute = require('../routes/schools.route');
router.use('/', schoolsRoute);



// SchoolBody Option Apis
const schoolbodyRoute = require('../routes/schoolbody.route');
router.use('/', schoolbodyRoute);




// Notices Apis
const noticesRoute = require('../routes/notice.route');
router.use('/', noticesRoute);


// Student Apis
const studentsRoute = require('../routes/students.route');
router.use('/', studentsRoute);



// Teacher Apis
const teachersRoute = require('../routes/teachers.route');
router.use('/', teachersRoute);


// Event Apis
const eventRoute = require('../routes/event.route');
router.use('/', eventRoute);


// Galary Apis
const galaryRoute = require('../routes/galary.route');
router.use('/', galaryRoute);


// DbOption Apis
const dboptionRoute = require('../routes/dboption.route');
router.use('/', dboptionRoute);



// Dashboard Option Apis
const dashboardoptionRoute = require('../routes/dashboardoption.route');
router.use('/', dashboardoptionRoute);



















module.exports = router

