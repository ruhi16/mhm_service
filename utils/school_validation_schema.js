const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)


//============================= Session schema =============================================================
const sessionRegisterSchema = Joi.object({
    session_title: Joi.string().min(3).max(30).required(),
    session_img_url: Joi.string().min(3).max(60).required(),
        
    description: Joi.string().min(3).max(100).required(),
            
    isActive: Joi.boolean(),

    // schoolId: Joi.objectId(),
    // userId: Joi.objectId(),     
});

const sessionUpdateSchema = Joi.object({
    _id: Joi.objectId(),
    session_title: Joi.string().min(3).max(30).required(),
    session_img_url: Joi.string().min(3).max(60).required(),
        
    description: Joi.string().min(3).max(100).required(),
            
    isActive: Joi.boolean(),

    schoolId: Joi.objectId(),
    // userId: Joi.objectId(),      
});

const sessionDeleteSchema = Joi.object({
    _id: Joi.objectId(),        
    schoolId: Joi.objectId(),
    // userId: Joi.objectId(), 
        
});


//======================= School schema ===================================================================

const schoolRegisterSchema = Joi.object({    
    name: Joi.string().min(3).max(60).required(),
    dise: Joi.string().min(0).max(11),
    grade: Joi.string().min(3).max(30).required(),
    schedule_time: Joi.string().min(3).max(30).required(),

    email: Joi.string().email().lowercase().required(),
    mobile: Joi.array().items(Joi.string().max(10).required()),


    vill: Joi.string().min(0).max(11),
    post: Joi.string().min(0).max(11),
    ps: Joi.string().min(0).max(11),
    pin: Joi.string().min(0).max(11),
    dist: Joi.string().min(0).max(11),

    imgurl: Joi.array().items(Joi.string().min(3).max(100)),

    // userId: Joi.objectId(),
    sessionId: Joi.objectId(),
    headmasterId: Joi.objectId(),
    asstheadmasterId: Joi.objectId(),
});

const schoolUpdateSchema = Joi.object({
    _id: Joi.objectId(),
    name: Joi.string().min(3).max(60).required(),
    grade: Joi.string().min(3).max(30).required(),
    schedule_time: Joi.string().min(3).max(30).required(),

    email: Joi.string().email().lowercase().required(),
    mobile: Joi.string().max(10).required(),

    // userId: Joi.objectId(),
    sessionId: Joi.objectId(),
    headmasterId: Joi.objectId(),
    asstheadmasterId: Joi.objectId(),
});

const schoolDeleteSchema = Joi.object({
    _id: Joi.objectId(),
    headmasterId: Joi.objectId(),
});


//============================= Notice schema =============================================================
const noticeRegisterSchema = Joi.object({
    noticeTitle: Joi.string().min(3).max(30).required(),
    addr_to: Joi.string().min(3).max(30).required(),
    ref_from: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(100).required(),
    
    date_publ: Joi.date(),
    date_expr: Joi.date(),
    priority: Joi.string().min(3).max(30).required(),

    isActive: Joi.boolean(),

    schoolId: Joi.objectId(),
    publ_by: Joi.objectId(),
    publ_by_desig: Joi.string().min(3).max(30).required(),
});

const noticeUpdateSchema = Joi.object({
    _id: Joi.objectId(),
    noticeTitle: Joi.string().min(3).max(30).required(),
    addr_to: Joi.string().min(3).max(30).required(),
    ref_from: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(100).required(),
    
    date_publ: Joi.date(),
    date_expr: Joi.date(),
    priority: Joi.string().min(3).max(30).required(),

    isActive: Joi.boolean(),

    schoolId: Joi.objectId(),
    publ_by: Joi.objectId(),
    publ_by_desig: Joi.string().min(3).max(30).required(),
});


const noticeDeleteSchema = Joi.object({
    _id: Joi.objectId(),
    schoolId: Joi.objectId(),
    publ_by: Joi.objectId(),
    
});


//============================= Student schema =============================================================

const studentRegisterSchema = Joi.object({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),

    fathername: Joi.string().min(3).max(30).required(),
    mothername: Joi.string().min(3).max(30).required(),

    email: Joi.string().email().lowercase().required(),
    mobile: Joi.array().items(Joi.string().max(10).required()),



    schoolId: Joi.objectId(),
    userId: Joi.objectId(),
});


