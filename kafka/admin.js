const kafka=require('./kafka');

async function init(){
    const admin=kafka.admin();
    await admin.connect();
    await admin.createTopics({
        topics:[
            {
                topic:'rider-updates',
                numPartitions:2,

            },
        ],
    });
    await admin.disconnect();
}
init();