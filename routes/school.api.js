const express = require('express');
const router = express.Router();


// Session Apis
const sessionRoute = require('../routes/session.route');
router.use('/sessions', sessionRoute);


// Schools Apis
const schoolsRoute = require('../routes/schools.route');
router.use('/self', schoolsRoute);



// SchoolBody Option Apis
const schoolbodyRoute = require('../routes/schoolbody.route');
router.use('/schoolbodys', schoolbodyRoute);




// Notices Apis
const noticesRoute = require('../routes/notice.route');
router.use('/notices', noticesRoute);



// Class Apis
const classesRoute = require('../routes/class.route');
router.use('/classes', classesRoute);



// Section Apis
const sectionsRoute = require('../routes/section.route');
router.use('/sections', sectionsRoute);



// Student Apis
const studentsRoute = require('../routes/students.route');
router.use('/students', studentsRoute);

// Student Cr Apis
const studentcrsRoute = require('../routes/studentcr.route');
router.use('/studentcrs', studentcrsRoute);



// Teacher Apis
const teachersRoute = require('../routes/teachers.route');
router.use('/teachers', teachersRoute);


// Event Apis
const eventRoute = require('../routes/event.route');
router.use('/events', eventRoute);


// Galary Apis
const galaryRoute = require('../routes/galary.route');
router.use('/galarys', galaryRoute);


// DbOption Apis
const dboptionRoute = require('../routes/dboption.route');
router.use('/dboptions', dboptionRoute);



// Dashboard Option Apis
const dashboardoptionRoute = require('../routes/dashboardoption.route');
router.use('/dashboardoptions', dashboardoptionRoute);



















module.exports = router

