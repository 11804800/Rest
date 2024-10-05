const express=require('express');
var indexRouter=express.Router();
const bodyparser=require('body-parser');
indexRouter.use(bodyparser.json());

indexRouter.get('/',(req,res)=>{
    res.render('index');
});
module.exports=indexRouter;