const mongoose=require('mongoose')
const userSchema=new  mongoose.Schema({
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    required:true,
    type:String
}
})

const userModel=mongoose.model('android',userSchema);

module.exports=userModel;