const studentUpdateSchema = Joi.object({
    _id: Joi.objectId(),
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),

    fathername: Joi.string().min(3).max(30).required(),
    mothername: Joi.string().min(3).max(30).required(),

    email: Joi.string().email().lowercase().required(),
    mobile: Joi.array().items(Joi.string().max(10).required()),



    schoolId: Joi.objectId(),
    userId: Joi.objectId(),
});



const studentDeleteSchema = Joi.object({
    _id: Joi.objectId(),    
    schoolId: Joi.objectId(),
    userId: Joi.objectId(),
});

//============================= Student CR schema =============================================================

const studentcrRegisterSchema = Joi.object({
    
    studentId: Joi.objectId(),

    class: Joi.string().min(1).max(30).required(),
    section: Joi.string().min(1).max(10).required(),
    roll_no: Joi.string().min(1).max(10).required(),
    
    sessionId: Joi.objectId(),
    schoolId: Joi.objectId()    
         
});

const studentcrUpdateSchema = Joi.object({
    _id: Joi.objectId(), 
    studentId: Joi.objectId(),

    class: Joi.string().min(1).max(30).required(),
    section: Joi.string().min(1).max(10).required(),
    roll_no: Joi.string().min(1).max(10).required(),
    
    sessionId: Joi.objectId(),
    schoolId: Joi.objectId()    
});

const studentcrDeleteSchema = Joi.object({
    _id: Joi.objectId(),     
    sessionId: Joi.objectId(),
    schoolId: Joi.objectId()    
});


//============================= Teacher schema =============================================================

const teacherRegisterSchema = Joi.object({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),

    email: Joi.string().email().lowercase().required(),
    mobile: Joi.array().items(Joi.string().max(10).required()),

    schoolId: Joi.objectId(),
    userId: Joi.objectId(),
});



const teacherUpdateSchema = Joi.object({
    _id: Joi.objectId(),
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),

    email: Joi.string().email().lowercase().required(),
    mobile: Joi.array().items(Joi.string().max(10).required()),

    schoolId: Joi.objectId(),
    userId: Joi.objectId(),
});



const teacherDeleteSchema = Joi.object({
    _id: Joi.objectId(),
    schoolId: Joi.objectId(),
    userId: Joi.objectId(),
});



//============================= Schoolbody schema =============================================================
const schoolbodyRegisterSchema = Joi.object({
    body_name: Joi.string().min(3).max(30).required(),
    member_name: Joi.string().min(3).max(30).required(),
    member_img_url: Joi.array().items(Joi.string().min(3).max(100).required()),    
    member_desig: Joi.string().min(3).max(30).required(),
    member_isActive: Joi.boolean().required(),
    member_desc: Joi.string().min(3).max(200).required(),

    member_doj: Joi.date().required(),
    member_doe: Joi.date().required(),
    member_priority: Joi.string().min(3).max(10).required(),
    
    schoolId: Joi.objectId(),
    // userId: Joi.objectId(),
});

const schoolbodyUpdateSchema = Joi.object({
    _id: Joi.objectId(),
    body_name: Joi.string().min(3).max(30).required(),
    member_name: Joi.string().min(3).max(30).required(),
    member_img_url: Joi.array().items(Joi.string().min(3).max(100).required()),
    member_desig: Joi.string().min(3).max(30).required(),
    member_isActive: Joi.boolean().required(),
    member_desc: Joi.string().min(3).max(200).required(),

    member_doj: Joi.date().required(),
    member_doe: Joi.date().required(),
    member_priority: Joi.string().min(3).max(10).required(),
    
    schoolId: Joi.objectId(),
    // userId: Joi.objectId(),
});

const schoolbodyDeleteSchema = Joi.object({
    _id: Joi.objectId(),    
    schoolId: Joi.objectId(),
    // userId: Joi.objectId(),
});


//============================= Event schema =============================================================

const eventRegisterSchema = Joi.object({
    event_title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(200).required(),

    addr_to: Joi.string().min(3).max(30).required(),
    ref_from: Joi.string().min(3).max(30).required(),    

    date_publ: Joi.date(),
    date_expr: Joi.date(),

    priority: Joi.string().min(3).max(30).required(),

    isActive: Joi.boolean(),
    
    publ_by: Joi.objectId(),
    publ_by_desig: Joi.string().min(3).max(30).required(),
    
    schoolId: Joi.objectId(),
    // userId: Joi.objectId(),
});

