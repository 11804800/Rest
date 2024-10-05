const {Worker}=require("bullmq");

const sendEmail=()=>new Promise((res,rej)=>
    setTimeout(()=>res(),5*1000)
);

const worker=new Worker("emil-queue",async (job)=>{
    console.log(`message rec id: ${job.id}`);
    console.log("processiing message");
    console.log(`sending email to ${job.data.email}`);
    await sendEmail();
    console.log("sent");
});