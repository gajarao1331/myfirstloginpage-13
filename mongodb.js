const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/NodeProject")

.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('Failed to connect');
})

const logInSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const priya=new mongoose.model('priya',logInSchema)

module.exports=priya