const eventUpdateSchema = Joi.object({
    _id: Joi.objectId(),
    event_title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(200).required(),

    addr_to: Joi.string().min(3).max(30).required(),
    ref_from: Joi.string().min(3).max(30).required(),    

    date_publ: Joi.date(),
    date_expr: Joi.date(),
    priority: Joi.string().min(3).max(30).required(),

    isActive: Joi.boolean(),    
        
    publ_by: Joi.objectId(),
    publ_by_desig: Joi.string().min(3).max(30).required(),
    
    schoolId: Joi.objectId(),
    // userId: Joi.objectId(),    
});

const eventDeleteSchema = Joi.object({
    _id: Joi.objectId(),
    schoolId: Joi.objectId(),
    // userId: Joi.objectId(),    
});


//============================= Galary schema =============================================================
const galaryRegisterSchema = Joi.object({
    img_title: Joi.string().min(3).max(30).required(),
    img_url: Joi.string().min(3).max(60).required(),
        
    description: Joi.string().min(3).max(100).required(),
    date_publ: Joi.date(),
    priority: Joi.string().min(3).max(30).required(),
    
    isActive: Joi.boolean(),

    publ_by: Joi.objectId(),

    schoolId: Joi.objectId(),
    // userId: Joi.objectId(),     
});

const galaryUpdateSchema = Joi.object({
    _id: Joi.objectId(),
    img_title: Joi.string().min(3).max(30).required(),
    img_url: Joi.string().min(3).max(60).required(),
      
    description: Joi.string().min(3).max(100).required(),
    date_publ: Joi.date(),
    priority: Joi.string().min(3).max(30).required(),
    
    isActive: Joi.boolean(),

    publ_by: Joi.objectId(),
    
    schoolId: Joi.objectId(),
    // userId: Joi.objectId(),     
});

const galaryDeleteSchema = Joi.object({
    _id: Joi.objectId(),        
    schoolId: Joi.objectId(),
    // userId: Joi.objectId(),     
});


//============================= dboptions schema =============================================================

const dboptionRegisterSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    img_url: Joi.string().min(3).max(60).required(),

    description: Joi.string().min(3).max(100).required(),
    type: Joi.string().min(3).max(30).required(),
    
    
    priority: Joi.string().min(3).max(30).required(),
    isActive: Joi.boolean(),
    schoolId: Joi.objectId()       
});

const dboptionUpdateSchema = Joi.object({
    _id: Joi.objectId(), 
    title: Joi.string().min(3).max(30).required(),
    img_url: Joi.string().min(3).max(60).required(),

    description: Joi.string().min(3).max(100).required(),
    type: Joi.string().min(3).max(30).required(),
    
    
    priority: Joi.string().min(3).max(30).required(),
    isActive: Joi.boolean(),
    schoolId: Joi.objectId()    
});

const dboptionDeleteSchema = Joi.object({
    _id: Joi.objectId(),     
    schoolId: Joi.objectId()    
});


//============================= Class schema =============================================================

const classRegisterSchema = Joi.object({
    name: Joi.string().min(1).max(30).required(),
    description: Joi.string().min(3).max(100).required(), 
    
    index: Joi.number().empty("").allow(null),
    
    sections: Joi.array().items(Joi.objectId()),

    sessionId: Joi.objectId(),       
    schoolId: Joi.objectId()       
});

const classUpdateSchema = Joi.object({
    _id: Joi.objectId(), 
    name: Joi.string().min(1).max(30).required(),
    description: Joi.string().min(3).max(100).required(),    
    index: Joi.number().empty("").allow(null),
    
    sections: [Joi.objectId()],

    sessionId: Joi.objectId(),       
    schoolId: Joi.objectId()    
});

const classDeleteSchema = Joi.object({
    _id: Joi.objectId(),     
    sessionId: Joi.objectId(), 
    schoolId: Joi.objectId()    
});

//============================= Section schema =============================================================

const sectionRegisterSchema = Joi.object({
    name: Joi.string().min(1).max(30).required(),
    description: Joi.string().min(3).max(100).required(),    
    
    sessionId: Joi.objectId(),       
    schoolId: Joi.objectId()       
});

const sectionUpdateSchema = Joi.object({
    _id: Joi.objectId(), 
    name: Joi.string().min(1).max(30).required(),
    description: Joi.string().min(3).max(100).required(),    
    
    sessionId: Joi.objectId(),       
    schoolId: Joi.objectId()    
});

