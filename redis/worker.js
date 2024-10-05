const {Worker}=require('bullmq');
const client=require('./client');
const worker=new Worker("notification",async (job)=>{
    await client.setex(job.name,3600,JSON.stringify({name:job.data.name,message:job.data.message}));
    console.log(job.name + " sent");
});

module.exports=worker;