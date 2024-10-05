var arr=[
    {
        id:2,
        name:"Salman",
        username:"Sallu",
        email:"@gmail.com"
    },
    {
        id:1,
        name:"Nikhil",
        username:"salman",
        email:'@gmail.com'
    }
  ]


exports.resolvers={
    Query:{
        hello:()=>`hey i am nikhil`,
        getUser:()=>arr.map((item)=>item)
    },
    Mutation:{
        addUser:(_,{id,name,username,gmail})=>{
            arr.push({
                id:id,
                name:name,
                username:username,
                gmail:gmail
            });
            return "Success";
        },
        DeleteUser:(_,{id})=>{
            arr.splice(arr.indexOf(id),1);
            return "success:true"
        }
    }
}