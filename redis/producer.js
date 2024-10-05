const {Queue} =require('bullmq');

const notificationQueue=new Queue("notification",{
    connection:{
        host:"127.0.0.1",
        post:'6379'
    }
});

async function PostQueue(name,message)
{
    const res=await notificationQueue.add(`noti-to-${name}`,{
        sender:name,
        message:message
    });
    console.log(res.id);
}

module.exports=PostQueue;