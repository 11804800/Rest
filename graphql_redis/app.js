const express=require("express");
const bodyparser=require('body-parser');
const {ApolloServer}=require('@apollo/server');
const {expressMiddleware} =require('@apollo/server/express4');
const cors=require('cors');
const {typeDefs}=require('./schema/typdefs')
const {resolvers} =require('./schema/resolvers')

async function init()
{
    var app=express();
const server=new ApolloServer({
    typeDefs:typeDefs,
    resolvers:resolvers,
    // mutations
});
await server.start();

app.use(cors());
app.use(bodyparser.json());
app.use('/',expressMiddleware(server));
app.listen(4000,()=>{
    console.log("server up and running at 4000");
});
}
init();

