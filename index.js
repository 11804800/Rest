const array=[
    {
        item:1,
        name:"hello",
    }
    ,
    {
        item:2,
        name:"hell",
    },
    {
        item:3,
        name:"helloo",
    },
    {
        item:4,
        name:"hello",
    }
]

console.log(array);

const array1=[new Set(array.map((item)=>item.name))];
console.log(array1);