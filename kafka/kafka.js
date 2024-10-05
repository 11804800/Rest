const {Kafka} =require('kafkajs');
const kafka=new Kafka({
    brokers:['172.18.195.43:9092'],
    clientId:"zomato"
});

module.exports=kafka;