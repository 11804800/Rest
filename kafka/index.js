const {Kafka}=require('kafkajs');
const kafka=new Kafka({
    clientId:"my-app",
    brokers:['172.18.195.43:9092'],
});

const producer=kafka.producer();
const consumer=kafka.consumer({
    groupId:"test-group"
});

const run=async ()=>{
    await producer.connect();
    await producer.send({
        topic:'test-topic',
        messages:[{
            value:"Hello Kafka"
        },],
    });
    await consumer.connect();
    await consumer.subscribe({
        topic:'test-topic',
        fromBeginning:true
    });

    await consumer.run({
        eachMessage:async ({topic,partition,message})=>{
            console.log({
                partition,
                value:message.value.toString(),
            })
        },
    });
}
run().catch(console.error);