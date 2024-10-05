const {Queue} =require("bullmq");

const notification=new Queue("emil-queue",{
        connection:{
            host:'127.0.0.1',
            port:'6379'
        }
});


async function init(){
    const res=await notification.add("email to nikhil",{
        email:"nikhilpathak2602@gmal.com",
        subject:"Welocme to redis",
        body:"Hello mr nikhil pathak I am Redis and welcoming you to new world"
    });
    console.log("Job created to queue",res.id);
}
init();