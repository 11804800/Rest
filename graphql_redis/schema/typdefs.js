
exports.typeDefs=`
          type User{
            name:String!,
            id:ID!,
            email:String,
            username:String
          }
          type Query{
            hello:String,
            getUser:[User]
          }
          
          type Mutation{
            addUser(id:ID,name:String,username:String,email:String):String,
            DeleteUser(id:ID!):String
          }`