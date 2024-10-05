const {rateLimit}=require('express-rate-limit');

const limit=rateLimit({
    windowMs:1*60*1000, //15 minutes
    limit:1,
    standardHeaders: 'draft-7',
    legacyHeaders:false,
    // skipSuccessfulRequests:true
});

module.exports=limit;