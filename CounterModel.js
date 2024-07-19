const mongoose= require('mongoose')
const CounterSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    unit:{
        type:String,
        required:true 
    }
})

const Counter= mongoose.model('Counter',CounterSchema)
module.exports=Counter