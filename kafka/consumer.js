const kafka=require('./kafka');

async function init()
{
    const consumer=kafka.consumer({
        groupId:"user-1"
    });
    await consumer.connect();
    await consumer.subscribe({
        topics:['rider-updates']
    });
    await consumer.run({
        eachMessage:async ({topic,partition,message,heartbeat,pause})=>{
        console.log(`[${topic}]: PART:${partition}: `,message.value.toString());
        },
    });

}
init();