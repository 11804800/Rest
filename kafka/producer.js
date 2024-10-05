const { stdin } = require('process');
const kafka=require('./kafka');
const readline=require('readline');

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});
async function init()
{
    const producer=kafka.producer();
    await producer.connect();

    rl.setPrompt(">");
    rl.prompt();
    rl.on('line',async (line)=>{
        const [name,location]=line.split(" ");
        await producer.send({
            topic:'rider-updates',
            messages:[
                {
                    partition:location.toLowerCase()==='north'? 0 : 1,
                    key:location,
                    value:JSON.stringify({name:name,location}),
                },
            ],
        });
    }).on('close',async ()=>{
        await producer.disconnect();
    });

}
init();