const sectionDeleteSchema = Joi.object({
    _id: Joi.objectId(),     
    sessionId: Joi.objectId(), 
    schoolId: Joi.objectId()    
});





//============================= dashboardoption schema =============================================================

const dashboardoptionRegisterSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    img_url: Joi.string().min(3).max(60).required(),


    description: Joi.string().min(3).max(100).required(),
    option_type: Joi.string().min(3).max(100).required(),
    
    priority: Joi.string().min(3).max(30).required(),

    isActive: Joi.boolean(),
    
    
    schoolId: Joi.objectId(),
    // userId: Joi.objectId(),     
});

const dashboardoptionUpdateSchema = Joi.object({
    _id: Joi.objectId(), 
    title: Joi.string().min(3).max(30).required(),
    imgUrl: Joi.string().min(3).max(60).required(),


    description: Joi.string().min(3).max(100).required(),
    option_type: Joi.string().min(3).max(100).required(),
    
    priority: Joi.string().min(3).max(30).required(),

    isActive: Joi.boolean(),
    
    
    schoolId: Joi.objectId(),
    // userId: Joi.objectId(),     
});

const dashboardoptionDeleteSchema = Joi.object({
    _id: Joi.objectId(),     
    schoolId: Joi.objectId(),
    // userId: Joi.objectId(),    
});



















module.exports = { 
    schoolRegisterSchema,
    schoolUpdateSchema,
    schoolDeleteSchema,

    noticeRegisterSchema,
    noticeUpdateSchema,
    noticeDeleteSchema,

    studentRegisterSchema,
    studentUpdateSchema,
    studentDeleteSchema,

    studentcrRegisterSchema,
    studentcrUpdateSchema,
    studentcrDeleteSchema,

    teacherRegisterSchema,
    teacherUpdateSchema,
    teacherDeleteSchema,
    
    sessionRegisterSchema,
    sessionUpdateSchema,
    sessionDeleteSchema,

    schoolbodyRegisterSchema,    
    schoolbodyUpdateSchema,
    schoolbodyDeleteSchema,

    galaryRegisterSchema,
    galaryUpdateSchema,
    galaryDeleteSchema,
    
    eventRegisterSchema,
    eventUpdateSchema,
    eventDeleteSchema,



    classRegisterSchema,
    classUpdateSchema,
    classDeleteSchema,

    sectionRegisterSchema,
    sectionUpdateSchema,
    sectionDeleteSchema,

    

    dboptionRegisterSchema,
    dboptionUpdateSchema,
    dboptionDeleteSchema,

    dashboardoptionRegisterSchema,
    dashboardoptionUpdateSchema,
    dashboardoptionDeleteSchema,

};









// employeeNumber: joi.number().integer(),
//    firstname: joi.string().alphanum().min(3).max(30).required(),
//    lastname: joi.string().alphanum().min(3).max(30).required(),
//    grade: joi.string().regex(/^[a-zA-Z0-9]{3}$/).required(),
//    birthDate: joi.date().raw().required(),
//    joinDate: joi.date().raw().required(),
//    salary: joi.number().required(),
//    email: joi.string().email()


// function customerValidation(customer) {
//     var schema = {
//       name: Joi.string().min(3).required(),
//       isGold: Joi.boolean(),
//       phone: Joi.string().min(3).required(),
//     }
//     return Joi.validate(customer, schema)
//   }


// joi.object().keys({
//     client: joi.object().keys({
//       give: joi.func().arity(2).required(),
//       take: joi.func().arity(2).required(),
//       reset: joi.func().arity(2).required()
//     }).unknown().required(),
//     ext: joi.string().valid(['onPreAuth', 'onPostAuth', 'onPreHandler']).default('onPreHandler'),
//     allRoutes: joi.boolean().default(false),
//     bucket: joi.string().alphanum(),
//     countSuccess: joi.boolean().default(true),
//     addHeaders: joi.boolean().default(true),
//     headerLimit: joi.string().default('X-RateLimit-Limit'),
//     headerRemaining: joi.string().default('X-RateLimit-Remaining'),
//     headerReset: joi.string().default('X-RateLimit-Reset'),
//     message: joi.string().default('you have exceeded your request limit'),
//     onError: joi.func().arity(3),
//     getKey: joi.func().arity(1).default(getRequestIP),
//     ttlTransform: joi.func().arity(1).default(ttl => ttl),
//     errorSize: joi.number().integer().min(0).default(1),
//     errorDelay: joi.number().integer().min(1).default(60)
//   }).required()